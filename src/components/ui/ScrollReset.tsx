'use client';

import { useEffect } from 'react';

const ScrollReset = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Beat any late scroll on initial load: hydration, font-driven layout
    // shift, or the mobile Swiper measuring/initialising its slides.
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));

    // bfcache: restoring from back/forward re-fires pageshow with persisted.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.scrollTo(0, 0);
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
