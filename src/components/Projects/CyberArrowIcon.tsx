interface CyberArrowIconProps {
  direction: 'left' | 'right';
}

const CyberArrowIcon = ({ direction }: CyberArrowIconProps) => {
  const isLeft = direction === 'left';

  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={isLeft ? 'M13.5 6L8 12L13.5 18' : 'M10.5 6L16 12L10.5 18'}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={isLeft ? 'M16 12H8.75' : 'M8 12H15.25'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d={isLeft ? 'M16.5 8H11.5' : 'M7.5 8H12.5'}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d={isLeft ? 'M16.5 16H11.5' : 'M7.5 16H12.5'}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
};

export default CyberArrowIcon;
