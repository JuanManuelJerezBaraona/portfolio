'use client';

/*
 * Magnet, from React Bits (https://reactbits.dev, MIT + Commons Clause, see
 * LICENSE.md). Adapted for this site:
 * - it mounts inside the control it moves (an empty, hidden span) instead of
 *   wrapping it, so buttons keep their layout (full width on phones);
 * - no tilt or scale; the spring's velocity is written to `--magnet-vx` /
 *   `--magnet-vy`, and the primary button's DAPI and mCherry layers move
 *   against it (see `.btn-primary` in globals.css): while the button travels
 *   the channels trail it, out of register, and fall back into place when it
 *   comes to rest, like chromatic aberration;
 * - with reduced motion or a touch screen it never moves.
 * As in the original, one listener serves every magnet, and only the one
 * nearest the pointer is pulled.
 */

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number };
type Motion = { x: number; y: number };

type Entry = {
  /** Where the control would be without the pull. */
  rest: () => DOMRect;
  wake: () => void;
  active: boolean;
};

interface MagnetProps {
  /** How far outside the control the pull reaches, in px. */
  padding?: number;
  /** Higher is weaker: the control moves pointer-offset / strength. */
  magnetStrength?: number;
  /** Longest the control moves from rest, in px. */
  maxOffset?: number;
}

const SPRING = { stiffness: 170, damping: 16, mass: 1 };
/** Px of channel split per px/s of velocity, and its cap. */
const ABERRATION = 0.035;
const MAX_SPLIT = 7;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const reach = (rect: DOMRect, pointer: Point) => {
  const dx = pointer.x - (rect.left + rect.width / 2);
  const dy = pointer.y - (rect.top + rect.height / 2);
  const outside = Math.hypot(
    Math.max(0, Math.abs(dx) - rect.width / 2),
    Math.max(0, Math.abs(dy) - rect.height / 2),
  );
  return { dx, dy, outside };
};

const registry = new Set<Entry & { padding: number }>();
const field: { pointer: Point | null; owner: Entry | null } = { pointer: null, owner: null };
let detach: (() => void) | null = null;

/** Only the magnet nearest the pointer pulls. */
const arbitrate = () => {
  let winner: Entry | null = null;
  let nearest = Infinity;
  for (const entry of registry) {
    if (!field.pointer) continue;
    const near = reach(entry.rest(), field.pointer);
    if (near.outside <= entry.padding && near.outside < nearest) {
      winner = entry;
      nearest = near.outside;
    }
  }
  const previous = field.owner;
  field.owner = winner;
  if (previous && previous !== winner) previous.wake();
  winner?.wake();
};

const attach = () => {
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    field.pointer = { x: event.clientX, y: event.clientY };
    arbitrate();
  };
  const onLeave = () => {
    field.pointer = null;
    arbitrate();
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', arbitrate, { passive: true, capture: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  window.addEventListener('blur', onLeave);
  return () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', arbitrate, { capture: true });
    document.documentElement.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('blur', onLeave);
  };
};

const Magnet = ({ padding = 70, magnetStrength = 4, maxOffset = 10 }: MagnetProps) => {
  const probeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const control = probeRef.current?.parentElement;
    if (!control) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;
    if (reduce || !fine) return undefined;

    const current: Motion = { x: 0, y: 0 };
    const velocity: Motion = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    const rest = () => {
      const rect = control.getBoundingClientRect();
      return new DOMRect(rect.left - current.x, rect.top - current.y, rect.width, rect.height);
    };

    const measure = (): Motion => {
      if (!field.pointer || field.owner !== entry) return { x: 0, y: 0 };
      const { dx, dy, outside } = reach(rest(), field.pointer);
      if (outside > padding) return { x: 0, y: 0 };
      const pull = 1 - smoothstep(padding * 0.5, padding, outside);
      let x = (dx / magnetStrength) * pull;
      let y = (dy / magnetStrength) * pull;
      const length = Math.hypot(x, y);
      if (length > maxOffset) {
        x *= maxOffset / length;
        y *= maxOffset / length;
      }
      return { x, y };
    };

    const solve = (target: Motion, dt: number) => {
      let resting = true;
      (['x', 'y'] as const).forEach((key) => {
        const force = SPRING.stiffness * (target[key] - current[key]) - SPRING.damping * velocity[key];
        velocity[key] += (force / SPRING.mass) * dt;
        current[key] += velocity[key] * dt;
        if (Math.abs(target[key] - current[key]) > 0.05 || Math.abs(velocity[key]) > 0.05) resting = false;
      });
      return resting;
    };

    const split = (v: number) => `${Math.max(-MAX_SPLIT, Math.min(MAX_SPLIT, v * ABERRATION)).toFixed(2)}px`;

    const apply = () => {
      const moved = Math.abs(current.x) > 0.01 || Math.abs(current.y) > 0.01;
      control.style.transform = moved ? `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)` : '';
      control.style.setProperty('--magnet-vx', split(velocity.x));
      control.style.setProperty('--magnet-vy', split(velocity.y));
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      const target = measure();
      entry.active = target.x !== 0 || target.y !== 0;
      const steps = Math.ceil(dt / (1 / 120));
      let resting = true;
      for (let i = 0; i < steps; i++) resting = solve(target, dt / steps);
      if (resting) {
        current.x = target.x;
        current.y = target.y;
        velocity.x = 0;
        velocity.y = 0;
      }
      apply();
      if (!resting) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    function wake() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const entry = { rest, wake, active: false, padding };
    registry.add(entry);
    if (!detach) detach = attach();

    return () => {
      cancelAnimationFrame(raf);
      registry.delete(entry);
      if (field.owner === entry) field.owner = null;
      control.style.transform = '';
      control.style.removeProperty('--magnet-vx');
      control.style.removeProperty('--magnet-vy');
      if (!registry.size && detach) {
        detach();
        detach = null;
      }
    };
  }, [padding, magnetStrength, maxOffset]);

  return <span ref={probeRef} hidden aria-hidden="true" />;
};

export default Magnet;
