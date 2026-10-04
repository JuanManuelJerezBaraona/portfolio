import { createNavigation } from 'next-intl/navigation';
import type { Locale } from 'next-intl';
import { routing } from './routing';

export const { Link, usePathname, useRouter, getPathname } = createNavigation(routing);

/** Canonical URL and hreflang alternates for a path, e.g. "/" or "/proyectos/x". */
export const alternatesFor = (href: string, locale: Locale) => ({
  canonical: getPathname({ href, locale }),
  languages: {
    ...Object.fromEntries(routing.locales.map((code) => [code, getPathname({ href, locale: code })])),
    'x-default': getPathname({ href, locale: routing.defaultLocale }),
  },
});
