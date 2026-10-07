import type { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getAiProtocol } from '@/constants/data';
import type { AiStep } from '@/types';
import Reveal from '@/components/ui/Reveal';
import SectionCover from '@/components/ui/SectionCover';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * One of his real skills, trimmed to what's safe to show publicly. Kept
 * verbatim (in Spanish) in both languages; the description is a YAML plain
 * scalar folded across lines so it fits the material column.
 */
const SKILL_TREE = `.claude/skills/nestjs-hexagonal-arch/
├─ SKILL.md
└─ references/
   ├─ layers-overview.md
   ├─ endpoint.md
   ├─ usecase.md
   ├─ service.md
   └─ testing.md`;

const SKILL_FRONTMATTER = `---
name: nestjs-hexagonal-arch
description: Arquitectura hexagonal
  en NestJS. Crea endpoints, use
  cases, servicios HTTP y tests
  respetando las capas domain,
  application e infrastructure.
---`;

/** Step number, procedure, and the material: under it on phones, beside it from lg. Shared by the header row and every step. */
const COLUMNS =
  'grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-4 lg:grid-cols-[4.5rem_minmax(0,1fr)_24rem] lg:gap-x-12';

const pad = (n: number) => String(n).padStart(2, '0');

const Skill = () => {
  const t = useTranslations('Ai');

  return (
    <figure className="border border-line bg-void">
      <figcaption className="meta flex items-center justify-between gap-4 border-b border-line px-3.5 py-2 text-muted">
        <span>{t('skill')}</span>
        <span className="text-accent">Claude Code</span>
      </figcaption>
      <div className="grid gap-px bg-line lg:grid-cols-2">
        <pre className="meta overflow-x-auto bg-void p-3.5 leading-relaxed text-muted">{SKILL_TREE}</pre>
        <pre className="meta overflow-x-auto bg-void p-3.5 leading-relaxed text-text/85">{SKILL_FRONTMATTER}</pre>
      </div>
    </figure>
  );
};

/** The control's two outcomes: merge, or back to the step that writes the code. */
const Gate = ({ retry }: { retry: string }) => {
  const t = useTranslations('Ai');

  return (
    <div className="meta border border-line bg-void">
      <p className="border-b border-line px-3.5 py-2.5 text-text">{t('checks')}</p>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 px-3.5 py-3">
        <dt className="text-accent">{t('pass')}</dt>
        <dd className="text-accent">→ merge</dd>
        <dt className="text-muted">{t('fail')}</dt>
        <dd className="text-muted">→ {t('retry', { step: retry })}</dd>
      </dl>
    </div>
  );
};

const Tools = ({ step }: { step: AiStep }) => (
  <ul className="meta flex flex-wrap gap-x-4 gap-y-1.5 text-accent lg:flex-col">
    {step.tools.map((tool) => (
      <li key={tool}>{tool}</li>
    ))}
  </ul>
);

const AiProfile = () => {
  const t = useTranslations('Ai');
  const steps = getAiProtocol(useLocale());
  const retry = pad(steps.findIndex((step) => step.id === 'build') + 1);

  /**
   * Where a step's material is a real artifact, it replaces the list of
   * tools. The skill is too tall for the material column, so from lg it
   * runs under the procedure, across both columns.
   */
  const artifacts: Record<string, { node: ReactNode; wide?: boolean }> = {
    skills: { node: <Skill />, wide: true },
    control: { node: <Gate retry={retry} /> },
  };

  return (
    <section
      id="ia"
      className="sec-ia chapter px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-32 lg:pt-8"
      aria-labelledby="ia-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionCover id="ia" note={t('note')} />
        <SectionHeading
          id="ia-heading"
          className="mt-14"
          title={t.rich('title', { hl: (chunks) => <em className="hl">{chunks}</em> })}
        >
          <p>{t('body')}</p>
        </SectionHeading>

        <figure className="mt-14 border border-line bg-stage lg:mt-16">
          <figcaption className="meta flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-4 py-3 sm:px-6">
            <span className="text-text">{t('protocol')}</span>
            <span className="text-muted">{t('stepCount', { count: steps.length })}</span>
          </figcaption>

          <div className={`${COLUMNS} meta hidden border-b border-line px-6 py-2.5 text-muted lg:grid`} aria-hidden="true">
            <span>{t('step')}</span>
            <span>{t('procedure')}</span>
            <span>{t('material')}</span>
          </div>

          <ol>
            {steps.map((step, i) => {
              const artifact = artifacts[step.id];

              return (
                <li key={step.id} id={`ia-${step.id}`} className="border-b border-line">
                  <Reveal
                    className={`${COLUMNS} protocol-step grid gap-y-5 px-4 py-7 sm:px-6 lg:py-9 ${
                      step.critical ? 'is-critical' : ''
                    }`}
                  >
                    <span
                      className={`wide text-xl tabular-nums ${step.critical ? 'text-accent' : 'text-muted'}`}
                      aria-hidden="true"
                    >
                      {pad(i + 1)}
                    </span>
                    <div>
                      <h3 className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xl">
                        {step.title}
                        {step.critical && <span className="meta text-accent">{t('critical')}</span>}
                      </h3>
                      <p className="mt-3 max-w-[38rem] leading-relaxed text-muted">{step.body}</p>
                    </div>
                    <div
                      className={`col-span-full sm:col-span-1 sm:col-start-2 ${
                        artifact?.wide ? 'lg:col-span-2 lg:col-start-2' : 'lg:col-start-3 lg:pt-1.5'
                      }`}
                    >
                      <p className="meta mb-2.5 text-muted lg:hidden">{t('material')}</p>
                      {artifact?.node ?? <Tools step={step} />}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <p className="px-4 py-5 leading-relaxed text-muted sm:px-6">
            <span className="meta mb-1.5 block text-text sm:mb-0 sm:mr-3 sm:inline">{t('beyondLabel')}</span>
            {t('beyond')}
          </p>
        </figure>
      </div>
    </section>
  );
};

export default AiProfile;
