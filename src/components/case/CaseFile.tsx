import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { groupTechStack } from '@/constants/data';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types';
import { Countries, Status, hostname, journeyOf, placeLabel, stageLabel } from '@/components/ui/ProjectMeta';
import Reveal from '@/components/ui/Reveal';
import ShotCycle from '@/components/ui/ShotCycle';
import Arrow from '@/components/ui/Arrow';

interface CaseFileProps {
  project: Project;
  /** Every project, for the index at the top: the journey, then his own. */
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
  const mobileShots = project.screenshots?.mobile ?? [];
  const firstOwn = projects.find((node) => node.kind === 'own');

  return (
    <article className="sec-projects px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/#projects" className="meta link-underline text-muted hover:text-text">
            {t('back')}
          </Link>

          <ol className="flex items-center gap-4" aria-label={tProject('index')}>
            {projects.map((node) => {
              const isCurrent = node.id === project.id;
              return (
                <li
                  key={node.id}
                  // A rule where the journey ends and his own projects begin.
                  className={node === firstOwn ? 'border-l border-line-strong pl-4' : undefined}
                >
                  <Link
                    href={`/proyectos/${node.id}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`meta ${isCurrent ? 'text-accent' : 'link-underline text-muted hover:text-text'}`}
                  >
                    {stageLabel(node)}
                    <span className="sr-only">
                      {' '}
                      · {node.kind === 'journey' ? node.flow : `${node.category}: ${node.title}`}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <header className="mt-14">
          <p className="rise meta text-muted">
            {project.kind === 'journey' ? (
              <>
                <span className="text-accent">{placeLabel(project)}</span> · {project.category}
              </>
            ) : (
              <>
                <span className="text-accent">{project.category}</span> · {project.flow}
              </>
            )}
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
                <Arrow dir="out" />
              </a>
            )}
            <Status status={project.status} />
            {project.kind === 'journey' && <Countries countries={project.countries} />}
          </div>
        </header>

        {project.screenshots && (
          <Reveal as="figure" className="mt-14 border border-line bg-stage">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
              <span className="meta truncate text-muted">
                {hostname(project) ?? tProject('internalAddress')}
              </span>
            </div>
            <ShotCycle
              shots={project.screenshots.desktop}
              title={project.title}
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
            </Reveal>

            {mobileShots.length > 0 && (
              <Reveal as="section">
                <h2 className="text-2xl">{t('phone')}</h2>
                <div className="mt-6 flex flex-wrap gap-4">
                  {mobileShots.map((src, index) => (
                    <figure key={src} className="w-[240px] border border-line-strong bg-void p-1.5">
                      <Image
                        src={src}
                        alt={
                          mobileShots.length > 1
                            ? tProject('mobileShotOf', { title: project.title, n: index + 1, total: mobileShots.length })
                            : tProject('mobileShot', { title: project.title })
                        }
                        width={659}
                        height={1024}
                        sizes="240px"
                        className="block h-auto w-full"
                      />
                    </figure>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal as="aside" className="self-start lg:sticky lg:top-28">
            <h2 className="meta border-b border-line pb-3 font-normal text-muted">{t('sheet')}</h2>
            <dl className="divide-y divide-line">
              {/* A stage says which one of the journey it is; a project of his own, that it's his. */}
              {project.kind === 'journey' ? (
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="meta text-muted">{t('stage')}</dt>
                  <dd className="meta">
                    {t('stageOf', {
                      stage: pad(project.stage),
                      total: pad(journeyOf(projects).length),
                      flow: project.flow,
                    })}
                  </dd>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="meta text-muted">{t('kind')}</dt>
                  <dd className="meta">{project.category}</dd>
                </div>
              )}
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="meta text-muted">{t('status')}</dt>
                <dd>
                  <Status status={project.status} />
                </dd>
              </div>
              {project.kind === 'journey' && (
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="meta text-muted">{t('countries')}</dt>
                  <dd>
                    <Countries countries={project.countries} />
                  </dd>
                </div>
              )}
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
            <Link href={`/proyectos/${prev.id}`} className="case-nav group py-8 sm:pr-8" data-dir="prev">
              <span className="meta text-muted">
                <span className="case-nav-arrow">←</span> {placeLabel(prev)}
              </span>
              <span className="case-nav-title wide mt-2 block text-2xl group-hover:text-accent">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/proyectos/${next.id}`}
              className="case-nav group border-t border-line py-8 text-right sm:border-l sm:border-t-0 sm:pl-8"
              data-dir="next"
            >
              <span className="meta text-muted">
                {placeLabel(next)} <span className="case-nav-arrow">→</span>
              </span>
              <span className="case-nav-title wide mt-2 block text-2xl group-hover:text-accent">{next.title}</span>
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
