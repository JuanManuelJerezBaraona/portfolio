import { ImageResponse } from 'next/og';
import { TagIcon } from '@/components/og/TagIcon';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

const Icon = () => new ImageResponse(<TagIcon size={size.width} />, size);

export default Icon;
