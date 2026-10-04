'use client';

import { useLocale, useTranslations } from 'next-intl';
import { getPathname, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/** Each language is announced in itself, so a reader recognizes theirs. */
const NAMES = { es: 'Español', en: 'English' } as const;

/**
 * ES / EN: the same page in the other language. On phones only the other
 * language shows, so the bar still fits the name. Plain links to the final
 * URL (/proyectos/x, /en/proyectos/x): changing language swaps the root
 * layout anyway, and next-intl's Link would route Spanish through /es and
 * a redirect.
 */
const LocaleSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Nav');

  return (
    <ul className="meta flex items-center" aria-label={t('language')}>
      {routing.locales.map((code, index) => {
        const isCurrent = code === locale;
        return (
          <li key={code} className={`items-center ${isCurrent ? 'hidden sm:flex' : 'flex'}`}>
            {index > 0 && (
              <span className="hidden px-1 text-muted/50 sm:inline" aria-hidden="true">
                /
              </span>
            )}
            <a
              href={getPathname({ href: pathname, locale: code })}
              hrefLang={code}
              lang={code}
              aria-label={NAMES[code]}
              aria-current={isCurrent ? 'true' : undefined}
              className={`py-2 uppercase transition-colors ${isCurrent ? 'text-text' : 'text-muted hover:text-text'}`}
            >
              {code}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default LocaleSwitch;
