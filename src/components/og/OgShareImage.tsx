/**
 * Vista previa social: composición centrada para que recortes cuadrados
 * (p. ej. WhatsApp) no corten la cara. Sin texto en la imagen — title/description van en metadata.
 * Markup compatible con Satori (next/og): display explícito, pocos nodos.
 */
type OgShareImageProps = {
  profileImageSrc: string;
};

export const OgShareImage = ({ profileImageSrc }: OgShareImageProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(165deg, #05070f 0%, #0c1528 45%, #05070f 100%)',
    }}
  >
    <div
      style={{
        display: 'flex',
        width: 440,
        height: 440,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid rgba(34, 211, 238, 0.4)',
      }}
    >
      <img
        src={profileImageSrc}
        alt=""
        width={440}
        height={440}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />
    </div>
  </div>
);
