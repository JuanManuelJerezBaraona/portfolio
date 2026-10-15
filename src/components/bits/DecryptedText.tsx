'use client';

/*
 * Decrypted Text, from React Bits (https://reactbits.dev, MIT + Commons
 * Clause, see LICENSE.md). Adapted for this site and cut down to what it uses
 * here, without the `motion` dependency:
 * - the scrambled glyphs are DNA bases, each in its channel the way a Sanger
 *   chromatogram colors them (A GFP, C DAPI, G YFP, T mCherry), so the word
 *   dissolves into a sequence and is read back letter by letter;
 * - the real text is what the server renders (and what stays without JS or
 *   with reduced motion). With `trigger="load"` the read runs once after
 *   `delay` and again on hover; with `trigger="control"` it runs whenever the
 *   pointer enters (or the keyboard focuses) the link or button it labels.
 * As in the original, each scrambled cell keeps the real letter invisible to
 * hold its width, so nothing around it moves, and screen readers get the text.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const BASES = ['A', 'C', 'G', 'T'] as const;
type Base = (typeof BASES)[number];

const BASE_COLOR: Record<Base, string> = {
  A: 'text-gfp',
  C: 'text-dapi',
  G: 'text-yfp',
  T: 'text-mcherry',
};

/** Ticks of pure sequence between the word dissolving and the first letter read back. */
const LEAD = 2;

const isSpace = (char: string) => /\s/.test(char);
const randomBase = (): Base => BASES[Math.floor(Math.random() * BASES.length)];
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

interface DecryptedTextProps {
  text: string;
  /** Wait before the first read, in ms (e.g. until the hero has come into focus). */
  delay?: number;
  /** Time per step of the read, in ms. */
  speed?: number;
  /** `load`: once after `delay`, then on hover. `control`: whenever its link or button is hovered or focused. */
  trigger?: 'load' | 'control';
  className?: string;
}

export default function DecryptedText({
  text,
  delay = 0,
  speed = 70,
  trigger = 'load',
  className = '',
}: DecryptedTextProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  // null = the real letter; a base = that cell is still being read.
  const [cells, setCells] = useState<(Base | null)[]>(() => chars.map(() => null));
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const rootRef = useRef<HTMLSpanElement>(null);

  // A wave turns each letter into a base (letter i at tick i), then a second
  // wave reads them back in the same order (letter i at tick n + LEAD + i).
  const read = useCallback(() => {
    if (timer.current || reducedMotion()) return;
    const total = chars.length;
    let tick = 0;
    const step = () => {
      if (tick >= 2 * total + LEAD) {
        clearInterval(timer.current);
        timer.current = undefined;
        setCells(chars.map(() => null));
        return;
      }
      setCells(
        chars.map((char, index) =>
          !isSpace(char) && tick >= index && tick < total + LEAD + index ? randomBase() : null,
        ),
      );
      tick += 1;
    };
    step();
    timer.current = setInterval(step, Math.max(16, speed));
  }, [chars, speed]);

  useEffect(() => {
    const stop = () => {
      clearInterval(timer.current);
      timer.current = undefined;
    };
    if (trigger === 'load') {
      const start = setTimeout(read, delay);
      return () => {
        clearTimeout(start);
        stop();
      };
    }
    const control = rootRef.current?.closest<HTMLElement>('a, button, .btn');
    if (!control) return stop;
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') read();
    };
    const onFocus = () => {
      if (control.matches(':focus-visible')) read();
    };
    control.addEventListener('pointerenter', onEnter);
    control.addEventListener('focus', onFocus);
    return () => {
      control.removeEventListener('pointerenter', onEnter);
      control.removeEventListener('focus', onFocus);
      stop();
    };
  }, [read, delay, trigger]);

  // A base can be wider than the letter it stands in for: squeeze it to fit.
  useLayoutEffect(() => {
    cells.forEach((base, index) => {
      const glyph = glyphRefs.current[index];
      const cell = cellRefs.current[index];
      if (!base || !glyph || !cell) return;
      glyph.style.transform = '';
      const room = cell.getBoundingClientRect().width;
      const need = glyph.getBoundingClientRect().width;
      // Tailwind's -translate-x-1/2 uses `translate`, so `transform` only scales.
      glyph.style.transform = need > room ? `scaleX(${(room / need).toFixed(3)})` : '';
    });
  }, [cells]);

  return (
    <span ref={rootRef} className={className} onMouseEnter={trigger === 'load' ? read : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, index) => {
          const base = cells[index];
          return base ? (
            <span
              key={index}
              ref={(node) => {
                cellRefs.current[index] = node;
              }}
              className="relative inline-block"
            >
              <span className="invisible">{char}</span>
              <span
                ref={(node) => {
                  glyphRefs.current[index] = node;
                }}
                className={`seq-base absolute left-1/2 top-0 -translate-x-1/2 ${BASE_COLOR[base]}`}
              >
                {base}
              </span>
            </span>
          ) : (
            <span key={index}>{char}</span>
          );
        })}
      </span>
    </span>
  );
}
