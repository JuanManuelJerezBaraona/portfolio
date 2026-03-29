interface CarouselDotsProps {
  total: number;
  selectedIndex: number;
  onDotClick: (index: number) => void;
  label?: string;
}

const CarouselDots = ({
  total,
  selectedIndex,
  onDotClick,
  label = 'Seleccionar slide',
}: CarouselDotsProps) => {
  if (total <= 1) {
    return null;
  }

  return (
    <div
      className="mt-6 flex items-center justify-center gap-2"
      role="tablist"
      aria-label={label}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === selectedIndex;

        return (
          <button
            key={`dot-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              isActive ? 'w-8 bg-cyan-300' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
            }`}
          >
            <span className="sr-only">Ir al grupo {index + 1}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CarouselDots;
