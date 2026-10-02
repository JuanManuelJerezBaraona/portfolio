import { CountryCode, Project } from '@/types';

/** Position in the journey as two digits, e.g. 02. */
export const stageLabel = (project: Project) => String(project.stage).padStart(2, '0');

/** The site's address without the protocol, or a note when it isn't public. */
export const hostname = (project: Project) =>
  project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'acceso interno';

/** Public in production vs. restricted access. */
export const Status = ({ status }: { status: Project['status'] }) => {
  const live = status === 'live';
  return (
    <span className="meta inline-flex items-center gap-2 text-muted">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-accent' : 'bg-muted'}`}
      />
      {live ? 'Público' : 'Acceso interno'}
    </span>
  );
};

/** Country codes where a flow runs, e.g. CL · PE · CO. */
export const Countries = ({ countries }: { countries: CountryCode[] }) => (
  <span className="meta text-muted">{countries.join(' · ')}</span>
);
