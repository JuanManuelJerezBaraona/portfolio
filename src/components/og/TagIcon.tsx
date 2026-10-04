import { DAPI, GFP, MCHERRY, VOID } from './OgShareImage';

/**
 * The favicon: the logo's three symbols, </>, one channel each, on the
 * page's black. Drawn as strokes so it stays sharp at 16px without a font.
 */
export const TagIcon = ({ size, rounded = true }: { size: number; rounded?: boolean }) => (
  <div
    style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: VOID,
      borderRadius: rounded ? size * 0.2 : 0,
    }}
  >
    <svg
      width={size * 0.78}
      height={size * 0.78}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 6 2 12l5.5 6" stroke={DAPI} />
      <path d="M14 3.5 10 20.5" stroke={GFP} />
      <path d="M16.5 6 22 12l-5.5 6" stroke={MCHERRY} />
    </svg>
  </div>
);
