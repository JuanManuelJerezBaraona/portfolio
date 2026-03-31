import { ImageResponse } from 'next/og';
import { OgShareImage } from '@/components/og/OgShareImage';

export const alt =
  'Juan Manuel Jerez Baraona — Desarrollador Web Full Stack';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OgImage = () => {
  return new ImageResponse(<OgShareImage />, {
    ...size,
  });
};

export default OgImage;
