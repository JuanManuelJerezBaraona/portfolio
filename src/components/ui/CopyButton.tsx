'use client';

import { useEffect, useRef, useState } from 'react';

interface CopyButtonProps {
  /** What goes to the clipboard. */
  value: string;
  label: string;
  /** Shown (and announced) for a moment once it's copied. */
  done: string;
}

/** Writes to the clipboard, with the old selection trick where the async API isn't allowed. */
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  }
};

/**
 * A secondary button that copies a value. A `mailto:` link only works for
 * someone with a mail client set up; this is the other way to take the
 * address. Once it's copied the button holds its acquired state (the scan it
 * runs on hover, `.btn[data-copied]`) and says so, then goes back. Both
 * labels share one grid cell, so the button never changes width, and the
 * confirmation is announced through a live region: the button keeps its name.
 */
const CopyButton = ({ value, label, done }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button type="button" onClick={copy} className="btn btn-ghost cursor-pointer" data-copied={copied || undefined}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        className="h-4 w-4 flex-none"
        aria-hidden="true"
      >
        {copied ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M9 9h11v11H9zM15 9V4H4v11h5" />}
      </svg>
      <span className="grid">
        <span className={`col-start-1 row-start-1 ${copied ? 'invisible' : ''}`}>{label}</span>
        <span className={`col-start-1 row-start-1 ${copied ? '' : 'invisible'}`} aria-hidden="true">
          {done}
        </span>
      </span>
      <span className="sr-only" role="status">
        {copied ? done : ''}
      </span>
    </button>
  );
};

export default CopyButton;
