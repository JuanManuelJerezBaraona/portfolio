import type { CSSProperties } from 'react';
import {
  siAngular,
  siAxios,
  siBootstrap,
  siClaude,
  siCss,
  siDatadog,
  siDocker,
  siExpress,
  siFastify,
  siFigma,
  siGit,
  siGithub,
  siGithubactions,
  siGithubcopilot,
  siGitlab,
  siGooglecloud,
  siHtml5,
  siJest,
  siKibana,
  siModelcontextprotocol,
  siMongodb,
  siMui,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siOpencode,
  siPostgresql,
  siPostman,
  siReactivex,
  siReact,
  siSass,
  siStorybook,
  siStrapi,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siJavascript,
  siVite,
  siVuedotjs,
  type SimpleIcon,
} from 'simple-icons';
import { useLocale, useTranslations } from 'next-intl';
import { getSkills } from '@/constants/data';
import { Skill, SkillCategory } from '@/types';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/** Brand marks from Simple Icons (CC0), drawn single-color in the channel. */
const ICONS: Record<string, SimpleIcon> = {
  ts: siTypescript,
  js: siJavascript,
  react: siReact,
  next: siNextdotjs,
  tailwind: siTailwindcss,
  bootstrap: siBootstrap,
  mui: siMui,
  html: siHtml5,
  css: siCss,
  sass: siSass,
  vite: siVite,
  vue: siVuedotjs,
  nuxt: siNuxt,
  angular: siAngular,
  nest: siNestjs,
  node: siNodedotjs,
  strapi: siStrapi,
  express: siExpress,
  fastify: siFastify,
  jest: siJest,
  rxjs: siReactivex,
  axios: siAxios,
  swagger: siSwagger,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  'claude-code': siClaude,
  opencode: siOpencode,
  copilot: siGithubcopilot,
  mcp: siModelcontextprotocol,
  n8n: siN8n,
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
  storybook: siStorybook,
  figma: siFigma,
  postman: siPostman,
  docker: siDocker,
  'github-actions': siGithubactions,
  gcp: siGooglecloud,
  datadog: siDatadog,
  kibana: siKibana,
};

/** Practices, services and libraries without a brand mark get a monogram instead. */
const MONOGRAMS: Record<string, string> = {
  zustand: 'Zu',
  codex: 'CDX',
  sdd: 'SDD',
  skills: 'SK',
  'context-eng': 'CTX',
  'llm-apis': 'API',
  rest: 'REST',
  hexagonal: 'HEX',
  apigee: 'APG',
  oauth: 'OA2',
  sse: 'SSE',
  playwright: 'PW',
};

/** Frontend, backend and IA keep the hero's channel colors; datos gets a fourth (YFP). */
const CATEGORIES: { key: SkillCategory; channel: string }[] = [
  { key: 'frontend', channel: 'var(--dapi)' },
  { key: 'backend', channel: 'var(--gfp)' },
  { key: 'ai', channel: 'var(--mcherry)' },
  { key: 'database', channel: 'var(--yfp)' },
  { key: 'tools', channel: 'var(--text)' },
];

const COLUMNS = 12;
const ROW_LETTERS = 'ABCDEFGH';

interface PlateRow {
  letter: string;
  /** Set on a category's first row only. */
  category?: SkillCategory;
  channel: string;
  skills: Skill[];
}

/** Lays the stack out like a well plate: one or more 12-well rows per category. */
const buildRows = (all: Skill[]): PlateRow[] => {
  const rows: PlateRow[] = [];
  for (const category of CATEGORIES) {
    const skills = all.filter((skill) => skill.category === category.key);
    for (let i = 0; i < skills.length; i += COLUMNS) {
      rows.push({
        letter: ROW_LETTERS[rows.length],
        category: i === 0 ? category.key : undefined,
        channel: category.channel,
        skills: skills.slice(i, i + COLUMNS),
      });
    }
  }
  return rows;
};

const Well = ({ skill, column }: { skill: Skill; column: number }) => {
  const icon = ICONS[skill.id];
  return (
    <li className="well-cell" style={{ '--col': column } as CSSProperties}>
      <span className="well" aria-hidden="true">
        {icon ? (
          <svg viewBox="0 0 24 24" className="well-mark">
            <path d={icon.path} fill="currentColor" />
          </svg>
        ) : (
          <span className="well-mark well-monogram">{MONOGRAMS[skill.id]}</span>
        )}
      </span>
      <span className="well-name">{skill.name}</span>
    </li>
  );
};

const Skills = () => {
  const t = useTranslations('Skills');
  const tStack = useTranslations('Stack');
  const rows = buildRows(getSkills(useLocale()));

  return (
    <section
      id="skills"
      className="sec-skills border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="skills-heading" eyebrow="Stack" title={t('title')}>
          <p>{t('body')}</p>
        </SectionHeading>

        <Reveal className="mt-14" amount={0.12}>
          <div className="plate">
            <div className="plate-sticker meta" aria-hidden="true">
              <span className="plate-barcode" />
              JMJ · STACK · {new Date().getFullYear()}
            </div>

            <div className="plate-grid plate-columns" aria-hidden="true">
              <div className="plate-numbers">
                {Array.from({ length: COLUMNS }, (_, i) => (
                  <span key={i} className="meta">
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>

            {rows.map((row) => {
              const label = row.category && tStack(row.category);
              return (
                <div
                  key={row.letter}
                  className="plate-grid plate-row"
                  style={{ '--ch': row.channel } as CSSProperties}
                >
                  <span className="plate-letter meta" aria-hidden="true">
                    {row.letter}
                  </span>

                  {label && (
                    <h3 className="plate-label meta">
                      <span className="swatch" aria-hidden="true" />
                      {label}
                    </h3>
                  )}

                  <ul className="plate-wells" aria-label={label}>
                    {row.skills.map((skill, i) => (
                      <Well key={skill.id} skill={skill} column={i} />
                    ))}
                    {Array.from({ length: COLUMNS - row.skills.length }, (_, i) => (
                      <li key={`empty-${i}`} className="well-cell is-empty" aria-hidden="true">
                        <span className="well" />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
