import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger';

export interface MotionKit {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerPlugin;
}

let pending: Promise<MotionKit> | undefined;

/**
 * GSAP and ScrollTrigger, fetched once, the first time something asks for
 * them. They're a dynamic import on purpose: nothing on the first screen
 * needs them, so they stay out of the bundle the page loads with.
 */
export const loadGsap = () => {
  pending ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, plugin]) => {
    core.gsap.registerPlugin(plugin.ScrollTrigger);
    // The address bar sliding away on a phone isn't a resize worth re-measuring for.
    plugin.ScrollTrigger.config({ ignoreMobileResize: true });
    return { gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger };
  });
  return pending;
};

/** Runs `task` once the browser has nothing better to do. Returns a cancel. */
export const whenIdle = (task: () => void, timeout = 1500) => {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(task, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(task, 200);
  return () => window.clearTimeout(id);
};

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
