'use client';

import { Project } from '@/types';
import { useCallback, useState } from 'react';
import { A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import FunnelNode from './FunnelNode';

import 'swiper/css';
import 'swiper/css/pagination';
import './projects-swiper.css';

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="projects-carousel">
      <div className="mb-4 flex items-center justify-between">
        <span className="label text-muted">Desliza el funnel</span>
        <span className="font-mono text-xs text-muted">
          <span className="text-cyan">{String(activeIndex + 1).padStart(2, '0')}</span>
          {' / '}
          {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        Flujo {activeIndex + 1} de {projects.length}
      </p>

      <div className="-mx-4 overflow-hidden px-4" aria-label="Carrusel de flujos" role="region">
        <Swiper
          modules={[Pagination, A11y]}
          onSlideChange={handleSlideChange}
          slidesPerView={1.08}
          spaceBetween={16}
          speed={420}
          grabCursor
          watchOverflow
          threshold={5}
          resistanceRatio={0.85}
          pagination={{ clickable: true }}
          breakpoints={{
            520: { slidesPerView: 1.25, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 20 },
          }}
          className="projects-swiper"
          aria-roledescription="carousel"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="swiper-slide-inner h-full py-1">
                <FunnelNode project={project} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
