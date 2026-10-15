'use client';

/*
 * Text Type, from React Bits (https://reactbits.dev, MIT + Commons Clause,
 * see LICENSE.md). Adapted for this site and cut down to one use, typing out a
 * file as if it were printed in a terminal, without the `gsap` dependency (the
 * cursor blinks in CSS, `.type-caret` in globals.css):
 * - it types once, when the block first comes into view (`startOnVisible`),
 *   at a slightly uneven pace (`variableSpeed`), with a block cursor;
 * - the full text is always in the page, transparent while it's typed over,
 *   so the block keeps its size (nothing below it moves) and screen readers
 *   and search engines read all of it;
 * - without JS, with reduced motion, or if the block is already on screen
 *   when the page loads, it simply shows the text.
 */

import { useEffect, useRef, useState } from 'react';

interface TextTypeProps {
  text: string;
  /** Wait after it comes into view, in ms. */
  initialDelay?: number;
  /** Range of ms per character; each one picks a value in it. */
  variableSpeed?: { min: number; max: number };
  className?: string;
}

/** idle: the plain text. armed: hidden, waiting to be seen. typing / typed: the overlay. */
type Phase = 'idle' | 'armed' | 'typing' | 'typed';

export default function TextType({
  text,
  initialDelay = 0,
  variableSpeed = { min: 8, max: 26 },
  className = '',
}: TextTypeProps) {
  const ref = useRef<HTMLPreElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let typed = 0;
    const next = () => {
      typed += 1;
      setCount(typed);
      if (typed >= text.length) {
        setPhase('typed');
        return;
      }
      // Line breaks take a beat longer, like the end of a line being read.
      const pause = text[typed - 1] === '\n' ? variableSpeed.max * 3 : 0;
      const delay = variableSpeed.min + Math.random() * (variableSpeed.max - variableSpeed.min);
      timer = setTimeout(next, delay + pause);
    };

    // Off screen, so hiding it a frame after hydration is never seen.
    const arm = requestAnimationFrame(() => setPhase((current) => (current === 'idle' ? 'armed' : current)));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setPhase('typing');
        timer = setTimeout(next, initialDelay);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(arm);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [text, initialDelay, variableSpeed.min, variableSpeed.max]);

  const overlay = phase === 'typing' || phase === 'typed';

  return (
    <pre ref={ref} className={className}>
      <span className="relative block">
        <span className={phase === 'idle' ? undefined : 'opacity-0'}>{text}</span>
        {overlay && (
          <span className="absolute inset-0" aria-hidden="true">
            {text.slice(0, count)}
            <span className={`type-caret${phase === 'typed' ? ' is-done' : ''}`} />
          </span>
        )}
      </span>
    </pre>
  );
}
