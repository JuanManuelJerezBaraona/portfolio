import { CountryCode } from '@/types';

type Tone = 'cyan' | 'neon' | 'lime' | 'muted';

const TONE_COLOR: Record<Tone, string> = {
  cyan: 'var(--cyan)',
  neon: 'var(--neon)',
  lime: 'var(--lime)',
  muted: 'rgba(150, 140, 205, 0.55)',
};

/** Four HUD targeting brackets hugging a `relative` container's corners. */
export const Corners = ({ tone = 'cyan' }: { tone?: Tone }) => {
  const style = { borderColor: TONE_COLOR[tone] };
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2" style={style} />
      <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2" style={style} />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2" style={style} />
      <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2" style={style} />
    </>
  );
};

/** Live/internal status indicator with a pulsing dot. */
export const StatusDot = ({
  status,
  showLabel = true,
}: {
  status: 'live' | 'internal';
  showLabel?: boolean;
}) => {
  const live = status === 'live';
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`dot ${live ? 'dot-live' : 'dot-idle'}`} />
      {showLabel && (
        <span className="label text-muted">{live ? 'En línea' : 'Acceso interno'}</span>
      )}
    </span>
  );
};

/** Country deployment chips, e.g. CL · PE · CO. */
export const Deploy = ({
  countries,
  className = '',
}: {
  countries: CountryCode[];
  className?: string;
}) => (
  <span className={`inline-flex items-center gap-1 ${className}`}>
    {countries.map((country) => (
      <span
        key={country}
        className="label rounded-[5px] border border-line bg-white/[0.03] px-1.5 py-1 text-[0.58rem] text-cyan/85"
      >
        {country}
      </span>
    ))}
  </span>
);
