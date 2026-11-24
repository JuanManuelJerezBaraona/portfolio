import { useTranslations } from 'next-intl';
import { CountryCode, JourneyProject, Project } from '@/types';

/** The Seguros Falabella apps, in journey order: what "NN / 05" counts. */
export const journeyOf = (projects: Project[]) =>
  projects.filter((project): project is JourneyProject => project.kind === 'journey');

/** Position in the journey as two digits, e.g. 02. A project of his own sits outside it: "+". */
export const stageLabel = (project: Project) =>
  project.kind === 'journey' ? String(project.stage).padStart(2, '0') : '+';

/** Where a project sits: "02 · Aceptación" for a stage, "Proyecto propio · Rimas" for one of his own. */
export const placeLabel = (project: Project) =>
  project.kind === 'journey'
    ? `${stageLabel(project)} · ${project.flow}`
    : `${project.category} · ${project.flow}`;

/** The site's address without the protocol; null when it isn't public. */
export const hostname = (project: Project) =>
  project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null;

/** Public in production vs. restricted access. */
export const Status = ({ status }: { status: Project['status'] }) => {
  const t = useTranslations('Project');
  const live = status === 'live';
  return (
    <span className="meta inline-flex items-center gap-2 text-muted">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-accent' : 'bg-muted'}`}
      />
      {live ? t('public') : t('internal')}
    </span>
  );
};

/** Country codes where a flow runs, e.g. CL · PE · CO. */
export const Countries = ({ countries }: { countries: CountryCode[] }) =>
  countries.length > 0 ? <span className="meta text-muted">{countries.join(' · ')}</span> : null;
