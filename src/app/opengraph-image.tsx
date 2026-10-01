import { ImageResponse } from 'next/og';
import { micrographSvg } from '@/components/Header/Micrograph';
import {
  OG_DETAIL,
  OG_FOOTER,
  OG_NAME,
  OG_TITLE,
  OgShareImage,
} from '@/components/og/OgShareImage';

export const alt = 'Juan Manuel Jerez Baraona · Desarrollador full-stack. Pasé del microscopio al código.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
const loadFonts = async () => {
  try {
    const [expanded, regular] = await Promise.all([
      loadGoogleFont('Archivo:wdth,wght@125,800', OG_TITLE),
      loadGoogleFont('Archivo:wght@400', OG_NAME + OG_DETAIL + OG_FOOTER),
    ]);
    return [
      { name: 'Archivo Expanded', data: expanded, weight: 800 as const, style: 'normal' as const },
      { name: 'Archivo', data: regular, weight: 400 as const, style: 'normal' as const },
    ];
  } catch {
    return [];
  }
};

const OgImage = async () => {
  const fonts = await loadFonts();
  const micrographSrc = `data:image/svg+xml;base64,${Buffer.from(micrographSvg()).toString('base64')}`;

  return new ImageResponse(<OgShareImage micrographSrc={micrographSrc} />, {
    ...size,
    fonts: fonts.length ? fonts : undefined,
  });
};

export default OgImage;
