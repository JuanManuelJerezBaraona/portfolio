'use client';

import { useEffect } from 'react';

/**
 * Pauses non-essential background animations while the page is scrolling.
 * Adds `is-scrolling` to <html> on scroll and clears it shortly after the
 * user stops, so the main thread stays free for smooth scrolling on mobile.
 * Renders nothing.
 */
const ScrollMotionGuard = () => {
  useEffect(() => {
    const root = document.documentElement;
    let timer: number;

    const onScroll = () => {
      root.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = window.setTimeout(() => root.classList.remove('is-scrolling'), 160);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
      root.classList.remove('is-scrolling');
    };
  }, []);

  return null;
};

export default ScrollMotionGuard;
