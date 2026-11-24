import { useLocale, useTranslations } from 'next-intl';
import { getAiBuilds } from '@/constants/data';
import { Link } from '@/i18n/navigation';
import Reveal from '@/components/ui/Reveal';
import { COLUMNS } from './sheet';

/** How far each build has got, said next to where it lives. */
const STATUS = {
  work: 'statusWork',
  live: 'statusLive',
  building: 'statusBuilding',
  study: 'statusStudy',
} as const;

/**
 * What he has built with language models: one row per system, and next to
 * each the control that checks its output. Same sheet as the protocol below
 * it, lettered instead of numbered (these aren't steps, and "back to step
 * 05" has to keep meaning the protocol). No rail and no scroll scene: the
 * rows aren't run in order, they just come into focus.
 */
const Builds = () => {
  const t = useTranslations('Ai');
  const tProject = useTranslations('Project');
  const builds = getAiBuilds(useLocale());

  return (
    <figure id="ia-builds" className="mt-14 border border-line bg-stage lg:mt-16">
      <figcaption className="meta flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-4 py-3 sm:px-6">
        <span className="text-text">{t('builds')}</span>
        <span className="text-muted">{t('buildsNote')}</span>
      </figcaption>

      <div className={`${COLUMNS} meta hidden border-b border-line px-6 py-2.5 text-muted lg:grid`} aria-hidden="true">
        <span />
        <span>{t('system')}</span>
        <span>{t('control')}</span>
      </div>

      <ol>
        {builds.map((build, i) => (
          <li key={build.id} id={`ia-build-${build.id}`} className="border-b border-line">
            <Reveal className={`${COLUMNS} grid gap-y-5 px-4 py-7 sm:px-6 lg:py-9`}>
              <span className="wide text-xl text-accent" aria-hidden="true">
                {String.fromCharCode(65 + i)}
              </span>
              <div>
                <h3 className="text-xl">{build.title}</h3>
                <p className="meta mt-2 text-muted">
                  {build.place} · {t(STATUS[build.status])}
                </p>
                <p className="mt-3 max-w-[38rem] leading-relaxed text-muted">{build.method}</p>
                <ul className="meta mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-accent">
                  {build.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                {build.project && (
                  <Link
                    href={`/proyectos/${build.project}`}
                    className="meta link-underline mt-4 inline-block text-muted hover:text-text"
                  >
                    {tProject('fullCase')} →
                  </Link>
                )}
              </div>
              <div className="col-span-full sm:col-span-1 sm:col-start-2 lg:col-start-3 lg:pt-1.5">
                <p className="meta mb-2.5 text-muted lg:hidden">{t('control')}</p>
                <p className="border border-l-2 border-line border-l-accent bg-void px-3.5 py-3 text-[0.95rem] leading-relaxed">
                  {build.control}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <p className="px-4 py-5 leading-relaxed text-muted sm:px-6">
        <span className="meta mb-1.5 block text-text sm:mb-0 sm:mr-3 sm:inline">{t('beyondLabel')}</span>
        {t('beyond')}
      </p>
    </figure>
  );
};

export default Builds;
