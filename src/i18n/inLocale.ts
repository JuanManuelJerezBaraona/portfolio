import type { Locale } from 'next-intl';
import type { InLocale } from '@/types';
import { routing } from './routing';

const isLocalized = (value: object): value is Record<Locale, string> => {
  const keys = Object.keys(value);
  return (
    keys.length === routing.locales.length &&
    routing.locales.every((locale) => typeof (value as Record<string, unknown>)[locale] === 'string')
  );
};

/** Resolves every `{ es, en }` pair inside a value to the string of one language. */
export const inLocale = <T>(value: T, locale: Locale): InLocale<T> => {
  if (Array.isArray(value)) {
    return value.map((item) => inLocale(item, locale)) as InLocale<T>;
  }
  if (value && typeof value === 'object') {
    if (isLocalized(value)) return value[locale] as InLocale<T>;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, inLocale(item, locale)]),
    ) as InLocale<T>;
  }
  return value as InLocale<T>;
};
