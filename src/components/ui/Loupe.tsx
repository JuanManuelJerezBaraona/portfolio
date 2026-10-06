'use client';

import Image, { getImageProps } from 'next/image';
import { useRef, useState, type PointerEvent } from 'react';

const LENS_SIZE = 184;

interface LoupeProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  /** Magnification inside the lens. */
  zoom?: number;
  className?: string;
}

/**
 * An image that magnifies under the cursor, like moving a slide under the
 * objective. Mouse only: touch devices get the plain image. Position is
 * written straight to CSS variables, so moving the lens never re-renders.
 */
const Loupe = ({ src, alt, width, height, sizes, priority, zoom = 2.4, className = '' }: LoupeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // The lens needs ~2.4× the shown width: the optimized 3840px WebP/AVIF
  // (the 2× of 1920), not the original file, which can weigh 1.5 MB+.
  const lensSrc = getImageProps({ src, alt: '', width: 1920, height: Math.round((1920 * height) / width) }).props.src;

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty('--lx', `${x}px`);
    el.style.setProperty('--ly', `${y}px`);
    el.style.setProperty('--bs', `${rect.width * zoom}px`);
    el.style.setProperty('--bp', `${LENS_SIZE / 2 - x * zoom}px ${LENS_SIZE / 2 - y * zoom}px`);
  };

  return (
    <div
      ref={ref}
      className={`loupe ${className}`}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') {
          handleMove(event);
          setActive(true);
        }
      }}
      onPointerMove={handleMove}
      onPointerLeave={() => setActive(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
      {active && (
        <span
          aria-hidden="true"
          className="loupe-lens"
          style={{
            backgroundImage: `url(${lensSrc})`,
            backgroundSize: 'var(--bs) auto',
            backgroundPosition: 'var(--bp)',
          }}
        />
      )}
    </div>
  );
};

export default Loupe;
