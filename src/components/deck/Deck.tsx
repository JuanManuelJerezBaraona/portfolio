'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import Arrow from '@/components/ui/Arrow';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Full-screen slides over the page. Arrows, Page Up/Down, Space, Home and
 * End move between them (so does a clicker), a swipe does on a phone, and
 * the slide in front comes into focus as the last one blurs out. Slides
 * out of view are inert, so Tab never lands on a hidden link. The slide
 * lives in the URL (#3), so a reload keeps it and a link can open on it;
 * it's replaced, not pushed, so Back leaves the deck instead of rewinding.
 */
const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};
const fromHash = () => Math.max(Number.parseInt(window.location.hash.slice(1), 10) - 1 || 0, 0);
const show = (target: number, total: number) => {
  window.history.replaceState(null, '', `#${Math.min(Math.max(target, 0), total - 1) + 1}`);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
};

const Deck = ({ slides }: { slides: ReactNode[] }) => {
  const t = useTranslations('Deck');
  const start = useRef<number | null>(null);
  const total = slides.length;
  const index = Math.min(useSyncExternalStore(subscribe, fromHash, () => 0), total - 1);

  const go = (next: number) => show(next, total);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // Space and Enter keep their meaning on a focused link or button.
      const onControl = (event.target as HTMLElement).closest('a, button');
      if (onControl && (event.key === ' ' || event.key === 'Enter')) return;

      const moves: Record<string, (current: number) => number> = {
        ArrowRight: (i) => i + 1,
        ArrowDown: (i) => i + 1,
        PageDown: (i) => i + 1,
        ' ': (i) => i + 1,
        ArrowLeft: (i) => i - 1,
        ArrowUp: (i) => i - 1,
        PageUp: (i) => i - 1,
        Home: () => 0,
        End: () => total - 1,
      };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      show(move(fromHash()), total);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [total]);

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') start.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (start.current === null) return;
    const dx = event.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      className="deck"
      role="region"
      aria-roledescription={t('label')}
      aria-label={t('label')}
      style={{ '--p': (index + 1) / total } as CSSProperties}
    >
      <div className="deck-progress" aria-hidden="true" />

      <div className="deck-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="deck-slide"
            data-current={i === index || undefined}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="deck-controls meta">
        <Link href="/" className="deck-exit link-underline">
          {t('exit')}
        </Link>
        <span className="deck-hint">{t('hint')}</span>
        <div className="flex items-center gap-1">
          <button type="button" className="deck-btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label={t('prev')}>
            <Arrow dir="prev" />
          </button>
          <span className="tabular-nums" aria-live="polite">
            <span aria-hidden="true">
              {pad(index + 1)} / {pad(total)}
            </span>
            <span className="sr-only">{t('counter', { n: index + 1, total })}</span>
          </span>
          <button
            type="button"
            className="deck-btn"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label={t('next')}
          >
            <Arrow dir="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deck;
