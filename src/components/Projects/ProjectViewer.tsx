'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types';
import { Countries, Status, hostname, stageLabel } from '@/components/ui/ProjectMeta';
import ShotCycle from '@/components/ui/ShotCycle';
import Arrow from '@/components/ui/Arrow';

interface ProjectViewerProps {
  projects: Project[];
}

/**
 * Desktop projects view: the five apps lie one after another on a vertical
 * stage, so scrolling is enough to see them all. The journey stays pinned
 * on the left as an index; the project crossing the middle of the screen
 * is under the objective (in focus, and marked in the index) and the rest
 * sit outside the focal plane. A click on the index moves the stage there.
 */
const ProjectViewer = ({ projects }: ProjectViewerProps) => {
  const t = useTranslations('Project');
  const fields = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Until the observer reports, every project stays sharp, so nothing is blurred without JS.
  const [ready, setReady] = useState(false);
  const total = String(projects.length).padStart(2, '0');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    // A thin band across the middle of the viewport: whatever crosses it is in focus.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
        setReady(true);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const field of fields.current) {
      if (field) observer.observe(field);
    }
    return () => observer.disconnect();
  }, []);

  const goTo = (event: MouseEvent, index: number) => {
    const field = fields.current[index];
    if (!field) return;
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    field.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    field.focus({ preventScroll: true });
  };

  return (
    <div className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-14 xl:gap-20">
      <nav aria-label={t('stages')} className="self-start lg:sticky lg:top-28">
        <ol className="border-t border-line">
          {projects.map((item, index) => {
            const isActive = ready && index === active;
            return (
              <li key={item.id}>
                <a
                  href={`#project-${item.id}`}
                  onClick={(event) => goTo(event, index)}
                  aria-current={isActive ? 'true' : undefined}
                  className="sample-row group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-line px-4 py-5"
                >
                  <span className={`meta ${isActive ? 'text-accent' : 'text-muted'}`}>{stageLabel(item)}</span>
                  <span>
                    <span
                      className={`sample-flow wide block text-[1.55rem] leading-none ${
                        isActive ? 'text-text' : 'text-muted group-hover:text-text'
                      }`}
                    >
                      {item.flow}
                    </span>
                    <span className="mt-2 block text-[0.95rem] text-muted">{item.title}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <ol className="space-y-24">
        {projects.map((project, index) => (
          <li
            key={project.id}
            id={`project-${project.id}`}
            ref={(node) => {
              fields.current[index] = node;
            }}
            data-index={index}
            data-focus={!ready || index === active ? 'in' : 'out'}
            data-current={(ready && index === active) || undefined}
            tabIndex={-1}
            className="field"
          >
            <article aria-labelledby={`project-${project.id}-title`}>
              {/* Where one project starts: a rule with its stage, lit when it's under the objective. */}
              <p className="field-head">
                <span className="meta text-accent">
                  {stageLabel(project)} · {project.flow}
                </span>
                <Countries countries={project.countries} />
                <Status status={project.status} />
                <span className="meta ml-auto text-muted">
                  {stageLabel(project)} / {total}
                </span>
              </p>

              <div className="field-body">
                <figure className="relative mt-6">
                  <div className="border border-line bg-stage">
                    <div className="border-b border-line px-4 py-2.5">
                      <span className="meta block truncate text-muted">{hostname(project) ?? t('internalAddress')}</span>
                    </div>
                    {project.screenshots && (
                      <ShotCycle
                        shots={project.screenshots.desktop}
                        title={project.title}
                        sizes="(min-width: 1280px) 760px, 60vw"
                        active={index === active}
                        phone={{
                          shots: project.screenshots.mobile,
                          className:
                            'pointer-events-none absolute -bottom-10 -right-5 w-[19%] border border-line-strong bg-void p-1 shadow-[0_24px_50px_-12px_var(--shade)]',
                          sizes: '150px',
                        }}
                      />
                    )}
                  </div>
                </figure>

                <div className="mt-12 max-w-[36rem]">
                  <h3 id={`project-${project.id}-title`} className="text-3xl leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
                  <p className="meta mt-6 leading-relaxed text-muted">{project.techStack.join(' / ')}</p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/proyectos/${project.id}`} className="btn btn-primary">
                      {t('fullCase')}
                      <Arrow dir="right" />
                    </Link>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        {t('openSite')}
                        <Arrow dir="out" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProjectViewer;
