'use client';

import { useTranslations } from 'next-intl';
import { useRef, useSyncExternalStore, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { MODE_STORAGE_KEY } from './scopeMode';

/**
 * Switches the whole site between fluorescence and brightfield.
 *
 * The look itself is pure CSS: globals.css redefines the tokens under
 * `:root:has(#mode-brightfield:checked)`. JavaScript only remembers the
 * choice: it mirrors it to `<html data-mode>` and localStorage, and an
 * inline script in the layout restores it before the first paint.
 *
 * With JavaScript, the change runs inside a View Transition so it animates
 * as two GPU snapshots (a circle of light spreading from the knob) instead
 * of repainting the page frame by frame.
 */

const EVENT = 'scope-mode-change';

const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
};

const getSnapshot = () => document.documentElement.dataset.mode === 'brightfield';
const getServerSnapshot = () => false;

const setBrightfield = (on: boolean) => {
  const root = document.documentElement;
  if (on) {
    root.dataset.mode = 'brightfield';
  } else {
    delete root.dataset.mode;
  }
  try {
    localStorage.setItem(MODE_STORAGE_KEY, on ? 'brightfield' : 'fluorescence');
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
};

/**
 * Every element with a color transition would otherwise start its own
 * animation when the palette flips (~200 at once), all on the main thread.
 * They're switched off for the instant of the change.
 */
const withoutTransitions = (update: () => void) => {
  const root = document.documentElement;
  root.classList.add('mode-switching');
  update();
  return () => root.classList.remove('mode-switching');
};

const switchLamp = (on: boolean, origin: HTMLElement | null) => {
  const update = () => flushSync(() => setBrightfield(on));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.startViewTransition || reduceMotion) {
    // Deferred: the browser restores the cancelled checkbox right after the
    // click handler, which would undo a synchronous update.
    setTimeout(() => {
      const restore = withoutTransitions(update);
      requestAnimationFrame(() => requestAnimationFrame(restore));
    }, 0);
    return;
  }

  if (origin) {
    const rect = origin.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--vt-x', `${rect.left + rect.width / 2}px`);
    root.style.setProperty('--vt-y', `${rect.top + rect.height / 2}px`);
  }
  let restore = () => {};
  const transition = document.startViewTransition(() => {
    restore = withoutTransitions(update);
  });
  transition.finished.finally(() => restore());
};

const ModeToggle = () => {
  const brightfield = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const knob = useRef<HTMLSpanElement>(null);
  const t = useTranslations('Mode');

  // The click is cancelled so the checkbox (and the `:has()` rule) only flips
  // inside the transition; otherwise the "before" snapshot would already be
  // in the new mode.
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    switchLamp(!brightfield, knob.current);
  };

  return (
    <label className="mode-toggle" htmlFor="mode-brightfield">
      <input
        id="mode-brightfield"
        type="checkbox"
        role="switch"
        checked={brightfield}
        onClick={handleClick}
        onChange={() => {}}
        aria-label={t('label')}
      />
      <span className="mode-track" aria-hidden="true">
        <span ref={knob} className="mode-knob" />
      </span>
      <span className="meta mode-label" aria-hidden="true">
        <span className="mode-label-off">{t('off')}</span>
        <span className="mode-label-on">{t('on')}</span>
      </span>
    </label>
  );
};

export default ModeToggle;
