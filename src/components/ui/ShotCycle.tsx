'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from 'react';
import Loupe from '@/components/ui/Loupe';

/** Every desktop shot is cropped to this frame, so they can sit on top of each other. */
const WIDTH = 2530;
const HEIGHT = 1140;
const PHONE_WIDTH = 659;
const PHONE_HEIGHT = 1024;

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const subscribeNothing = () => () => {};

const pad = (n: number) => String(n).padStart(2, '0');

interface ShotCycleProps {
  shots: string[];
  /** Project title, for the alt text. */
  title: string;
  sizes: string;
  /** Magnify under the cursor (mouse only). */
  loupe?: boolean;
  priority?: boolean;
  /** False holds the cycle, e.g. on a carousel slide out of focus. */
  active?: boolean;
  /** Mobile shots, paired by index with `shots`: the phone shows the one that matches the current shot. */
  phone?: { shots: string[]; className: string; sizes: string };
}

/**
 * A project's desktop screenshots. With more than one, the stage moves to
 * the next field every few seconds: the current shot drifts out of focus as
 * the next one comes in. The readout under the frame times each field (the
 * fill's animationend advances it), so pausing is just pausing the fill. It
 * holds while the mouse is over the shot (the loupe never loses its
 * subject) or the frame is off screen, and for good once someone picks a
 * shot or presses pause. With reduced motion, or without JS, it stays put.
 */
const ShotCycle = ({ shots, title, sizes, loupe = false, priority, active = true, phone }: ShotCycleProps) => {
  const t = useTranslations('Project');
  const frame = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MOTION_QUERY).matches, () => true);

  const total = shots.length;
  const many = total > 1;
  const canPlay = many && !reduced;
  const timing = canPlay && !stopped;
  const running = timing && active && visible && !hovered;

  useEffect(() => {
    const el = frame.current;
    if (!el || !many) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [many]);

  const hover = (value: boolean) => (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setHovered(value);
  };

  const choose = (index: number) => {
    setCurrent(index);
    setStopped(true);
  };

  const phoneShots = phone?.shots ?? [];
  const phoneCurrent = Math.min(current, phoneShots.length - 1);

  return (
    <>
      <div ref={frame} className="shots">
        <div className="shots-stack" onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
          {shots.map((src, index) => {
            const isCurrent = index === current;
            const alt = many ? t('desktopShotOf', { title, n: index + 1, total }) : t('desktopShot', { title });
            return (
              <div key={src} className="shot" data-current={isCurrent || undefined} aria-hidden={isCurrent ? undefined : true}>
                {loupe ? (
                  <Loupe src={src} alt={alt} width={WIDTH} height={HEIGHT} sizes={sizes} priority={priority && index === 0} />
                ) : (
                  <Image
                    src={src}
                    alt={alt}
                    width={WIDTH}
                    height={HEIGHT}
                    sizes={sizes}
                    priority={priority && index === 0}
                    className="block h-auto w-full"
                  />
                )}
              </div>
            );
          })}
        </div>

        {many && hydrated && (
          <div role="group" aria-label={t('shots')} className="shots-readout meta">
            {canPlay && (
              <button
                type="button"
                aria-label={stopped ? t('playShots') : t('pauseShots')}
                onClick={() => setStopped(!stopped)}
                className="shot-toggle"
              >
                <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5" aria-hidden="true">
                  {stopped ? <path d="M2.5 1.5v9l8-4.5z" /> : <path d="M2 1.5h2.75v9H2zm5.25 0H10v9H7.25z" />}
                </svg>
              </button>
            )}
            <span className="flex">
              {shots.map((src, index) => {
                const isCurrent = index === current;
                return (
                  <button
                    key={src}
                    type="button"
                    aria-label={t('showShot', { n: index + 1, total })}
                    aria-current={isCurrent ? 'true' : undefined}
                    onClick={() => choose(index)}
                    className="shot-tick"
                  >
                    <span className="shot-track">
                      {isCurrent && (
                        <span
                          className="shot-fill"
                          data-timing={timing || undefined}
                          style={{ animationPlayState: running ? 'running' : 'paused' }}
                          onAnimationEnd={() => setCurrent((index + 1) % total)}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </span>
            <span aria-hidden="true" className="shots-count tabular-nums">
              {pad(current + 1)} / {pad(total)}
            </span>
          </div>
        )}
      </div>

      {/* Outside .shots, so the figure around the frame still places it. */}
      {phone && phoneShots.length > 0 && (
        <div className={phone.className}>
          <div className="shots-stack">
            {phoneShots.map((src, index) => {
              const isCurrent = index === phoneCurrent;
              const alt =
                phoneShots.length > 1
                  ? t('mobileShotOf', { title, n: index + 1, total: phoneShots.length })
                  : t('mobileShot', { title });
              return (
                <div key={src} className="shot" data-current={isCurrent || undefined} aria-hidden={isCurrent ? undefined : true}>
                  <Image
                    src={src}
                    alt={alt}
                    width={PHONE_WIDTH}
                    height={PHONE_HEIGHT}
                    sizes={phone.sizes}
                    className="block h-auto w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ShotCycle;
