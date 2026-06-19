import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { OgShareImage } from '@/components/og/OgShareImage';

export const alt =
  'Juan Manuel Jerez Baraona — Full-Stack Developer · El funnel completo, de punta a punta';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Lee el JPEG local; requiere Node (fs) en tiempo de build. */
export const runtime = 'nodejs';

const PROFILE_IMAGE_PATH = join(process.cwd(), 'public', 'profile-image.jpg');

const CHAKRA_FONTS: { url: string; weight: 600 | 700 }[] = [
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/chakrapetch/ChakraPetch-SemiBold.ttf',
    weight: 600,
  },
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/chakrapetch/ChakraPetch-Bold.ttf',
    weight: 700,
  },
];

/** Carga Chakra Petch para el OG; si la red falla, cae al sans por defecto. */
const loadFonts = async () => {
  try {
    return await Promise.all(
      CHAKRA_FONTS.map(async (font) => {
        const response = await fetch(font.url);
        if (!response.ok) throw new Error(`Font fetch failed: ${response.status}`);
        return {
          name: 'Chakra Petch',
          data: await response.arrayBuffer(),
          weight: font.weight,
          style: 'normal' as const,
        };
      })
    );
  } catch {
    return [];
  }
};

const OgImage = async () => {
  const [buffer, fonts] = await Promise.all([readFile(PROFILE_IMAGE_PATH), loadFonts()]);
  const profileImageSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  return new ImageResponse(<OgShareImage profileImageSrc={profileImageSrc} />, {
    ...size,
    fonts: fonts.length ? fonts : undefined,
  });
};

export default OgImage;
