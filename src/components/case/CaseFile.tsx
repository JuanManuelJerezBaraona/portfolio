import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { groupTechStack } from '@/constants/data';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types';
import Loupe from '@/components/ui/Loupe';
import { Countries, Status, hostname } from '@/components/ui/ProjectMeta';
import Reveal from '@/components/ui/Reveal';

interface CaseFileProps {
  project: Project;
  /** The whole journey, for the stage index at the top. */
  projects: Project[];
  prev: Project | null;
  next: Project | null;
}

const pad = (n: number) => String(n).padStart(2, '0');

const CaseFile = ({ project, projects, prev, next }: CaseFileProps) => {
  const t = useTranslations('Case');
  const tProject = useTranslations('Project');
  const tStack = useTranslations('Stack');
  const stackGroups = groupTechStack(project.techStack);
  const mobileShot = project.screenshots?.mobile;

  return (
    <article className="sec-projects px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/#projects" className="meta link-underline text-muted hover:text-text">
            {t('back')}
          </Link>

          <ol className="flex items-center gap-4" aria-label={tProject('stages')}>
            {projects.map((node) => {
              const isCurrent = node.id === project.id;
              return (
                <li key={node.id}>
                  <Link
                    href={`/proyectos/${node.id}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`meta transition-colors ${isCurrent ? 'text-accent' : 'text-muted hover:text-text'}`}
                  >
                    {pad(node.stage)}
                    <span className="sr-only"> · {node.flow}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <header className="mt-14">
          <p className="rise meta text-muted">
            <span className="text-accent">{pad(project.stage)} · {project.flow}</span> · {project.category}
          </p>
          <h1 className="rise display mt-5 text-[2.6rem] sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
            {project.title}
          </h1>
          <p className="rise mt-6 max-w-3xl text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            {project.summary}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: '240ms' }}>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {tProject('openSite')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="square" d="M7 17 17 7m0 0H8m9 0v9" />
                </svg>
              </a>
            )}
            <Status status={project.status} />
            <Countries countries={project.countries} />
          </div>
        </header>

        {project.screenshots?.desktop && (
          <Reveal as="figure" className="mt-14 border border-line bg-stage">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
              <span className="meta truncate text-muted">
                {hostname(project) ?? tProject('internalAddress')}
              </span>
              <span className="meta hidden flex-none text-muted/70 sm:inline">{tProject('hover')}</span>
            </div>
            <Loupe
              src={project.screenshots.desktop}
              alt={tProject('desktopShot', { title: project.title })}
              width={2530}
              height={1140}
              sizes="(min-width: 1152px) 1152px, 100vw"
              priority
            />
          </Reveal>
        )}

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-16">
            <Reveal as="section">
              <h2 className="text-2xl">{t('problem')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{project.challenge}</p>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-2xl">{t('did')}</h2>
              <p className="mt-2 text-muted">{project.role}</p>
              <ul className="mt-6 border-t border-line">
                {project.contributions.map((item) => (
                  <li key={item} className="border-b border-line py-4 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-2xl">{t('outcome')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{project.outcome}</p>
              <ul className="mt-8 grid border-t border-line sm:grid-cols-3 sm:border-b">
                {project.metrics.map((metric) => (
                  <li
                    key={metric.label}
                    className="border-b border-line py-5 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
                  >
                    <span className="wide display block whitespace-nowrap text-[2.1rem] text-accent">{metric.value}</span>
                    <span className="mt-3 block leading-snug text-muted">{metric.label}</span>
                  </li>
                ))}
              </ul>
              <p className="meta mt-4 text-muted/70">{t('approximate')}</p>
            </Reveal>

            {mobileShot && (
              <Reveal as="section">
                <h2 className="text-2xl">{t('phone')}</h2>
                <figure className="mt-6 w-[240px] border border-line-strong bg-void p-1.5">
                  <Image
                    src={mobileShot}
                    alt={tProject('mobileShot', { title: project.title })}
                    width={659}
                    height={1024}
                    sizes="240px"
                    className="block h-auto w-full"
                  />
                </figure>
              </Reveal>
            )}
          </div>

          <Reveal as="aside" className="self-start lg:sticky lg:top-28">
            <h2 className="meta border-b border-line pb-3 font-normal text-muted">{t('sheet')}</h2>
            <dl className="divide-y divide-line">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="meta text-muted">{t('stage')}</dt>
                <dd className="meta">
                  {t('stageOf', { stage: pad(project.stage), total: pad(projects.length), flow: project.flow })}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="meta text-muted">{t('status')}</dt>
                <dd>
                  <Status status={project.status} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="meta text-muted">{t('countries')}</dt>
                <dd>
                  <Countries countries={project.countries} />
                </dd>
              </div>
              {stackGroups.map((group) => (
                <div key={group.key} className="py-3">
                  <dt className="meta text-muted">{tStack(group.key)}</dt>
                  <dd className="mt-1.5">{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <nav className="mt-24 grid border-t border-line sm:grid-cols-2" aria-label={t('neighbours')}>
          {prev ? (
            <Link href={`/proyectos/${prev.id}`} className="group py-8 sm:pr-8">
              <span className="meta text-muted">← {pad(prev.stage)} · {prev.flow}</span>
              <span className="wide mt-2 block text-2xl transition-colors group-hover:text-accent">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/proyectos/${next.id}`}
              className="group border-t border-line py-8 text-right sm:border-l sm:border-t-0 sm:pl-8"
            >
              <span className="meta text-muted">{pad(next.stage)} · {next.flow} →</span>
              <span className="wide mt-2 block text-2xl transition-colors group-hover:text-accent">{next.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </nav>
      </div>
    </article>
  );
};

export default CaseFile;
