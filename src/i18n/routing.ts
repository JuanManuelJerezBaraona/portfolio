import { defineRouting } from 'next-intl/routing';

/**
 * Spanish lives at the root (/, /proyectos/…) and English under /en.
 * No language detection: a URL always shows the same language, so a shared
 * link reads (and previews) the way it was sent.
 */
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
});
