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
