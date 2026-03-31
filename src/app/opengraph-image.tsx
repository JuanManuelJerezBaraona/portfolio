import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { OgShareImage } from '@/components/og/OgShareImage';

export const alt =
  'Juan Manuel Jerez Baraona — Desarrollador Web Full Stack';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Lee el JPEG local; requiere Node (fs) en tiempo de build. */
export const runtime = 'nodejs';

const PROFILE_IMAGE_PATH = join(process.cwd(), 'public', 'profile-image.jpg');

const OgImage = async () => {
  const buffer = await readFile(PROFILE_IMAGE_PATH);
  const profileImageSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  return new ImageResponse(
    <OgShareImage profileImageSrc={profileImageSrc} />,
    {
      ...size,
    },
  );
};

export default OgImage;
