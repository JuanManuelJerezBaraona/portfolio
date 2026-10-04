import { ImageResponse } from 'next/og';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { micrographSvg } from '@/components/Header/Micrograph';
import { OG_MARK, OG_NAME, OgShareImage, type OgCopy } from '@/components/og/OgShareImage';
import { routing } from '@/i18n/routing';

// `alt` can't vary per route, so it stays readable in both languages.
export const alt = 'Juan Manuel Jerez Baraona · Full-stack · React, Next.js, NestJS';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** One card per language, rendered at build time. */
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

/**
 * Fetches a static TTF instance of a Google font, subset to `text`.
 * Without a browser User-Agent the CSS API answers with TrueType, which is
 * what ImageResponse can read (it can't use woff2 or variable fonts).
 */
const loadGoogleFont = async (query: string, text: string) => {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No TTF found for ${query}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font fetch failed: ${response.status}`);
  return response.arrayBuffer();
};

/** Archivo for the card; if the network fails it falls back to the default sans. */
const loadFonts = async (copy: OgCopy) => {
  try {
    const [expanded, regular, mono] = await Promise.all([
      loadGoogleFont('Archivo:wdth,wght@125,800', copy.title),
      loadGoogleFont('Archivo:wght@400', OG_NAME + copy.detail + copy.footer),
      loadGoogleFont('Martian+Mono:wght@600', OG_MARK),
    ]);
    return [
      { name: 'Archivo Expanded', data: expanded, weight: 800 as const, style: 'normal' as const },
      { name: 'Archivo', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Martian Mono', data: mono, weight: 600 as const, style: 'normal' as const },
    ];
  } catch {
    return [];
  }
};

const OgImage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Og' });
  const copy: OgCopy = { title: t('title'), detail: t('detail'), footer: t('footer') };
  const fonts = await loadFonts(copy);
  const micrographSrc = `data:image/svg+xml;base64,${Buffer.from(micrographSvg()).toString('base64')}`;

  return new ImageResponse(<OgShareImage micrographSrc={micrographSrc} copy={copy} />, {
    ...size,
    fonts: fonts.length ? fonts : undefined,
  });
};

export default OgImage;
