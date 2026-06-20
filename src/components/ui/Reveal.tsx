'use client';

import {
  createElement,
  useEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to a div so it can wrap or replace markup. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Delay before it eases in, in ms — use it to stagger siblings. */
  delay?: number;
  /** Visible ratio that triggers the reveal (0–1). */
  amount?: number;
  /** Re-hide when it scrolls back out of view (default: reveal once). */
  repeat?: boolean;
}

/**
 * Eases its content up into place the first time it enters the viewport.
 * The hidden state lives in CSS under `.reveal-ready`, so without JS the
 * content simply renders visible. Reduced motion is honoured globally.
 */
const Reveal = ({
  children,
  as = 'div',
  className = '',
  style,
  delay = 0,
  amount = 0.18,
  repeat = false,
}: RevealProps) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // No observer support: reveal on the next frame so nothing stays hidden.
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setShown(false);
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, amount, repeat]);

  return createElement(
    as,
    {
      ref: setNode,
      className: `reveal${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`,
      style: { '--reveal-delay': `${delay}ms`, ...style } as CSSProperties,
    },
    children,
  );
};

export default Reveal;
