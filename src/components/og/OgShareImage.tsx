/**
 * Markup for next/og ImageResponse — inline styles only (no Tailwind).
 * Satori exige display explícito en divs con varios hijos.
 */
type OgShareImageProps = {
  profileImageSrc: string;
};

export const OgShareImage = ({ profileImageSrc }: OgShareImageProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        backgroundImage: `
          linear-gradient(rgba(71, 85, 126, 0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(71, 85, 126, 0.12) 1px, transparent 1px),
          radial-gradient(circle at 8% 18%, rgba(34, 211, 238, 0.32) 0%, transparent 42%),
          radial-gradient(circle at 92% 78%, rgba(99, 102, 241, 0.3) 0%, transparent 46%),
          linear-gradient(145deg, #05070f 0%, #060a18 48%, #070d1f 100%)
        `,
        backgroundSize:
          '48px 48px, 48px 48px, auto, auto, auto',
        opacity: 1,
      }}
    />
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 56,
        padding: '56px 72px',
        height: '100%',
        width: '100%',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          width: 380,
          height: 380,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid rgba(34, 211, 238, 0.45)',
          boxShadow:
            '0 0 0 1px rgba(129, 140, 248, 0.35), 0 24px 48px rgba(0, 0, 0, 0.45)',
        }}
      >
        <img
          src={profileImageSrc}
          alt=""
          width={380}
          height={380}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 120,
            height: 4,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #22d3ee, #818cf8)',
          }}
        />
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.12,
            color: '#e6f4ff',
            letterSpacing: '0.02em',
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
          }}
        >
          Juan Manuel Jerez Baraona
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: 'rgba(230, 244, 255, 0.9)',
            letterSpacing: '0.04em',
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
          }}
        >
          Desarrollador Web Full Stack
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 22,
            color: 'rgba(165, 214, 255, 0.78)',
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
          }}
        >
          React · Next.js · TypeScript
        </div>
      </div>
    </div>
  </div>
);
