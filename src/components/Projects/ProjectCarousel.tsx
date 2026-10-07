'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types';
import { Countries, hostname, stageLabel } from '@/components/ui/ProjectMeta';
import ShotCycle from '@/components/ui/ShotCycle';
import Arrow from '@/components/ui/Arrow';

interface ProjectCarouselProps {
  projects: Project[];
}

/** Minor divisions on the scale between two stages. */
const DIVISIONS = 5;

const addressBar = 'meta flex items-center gap-2.5 border-b border-line px-3 py-2.5 text-muted';

const StatusDot = ({ status }: { status: Project['status'] }) => (
  <span
    aria-hidden="true"
    className={`h-1.5 w-1.5 flex-none rounded-full ${status === 'live' ? 'bg-accent' : 'bg-muted'}`}
  />
);

/** Scroll offset that centres the first slide, and the distance from one slide to the next. */
const measure = (track: HTMLElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const second = track.children[1] as HTMLElement | undefined;
  if (!first) return { origin: 0, step: 1 };
  return {
    origin: first.offsetLeft + first.offsetWidth / 2 - track.clientWidth / 2,
    step: second ? second.offsetLeft - first.offsetLeft : 1,
  };
};

/**
 * Mobile projects view: the journey as glass slides on the microscope
 * stage. Swiping moves the stage (native scroll-snap) and only the slide
 * under the objective is in focus. The scale below follows the stage
 * through a CSS variable, so scrolling never re-renders; React only
 * hears which slide is centred.
 */
const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const t = useTranslations('Project');
  const track = useRef<HTMLOListElement>(null);
  const scale = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Until the first measure every slide stays sharp, so nothing is blurred without JS.
  const [ready, setReady] = useState(false);
  const last = projects.length - 1;

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { origin, step } = measure(el);
      const position = Math.min(Math.max((el.scrollLeft - origin) / step, 0), last);
      scale.current?.style.setProperty('--p', last ? String(position / last) : '0');
      setActive(Math.round(position));
      setReady(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    el.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [last]);

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const { origin, step } = measure(el);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: origin + index * step, behavior: reduce ? 'auto' : 'smooth' });
  };

  // A tap on a slide out of focus brings it under the objective instead of following its links.
  const handleSlideClick = (event: MouseEvent, index: number) => {
    if (index === active) return;
    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  return (
    <div role="region" aria-roledescription={t('carousel')} aria-label={t('carouselLabel')}>
      <div className="stage -mx-4 sm:-mx-6">
        <ol ref={track} className="stage-track">
          {projects.map((project, index) => {
            const host = hostname(project) ?? t('internalAddress');
            const focus = !ready || index === active ? 'in' : index < active ? 'before' : 'after';
            return (
              <li
                key={project.id}
                className="stage-slide"
                data-focus={focus}
                onClickCapture={(event) => handleSlideClick(event, index)}
                onFocus={() => index !== active && goTo(index)}
              >
                <article className="slide">
                  <header className="slide-label">
                    <span className="slide-stage display">{stageLabel(project)}</span>
                    <span className="min-w-0">
                      <span className="wide block truncate text-xl leading-none">{project.flow}</span>
                      <span className="mt-2 block">
                        <Countries countries={project.countries} />
                      </span>
                    </span>
                  </header>

                  <figure className="slide-specimen">
                    <div className="border border-line bg-stage">
                      {/* The address bar doubles as the status: public sites link out, internal ones say so. */}
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t('openSiteAt', { host })}
                          className={addressBar}
                        >
                          <StatusDot status={project.status} />
                          <span className="flex-1 truncate">{host}</span>
                          <Arrow dir="out" className="h-3.5 w-3.5 flex-none" />
                        </a>
                      ) : (
                        <p className={addressBar}>
                          <StatusDot status={project.status} />
                          <span className="flex-1 truncate">{host}</span>
                        </p>
                      )}
                      {project.screenshots && (
                        <ShotCycle
                          shots={project.screenshots.desktop}
                          title={project.title}
                          sizes="(min-width: 640px) 384px, 80vw"
                          active={focus === 'in'}
                          phone={{ shots: project.screenshots.mobile, className: 'slide-phone', sizes: '110px' }}
                        />
                      )}
                    </div>
                  </figure>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[1.4rem] leading-tight">{project.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
                    <div className="mt-auto pt-6">
                      <Link href={`/proyectos/${project.id}`} className="link-underline font-medium">
                        {t('fullCase')} →
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>

      <div ref={scale} className="vernier" style={{ '--n': projects.length } as CSSProperties}>
        <div role="group" aria-label={t('scale')} className="vernier-stops">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={t('stage', { stage: stageLabel(project), flow: project.flow })}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => goTo(index)}
              className="vernier-stop meta"
            >
              {stageLabel(project)}
            </button>
          ))}
        </div>
        <div className="vernier-scale" aria-hidden="true">
          {Array.from({ length: last * DIVISIONS + 1 }, (_, tick) => (
            <span key={tick} className={`vernier-tick${tick % DIVISIONS === 0 ? ' is-major' : ''}`} />
          ))}
          <span className="vernier-cursor" />
        </div>
        <p className="meta mt-4 text-center text-muted">{t('swipe')}</p>
      </div>
    </div>
  );
};

export default ProjectCarousel;
