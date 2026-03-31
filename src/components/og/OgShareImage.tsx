/**
 * Markup for next/og ImageResponse — inline styles only (no Tailwind).
 */
export const OgShareImage = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      background:
        'linear-gradient(145deg, #05070f 0%, #060a18 48%, #070d1f 100%)',
      padding: 72,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: -120,
        top: -100,
        width: 480,
        height: 480,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(34, 211, 238, 0.38) 0%, transparent 68%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: -80,
        bottom: -120,
        width: 520,
        height: 520,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.45,
        backgroundImage:
          'linear-gradient(rgba(71, 85, 126, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 85, 126, 0.12) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 920,
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
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.1,
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
          fontSize: 32,
          fontWeight: 500,
          color: 'rgba(230, 244, 255, 0.88)',
          letterSpacing: '0.04em',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        Desarrollador Web Full Stack
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 22,
          color: 'rgba(165, 214, 255, 0.75)',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
        }}
      >
        React · Next.js · TypeScript
      </div>
    </div>
  </div>
);
