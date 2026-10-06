'use client';

import { useEffect } from 'react';

const ScrollReset = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // A link to a section (/#projects) opens on that section; anything else
    // opens at the top. Re-applied a frame later to beat any late scroll on
    // initial load: hydration or font-driven layout shift.
    const settle = () => {
      const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo(0, 0);
      }
    };
    settle();
    const raf = requestAnimationFrame(settle);

    // bfcache: restoring from back/forward re-fires pageshow with persisted.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        settle();
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return null;
};

export default ScrollReset;
