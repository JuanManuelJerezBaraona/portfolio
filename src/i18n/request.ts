import { hasLocale, type Locale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import en from './messages/en.json';
import es from './messages/es.json';
import { routing } from './routing';

/** Typed against the Spanish file, so a key missing in English fails the build. */
const MESSAGES: Record<Locale, typeof es> = { es, en };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: MESSAGES[locale] };
});
