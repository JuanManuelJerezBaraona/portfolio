/**
 * Open Graph: solo la foto a pantalla completa (sin marcos ni fondo).
 * Título y descripción siguen en metadata; WhatsApp las muestra al lado.
 */
type OgShareImageProps = {
  profileImageSrc: string;
};

export const OgShareImage = ({ profileImageSrc }: OgShareImageProps) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
    }}
  >
    <img
      src={profileImageSrc}
      alt=""
      width={1200}
      height={630}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
      }}
    />
  </div>
);
