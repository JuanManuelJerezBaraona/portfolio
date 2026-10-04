/** The translated lines of the card. */
export type OgCopy = {
  title: string;
  detail: string;
  footer: string;
};

type OgShareImageProps = {
  micrographSrc: string;
  copy: OgCopy;
};

const VOID = '#030508';
const TEXT = '#e6ecf2';
const MUTED = '#8593a3';
const LINE = 'rgba(150,175,205,0.22)';
const DAPI = '#6f8cff';
const GFP = '#4ef08f';
const MCHERRY = '#ff4f73';

export const OG_NAME = 'Juan Manuel Jerez Baraona';

const dot = (color: string, style: React.CSSProperties) => (
  <div
    style={{
      position: 'absolute',
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: color,
      opacity: 0.9,
      display: 'flex',
      ...style,
    }}
  />
);

export const OgShareImage = ({ micrographSrc, copy }: OgShareImageProps) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: VOID,
      color: TEXT,
      fontFamily: 'Archivo',
      padding: '64px 0 64px 72px',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', position: 'relative', width: 32, height: 30, marginRight: 16 }}>
          {dot(DAPI, { left: 0, bottom: 0 })}
          {dot(GFP, { right: 0, bottom: 0 })}
          {dot(MCHERRY, { left: 7, top: 0 })}
        </div>
        <div style={{ fontSize: 26, color: TEXT }}>{OG_NAME}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontFamily: 'Archivo Expanded',
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -2.5,
            maxWidth: 640,
          }}
        >
          {copy.title}
        </div>
        <div style={{ marginTop: 30, fontSize: 26, color: MUTED }}>{copy.detail}</div>
      </div>

      <div style={{ display: 'flex', fontSize: 20, color: MUTED, borderTop: `1px solid ${LINE}`, paddingTop: 18, maxWidth: 600 }}>
        {copy.footer}
      </div>
    </div>

    <div
      style={{
        display: 'flex',
        width: 470,
        height: 470,
        marginRight: -70,
        borderRadius: 235,
        border: `1px solid ${LINE}`,
        boxShadow: '0 0 0 14px #0a0e14',
      }}
    >
      <img src={micrographSrc} alt="" width={470} height={470} style={{ borderRadius: 235 }} />
    </div>
  </div>
);
