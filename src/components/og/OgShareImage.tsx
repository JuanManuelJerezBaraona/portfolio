type OgShareImageProps = {
  profileImageSrc: string;
};

const INK = '#07060d';
const TEXT = '#ece8ff';
const MUTED = '#9a95b6';
const NEON = '#ff2e88';
const CYAN = '#35e6ff';
const LIME = '#c6ff4a';
const LINE = 'rgba(150,140,205,0.20)';

const chip = (label: string, color: string) => (
  <div
    style={{
      display: 'flex',
      border: `1px solid ${LINE}`,
      borderRadius: 9,
      padding: '11px 16px',
      marginRight: 12,
      fontSize: 21,
      letterSpacing: 2,
      color,
    }}
  >
    {label}
  </div>
);

const corner = (pos: { top?: number; bottom?: number; left?: number; right?: number }, borders: React.CSSProperties) => (
  <div
    style={{
      position: 'absolute',
      width: 24,
      height: 24,
      display: 'flex',
      ...pos,
      ...borders,
    }}
  />
);

export const OgShareImage = ({ profileImageSrc }: OgShareImageProps) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: INK,
      color: TEXT,
      fontFamily: '"Chakra Petch", sans-serif',
      padding: 64,
      position: 'relative',
      backgroundImage:
        'radial-gradient(820px 520px at 6% -12%, rgba(255,46,136,0.26), transparent 60%), radial-gradient(720px 520px at 104% 116%, rgba(53,230,255,0.18), transparent 60%)',
    }}
  >
    {/* LEFT · thesis + telemetry */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        paddingRight: 44,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: 7,
            backgroundColor: LIME,
            boxShadow: `0 0 14px ${LIME}`,
            marginRight: 12,
            display: 'flex',
          }}
        />
        <div style={{ fontSize: 20, letterSpacing: 5, color: LIME, fontWeight: 600 }}>EN LÍNEA</div>
        <div style={{ fontSize: 20, letterSpacing: 5, color: MUTED, marginLeft: 22, fontWeight: 600 }}>
          SYS://OPERADOR
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02, color: TEXT }}>Construyo el</div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.04,
            backgroundImage: `linear-gradient(100deg, ${NEON}, ${CYAN})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          funnel completo.
        </div>
        <div style={{ display: 'flex', marginTop: 26, fontSize: 27, color: '#bcb7d4', maxWidth: 540 }}>
          Plataformas de seguros 100% online — cotización, pago y postventa.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {chip('CL · PE · CO', CYAN)}
          {chip('05 FLUJOS', TEXT)}
          {chip('16 TEC', TEXT)}
        </div>
        <div style={{ display: 'flex', marginTop: 22, fontSize: 20, letterSpacing: 3, color: MUTED }}>
          juanmanueljerezportfolio.vercel.app
        </div>
      </div>
    </div>

    {/* RIGHT · operator ID badge */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 366,
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          padding: 14,
          borderRadius: 26,
          border: `1px solid ${NEON}`,
          boxShadow: '0 0 70px -12px rgba(255,46,136,0.55)',
          backgroundColor: 'rgba(20,16,34,0.55)',
        }}
      >
        <img
          src={profileImageSrc}
          alt=""
          width={310}
          height={364}
          style={{ borderRadius: 16, objectFit: 'cover' }}
        />
        {corner({ top: 5, left: 5 }, { borderTop: `3px solid ${CYAN}`, borderLeft: `3px solid ${CYAN}` })}
        {corner({ top: 5, right: 5 }, { borderTop: `3px solid ${CYAN}`, borderRight: `3px solid ${CYAN}` })}
        {corner({ bottom: 5, left: 5 }, { borderBottom: `3px solid ${CYAN}`, borderLeft: `3px solid ${CYAN}` })}
        {corner({ bottom: 5, right: 5 }, { borderBottom: `3px solid ${CYAN}`, borderRight: `3px solid ${CYAN}` })}
      </div>

      <div style={{ display: 'flex', marginTop: 26, fontSize: 21, letterSpacing: 5, color: CYAN, fontWeight: 600 }}>
        ID · JJB-001
      </div>
      <div style={{ display: 'flex', marginTop: 10, fontSize: 26, color: TEXT, fontWeight: 700 }}>
        Juan Manuel Jerez
      </div>
    </div>
  </div>
);
