'use client';

import { Project } from '@/types';
import { useCallback, useRef, useState } from 'react';
import { A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import CyberArrowIcon from './CyberArrowIcon';
import ProjectCard from './ProjectCard';

import 'swiper/css';
import 'swiper/css/pagination';
import './projects-swiper.css';

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoToPrevious, setCanGoToPrevious] = useState(false);
  const [canGoToNext, setCanGoToNext] = useState(false);

  const handleNavState = useCallback((swiper: SwiperType) => {
    setCanGoToPrevious(!swiper.isBeginning);
    setCanGoToNext(!swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleSwiper = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
      handleNavState(swiper);
    },
    [handleNavState]
  );

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 projects-carousel">
      <p className="sr-only" aria-live="polite">
        Proyecto {activeIndex + 1} de {projects.length}
      </p>

      <div className="relative lg:px-16 xl:px-20 2xl:px-24">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canGoToPrevious}
          className="absolute top-1/2 -left-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-950/70 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.14)] backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1/2 hover:border-cyan-300/55 hover:bg-slate-900/85 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.24)] disabled:cursor-not-allowed disabled:border-slate-700/40 disabled:text-slate-600 disabled:shadow-none disabled:opacity-40 lg:inline-flex 2xl:-left-8"
          aria-label="Ver proyectos anteriores"
        >
          <CyberArrowIcon direction="left" />
        </button>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canGoToNext}
          className="absolute top-1/2 -right-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-300/20 bg-slate-950/70 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.14)] backdrop-blur-xl transition-all duration-300 hover:translate-x-1 hover:-translate-y-1/2 hover:border-cyan-300/55 hover:bg-slate-900/85 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.24)] disabled:cursor-not-allowed disabled:border-slate-700/40 disabled:text-slate-600 disabled:shadow-none disabled:opacity-40 lg:inline-flex 2xl:-right-8"
          aria-label="Ver proyectos siguientes"
        >
          <CyberArrowIcon direction="right" />
        </button>

        <div
          className="-mx-3 -my-4 overflow-x-hidden px-3 py-4 xl:-mx-4 xl:px-4 2xl:-mx-5 2xl:px-5"
          aria-label="Carrusel de proyectos"
          role="region"
        >
          <Swiper
            modules={[Pagination, A11y]}
            onSwiper={handleSwiper}
            onSlideChange={handleNavState}
            onResize={handleNavState}
            slidesPerView={1.12}
            spaceBetween={16}
            speed={450}
            grabCursor
            watchOverflow
            touchRatio={1}
            threshold={5}
            resistance
            resistanceRatio={0.85}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.1,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
            className="projects-swiper"
            aria-roledescription="carousel"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="swiper-slide-inner px-2 py-2 xl:px-2.5">
                  <ProjectCard project={project} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
