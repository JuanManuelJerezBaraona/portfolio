'use client';

import { Project } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import CarouselDots from './CarouselDots';
import CyberArrowIcon from './CyberArrowIcon';
import ProjectCard from './ProjectCard';

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const canGoToPrevious = emblaApi?.canGoToPrev() ?? false;
  const canGoToNext = emblaApi?.canGoToNext() ?? false;

  const handleSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedSnap());
    setScrollSnaps(emblaApi.snapList());
  }, [emblaApi]);

  const handleGoToPrevious = () => {
    emblaApi?.goToPrev();
  };

  const handleGoToNext = () => {
    emblaApi?.goToNext();
  };

  const handleDotClick = (index: number) => {
    emblaApi?.goTo(index);
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.snapList());
    setSelectedIndex(emblaApi.selectedSnap());
    emblaApi.on('select', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <p className="sr-only" aria-live="polite">
        Proyecto {selectedIndex + 1} de {projects.length}
      </p>

      <div className="relative overflow-visible lg:px-16 xl:px-20 2xl:px-24">
        <button
          type="button"
          onClick={handleGoToPrevious}
          disabled={!canGoToPrevious}
          className="absolute top-1/2 -left-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-950/70 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1/2 hover:border-cyan-300/55 hover:bg-slate-900/85 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.24)] disabled:cursor-not-allowed disabled:border-slate-700/40 disabled:text-slate-600 disabled:shadow-none disabled:opacity-40 lg:inline-flex 2xl:-left-8"
          aria-label="Ver proyectos anteriores"
        >
          <CyberArrowIcon direction="left" />
        </button>

        <button
          type="button"
          onClick={handleGoToNext}
          disabled={!canGoToNext}
          className="absolute top-1/2 -right-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-950/70 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.14)] backdrop-blur-xl transition-all duration-300 hover:translate-x-1 hover:-translate-y-1/2 hover:border-cyan-300/55 hover:bg-slate-900/85 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.24)] disabled:cursor-not-allowed disabled:border-slate-700/40 disabled:text-slate-600 disabled:shadow-none disabled:opacity-40 lg:inline-flex 2xl:-right-8"
          aria-label="Ver proyectos siguientes"
        >
          <CyberArrowIcon direction="right" />
        </button>

        <div
          ref={emblaRef}
          className="-mx-3 -my-4 overflow-hidden px-3 py-4 xl:-mx-4 xl:px-4 2xl:-mx-5 2xl:px-5"
          aria-label="Carrusel de proyectos"
          aria-roledescription="carousel"
        >
          <div className="flex [touch-action:pan-y_pinch-zoom]">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative min-w-0 overflow-visible px-2 py-2 flex-[0_0_88%] sm:flex-[0_0_72%] lg:flex-[0_0_58%] xl:flex-[0_0_33.333%] xl:px-2.5"
              >
                <ProjectCard project={project} compact />
              </div>
            ))}
          </div>
        </div>
      </div>

      <CarouselDots
        total={scrollSnaps.length}
        selectedIndex={selectedIndex}
        onDotClick={handleDotClick}
        label="Seleccionar grupo de proyectos"
      />
    </div>
  );
};

export default ProjectsCarousel;
