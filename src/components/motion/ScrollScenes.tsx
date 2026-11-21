'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { MOTION_OK, loadGsap, whenIdle, type MotionKit } from './gsap';
import { off } from './debug';

/**
 * The home page's scroll scenes. The sections stay server components: they
 * only mark what moves with a data attribute or a class, and this one client
 * component (it renders nothing) wires GSAP to those marks once the browser
 * is idle. Everything here is an enhancement over a page that already reads
 * complete: GSAP sets every starting state itself, so with reduced motion,
 * without JS, or if the library never arrives, nothing is left hidden.
 *
 * `html.scenes-on` tells the CSS that GSAP has taken over, so the one-shot
 * transitions it replaces (the cover's focus pull, the index bar) step aside.
 *
 * Each scene is a microscope move, like the hovers:
 *   hero        → the objective pulls away as the first chapter arrives
 *   covers      → the chapter's name is brought up to magnification (wdth) and into focus
 *   rules       → each chapter's rule is drawn from the corner its light comes from
 *   timeline    → entries come into focus one after another
 *   [data-acquire] → an image is acquired line by line, like the buttons
 *   projects    → the index bar reads how far through the project the stage is;
 *                 the phone drifts on its own focal plane
 *   hexagon     → a request runs in through the layers and out to the adapters
 *   protocol    → the sheet's edge fills as the steps are run
 */
