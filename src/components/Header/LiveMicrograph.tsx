'use client';

import { useEffect, useRef } from 'react';
import { whenIdle } from '@/components/motion/gsap';
import { off } from '@/components/motion/debug';

/** The still image's focus pull (0.25 s + 2.2 s) has to finish before anything takes over from it. */
const AFTER_FOCUS_PULL = 2600;

/**
 * The canvas that takes over from the still micrograph once the page has
 * settled: the same culture, drawn live (`liveScope.ts`, fetched on demand,
 * so none of it is in the bundle the page loads with).
 *
 * Until its first frame is drawn, and whenever it can't run (no WebGL2,
 * reduced motion, data saver, no JS), the server's SVG stays as it is. When
 * it's ready it marks the scope `data-live` and CSS cross-fades the two.
 */
const LiveMicrograph = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvas.current;
    const scope = node?.closest<HTMLElement>('.scope');
    const rig = node?.closest<HTMLElement>('.scope-rig');
    if (!node || !scope || !rig || off('live')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;

    let live = true;
    let stop: (() => void) | null = null;
    let cancelIdle = () => {};

    const timer = window.setTimeout(() => {
      cancelIdle = whenIdle(() => {
        import('./liveScope').then(({ startLiveScope }) => {
          if (!live) return;
          stop = startLiveScope(node, rig, {
            onReady: () => scope.setAttribute('data-live', ''),
            onLost: () => scope.removeAttribute('data-live'),
          });
        });
      });
    }, AFTER_FOCUS_PULL);

    return () => {
      live = false;
      window.clearTimeout(timer);
      cancelIdle();
      stop?.();
      scope.removeAttribute('data-live');
    };
  }, []);

  return <canvas ref={canvas} className="scope-live" aria-hidden="true" />;
};

export default LiveMicrograph;
