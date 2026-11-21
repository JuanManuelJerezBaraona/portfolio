'use client';

import { useEffect, useRef } from 'react';
import { MOTION_OK, loadGsap, whenIdle } from './gsap';
import { off } from './debug';

interface ScrollProgressProps {
  /** Changes when the page does, so the line is measured against the new one. */
  page: string;
  className?: string;
}

/**
 * How far down the page the stage has travelled: a line under the navbar
 * that fills with the scroll, in the color of the section under the
 * objective (`--accent`, set by the class the navbar gives it). It follows
 * the scroll directly, so it also runs with reduced motion, without the
 * easing. Without JS it simply isn't drawn.
 */
const ScrollProgress = ({ page, className = '' }: ScrollProgressProps) => {
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = line.current;
    if (!node || off('progreso')) return;
    let live = true;
    let kill = () => {};

    const cancel = whenIdle(() => {
      loadGsap().then(({ gsap }) => {
        if (!live) return;
        const smooth = window.matchMedia(MOTION_OK).matches;
        const tween = gsap.fromTo(
          node,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: smooth ? 0.25 : true } },
        );
        kill = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(node, { clearProps: 'transform' });
        };
      });
    });

    return () => {
      live = false;
      cancel();
      kill();
    };
  }, [page]);

  return <span ref={line} className={`nav-progress ${className}`} aria-hidden="true" />;
};

export default ScrollProgress;