const buildScenes = ({ gsap, ScrollTrigger }: MotionKit) => {
  const root = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add({ motion: MOTION_OK, desktop: '(min-width: 1024px)' }, (context) => {
    const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
    if (!motion) return;

    root.classList.add('scenes-on');
    const all = <T extends Element = HTMLElement>(selector: string, scope: ParentNode = document) =>
      Array.from(scope.querySelectorAll<T>(selector));

    /* HERO. As the hero leaves, the field recedes and the copy dims: the
       objective pulling away before the next field comes up. The scroll
       only flips a class at the point of no return; the move itself is a
       CSS transition (.is-leaving in globals.css). Scrubbed from here, on
       every scroll frame, it made iOS kill the tab on a phone as the first
       chapter came up: the copy and the field (with the live WebGL canvas
       inside) were re-rendered frame after frame. The defocus is the
       canvas's own (it racks the focus as the header leaves). */
    const hero = off('heroe') ? null : document.getElementById('home');
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'bottom 55%',
        toggleClass: { targets: hero, className: 'is-leaving' },
      });
    }

    /* COVERS. The name starts condensed and is brought up to full width as
       the chapter rises: magnification on the scroll wheel. Its focus is the
       one-shot CSS transition (.cover.is-in), not scrubbed here: iOS repaints
       a filter scrubbed from JS in software on every frame, and on a phone
       that killed the tab as the first chapter came up. The width steps in
       whole units: every distinct value is a new instance of the variable
       font, which WebKit keeps for the life of the page. */
    if (!off('portadas')) all('.cover').forEach((cover) => {
      const name = cover.querySelector<HTMLElement>('.cover-name');
      if (!name) return;
      gsap.fromTo(
        name,
        { '--cover-wdth': 62, opacity: 0.25 },
        {
          '--cover-wdth': 125,
          opacity: 1,
          ease: 'power1.out',
          modifiers: { '--cover-wdth': (value: string) => Math.round(parseFloat(value)) },
          scrollTrigger: { trigger: cover, start: 'top 96%', end: 'top 46%', scrub: 0.6 },
        },
      );
    });

    /* RULES. Each chapter's rule is drawn across the page from the corner
       its light comes from. */
    if (!off('reglas')) all('.chapter').forEach((chapter) => {
      const rule = chapter.querySelector('.chapter-rule');
      if (!rule) return;
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'top 50%', scrub: 0.3 } },
      );
    });

    /* TIMELINE. Entries come into focus one after another as they rise. */
    const entries = off('timeline') ? [] : all('[data-timeline] > li');
    if (entries.length) {
      gsap.set(entries, { opacity: 0, y: 18, filter: 'blur(5px)' });
      ScrollTrigger.batch(entries, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            clearProps: 'opacity,transform,filter',
          }),
      });
    }

    /* ACQUISITION. The first time an image comes up, it's acquired line by
       line (`.acquire` in globals.css reads --scan-y). */
    if (!off('foto')) all('[data-acquire]').forEach((frame) => {
      gsap.fromTo(
        frame,
        { '--scan-y': 0 },
        {
          '--scan-y': 1,
          duration: 1.15,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: frame, start: 'top 72%', once: true },
          // Acquired: the clip and the scan line go (see .acquire).
          onComplete: () => frame.classList.add('is-acquired'),
        },
      );
    });

    /* PROJECTS (desktop viewer). The bar in the index reads how far through
       its project the stage is, and the phone drifts against the desktop
       shot: it sits on another focal plane, as in the mobile carousel. */
    if (desktop) {
      all('.field').forEach((field) => {
        const bar = document.querySelector(`[data-field-bar="${field.dataset.index}"]`);
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleY: 0 },
            { scaleY: 1, ease: 'none', scrollTrigger: { trigger: field, start: 'top 50%', end: 'bottom 50%', scrub: true } },
          );
        }
        const phone = field.querySelector('.field-phone');
        if (phone) {
          gsap.fromTo(
            phone,
            { y: 30 },
            { y: -30, ease: 'none', scrollTrigger: { trigger: field, start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        }
      });
    }

    /* HEXAGON. A request, on a loop while the figure is on screen: in from
       the frontend through an endpoint, down the layers to the domain, and
       back out through a repository and an HTTP service. Each layer lights
       as the request crosses it; on the way out it's also drawn along the
       two routes to the adapters. */
    const hex = document.querySelector<HTMLElement>('[data-hex]');
    if (hex) {
      const IN_AT = 0.32;
      const IN = 0.85;
      const OUT_AT = IN_AT + IN + 0.3;
      const OUT = 1.05;
      const request = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3.4, defaults: { ease: 'none' } });
      const flash = (target: Element | Element[], at: number, hold = 0.45) => {
        request
          .fromTo(target, { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, at)
          .to(target, { opacity: 0, duration: hold, ease: 'power2.out' }, at + 0.1);
      };

      flash(all('[data-hex-hit="in"]', hex), 0, 0.7);
      const wire = hex.querySelector('[data-hex-wire]');
      if (wire) request.fromTo(wire, { yPercent: 0 }, { yPercent: 300, duration: 0.3 }, 0.04);

      const routes = all<SVGPathElement>('[data-hex-route]', hex);
      if (routes.length) {
        request.fromTo(routes, { strokeDashoffset: 14 }, { strokeDashoffset: -100, duration: OUT }, OUT_AT);
      }

      all<SVGPolygonElement>('[data-hex-flash]', hex).forEach((ring) => {
        const inner = ring.dataset.hexFlash === 'domain';
        flash(ring, IN_AT + IN * Number(ring.dataset.in), inner ? 0.8 : 0.45);
        if (!inner) flash(ring, OUT_AT + OUT * Number(ring.dataset.out));
      });
      flash(all('[data-hex-hit="out"]', hex), OUT_AT + OUT - 0.08, 0.9);

      ScrollTrigger.create({
        trigger: hex,
        start: 'top 78%',
        end: 'bottom 12%',
        onToggle: (self) => (self.isActive ? request.play() : request.pause()),
      });
    }

    /* PROTOCOL. The edge of the sheet fills as the steps are run, and each
       step's number lights once the stage has passed it. */
    const protocol = document.querySelector<HTMLElement>('[data-protocol]');
    if (protocol) {
      const rail = protocol.querySelector('[data-protocol-rail]');
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: protocol, start: 'top 62%', end: 'bottom 62%', scrub: 0.3 } },
        );
      }
      all('[data-protocol-step]', protocol).forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          onEnter: () => step.setAttribute('data-done', ''),
          onLeaveBack: () => step.removeAttribute('data-done'),
        });
      });
    }

    return () => {
      root.classList.remove('scenes-on');
      document.getElementById('home')?.classList.remove('is-leaving');
      all('.acquire.is-acquired').forEach((frame) => frame.classList.remove('is-acquired'));
      all('[data-protocol-step][data-done]').forEach((step) => step.removeAttribute('data-done'));
    };
  });

  // Web fonts change the height of the page; measure again once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => mm.revert();
};

const ScrollScenes = () => {
  const locale = useLocale();

  useEffect(() => {
    if (off('todas')) return;
    let live = true;
    let revert = () => {};
    const cancel = whenIdle(() => {
      loadGsap().then((kit) => {
        if (live) revert = buildScenes(kit);
      });
    });
    return () => {
      live = false;
      cancel();
      revert();
    };
  }, [locale]);

  return null;
};

export default ScrollScenes;
