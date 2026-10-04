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

// Fluorescence-mode colors, hardcoded: ImageResponse can't read CSS variables.
export const VOID = '#030508';
const TEXT = '#e6ecf2';
const MUTED = '#8593a3';
const LINE = 'rgba(150,175,205,0.22)';
export const DAPI = '#6f8cff';
export const GFP = '#4ef08f';
export const MCHERRY = '#ff4f73';

export const OG_NAME = 'Juan Manuel Jerez Baraona';
export const OG_MARK = '</JM>';

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
        {/* The logo, as in the navbar: </JM> with one channel per symbol. */}
        <div style={{ display: 'flex', fontFamily: 'Martian Mono', fontSize: 26, fontWeight: 600, marginRight: 18 }}>
          <span style={{ color: DAPI }}>&lt;</span>
          <span style={{ color: GFP }}>/</span>
          <span style={{ color: TEXT }}>JM</span>
          <span style={{ color: MCHERRY }}>&gt;</span>
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
