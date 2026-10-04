'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types';
import Loupe from '@/components/ui/Loupe';
import { Countries, Status, hostname, stageLabel } from '@/components/ui/ProjectMeta';

interface ProjectViewerProps {
  projects: Project[];
}

/**
 * Desktop projects view: the journey as a list of tabs on the left and the
 * selected project under the loupe on the right.
 */
const ProjectViewer = ({ projects }: ProjectViewerProps) => {
  const t = useTranslations('Project');
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[selected];

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: projects.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + projects.length) % projects.length;
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-14">
      <div role="tablist" aria-orientation="vertical" aria-label={t('stages')} className="border-t border-line">
        {projects.map((item, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="project-panel"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="sample-row grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-line px-4 py-6 text-left"
            >
              <span className={`meta ${isSelected ? 'text-accent' : 'text-muted'}`}>{stageLabel(item)}</span>
              <span>
                <span
                  className={`wide block text-[1.7rem] leading-none transition-colors ${
                    isSelected ? 'text-text' : 'text-muted'
                  }`}
                >
                  {item.flow}
                </span>
                <span className="mt-2 block text-[0.95rem] text-muted">{item.title}</span>
              </span>
              <span className="flex flex-col items-end gap-1.5">
                <Countries countries={item.countries} />
                <Status status={item.status} />
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`tab-${project.id}`}
        className="self-start lg:sticky lg:top-28"
      >
        <div key={project.id} className="refocus">
          <figure className="relative">
            <div className="border border-line bg-stage">
              <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
                <span className="meta truncate text-muted">{hostname(project) ?? t('internalAddress')}</span>
                <span className="meta flex-none text-muted/70">{t('hover')}</span>
              </div>
              {project.screenshots?.desktop && (
                <Loupe
                  src={project.screenshots.desktop}
                  alt={t('desktopShot', { title: project.title })}
                  width={2530}
                  height={1140}
                  sizes="(min-width: 1280px) 720px, 60vw"
                />
              )}
            </div>
            {project.screenshots?.mobile && (
              <div className="pointer-events-none absolute -bottom-10 -right-5 w-[19%] border border-line-strong bg-void p-1 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)]">
                <Image
                  src={project.screenshots.mobile}
                  alt={t('mobileShot', { title: project.title })}
                  width={659}
                  height={1024}
                  sizes="140px"
                  className="block h-auto w-full"
                />
              </div>
            )}
          </figure>

          <div className="mt-12 max-w-[34rem]">
            <h3 className="text-3xl leading-tight">{project.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
            <p className="meta mt-6 leading-relaxed text-muted">{project.techStack.join(' / ')}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/proyectos/${project.id}`} className="btn btn-primary">
                {t('fullCase')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="square" d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </Link>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  {t('openSite')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                    <path strokeLinecap="square" d="M7 17 17 7m0 0H8m9 0v9" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
