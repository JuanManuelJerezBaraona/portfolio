'use client';

import { useSyncExternalStore } from 'react';
import { MODE_STORAGE_KEY } from './scopeMode';

/**
 * Switches the whole site between fluorescence and brightfield.
 *
 * The look itself is pure CSS: globals.css redefines the tokens under
 * `:root:has(#mode-brightfield:checked)`. JavaScript only remembers the
 * choice: it mirrors it to `<html data-mode>` and localStorage, and an
 * inline script in the layout restores it before the first paint.
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

const ModeToggle = () => {
  const brightfield = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <label className="mode-toggle" htmlFor="mode-brightfield">
      <input
        id="mode-brightfield"
        type="checkbox"
        role="switch"
        checked={brightfield}
        onChange={(event) => setBrightfield(event.target.checked)}
        aria-label="Ver el sitio en campo claro"
      />
      <span className="mode-track" aria-hidden="true">
        <span className="mode-knob" />
      </span>
      <span className="meta mode-label" aria-hidden="true">
        <span className="mode-label-off">Fluorescencia</span>
        <span className="mode-label-on">Campo claro</span>
      </span>
    </label>
  );
};

export default ModeToggle;
