import { ImageResponse } from 'next/og';
import { TagIcon } from '@/components/og/TagIcon';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS rounds the corners itself, so the square goes edge to edge.
const AppleIcon = () => new ImageResponse(<TagIcon size={size.width} rounded={false} />, size);

export default AppleIcon;
