import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import {
  SOCIAL_LINKS,
  getAiProtocol,
  getArchitecture,
  getPersonalInfo,
  getProjects,
  getTimeline,
} from '@/constants/data';
import { Countries, Status, stageLabel } from '@/components/ui/ProjectMeta';
import TagMark from '@/components/ui/TagMark';
import Deck from './Deck';

const CHANNEL = { dapi: 'text-dapi', gfp: 'text-gfp', yfp: 'text-yfp', text: 'text-text' } as const;

const hl = (chunks: ReactNode) => <em className="hl">{chunks}</em>;

/**
 * An interview deck built from the same data as the site: who he is, the
 * five apps in journey order (one slide each), the architecture they share,
 * the protocol he follows with AI, and how to reach him. Nothing here is
 * written twice, so the deck can't say something the site doesn't.
 */
const Presentation = () => {
  const locale = useLocale();
  const t = useTranslations('Deck');
  const tHeader = useTranslations('Header');
  const tAbout = useTranslations('About');
  const tProjects = useTranslations('Projects');
  const tCase = useTranslations('Case');
  const tArch = useTranslations('Architecture');
  const tAi = useTranslations('Ai');
  const tContact = useTranslations('Contact');
  const tProject = useTranslations('Project');

  const info = getPersonalInfo(locale);
  const timeline = getTimeline(locale);
  const projects = getProjects(locale);
  const layers = getArchitecture(locale);
  const steps = getAiProtocol(locale);

  const cover = (
    <div className="deck-cover sec-ia">
      <TagMark className="deck-mark" />
      <p className="meta mt-[2.5em] text-muted">
        {info.name} · {info.location}
      </p>
      <h1 className="deck-display mt-[0.3em]">{tHeader('title')}</h1>
      <p className="deck-lead mt-[0.8em] text-muted">{info.title}</p>
    </div>
  );

  const about = (
    <div className="deck-split sec-about">
      <div>
        <p className="meta text-accent">{t('about')}</p>
        <h2 className="deck-h2 mt-[0.5em]">{tAbout('title')}</h2>
        <p className="deck-lead mt-[1em] text-muted">{tAbout('lab')}</p>
        <p className="deck-lead mt-[0.8em] text-muted">{tAbout('code')}</p>
      </div>
      <ol className="deck-list">
        {timeline.map((entry) => (
          <li key={`${entry.period}-${entry.place}`} className={entry.current ? 'text-text' : 'text-muted'}>
            <span className={`meta block ${entry.current ? 'text-accent' : ''}`}>{entry.period}</span>
            <span className="block">
              {entry.role} · {entry.place}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  const journey = (
    <div className="sec-projects">
      <p className="meta text-accent">{t('journey')}</p>
      <h2 className="deck-h2 mt-[0.5em]">{tProjects.rich('title', { hl })}</h2>
      <p className="deck-lead mt-[0.8em] max-w-[40em] text-muted">{tProjects('body')}</p>
      <ol className="deck-journey mt-[2.2em]">
        {projects.map((project) => (
          <li key={project.id}>
            <span className="meta text-accent">{stageLabel(project)}</span>
            <span className="wide mt-[0.4em] block text-[1.35em] leading-none">{project.flow}</span>
            <span className="mt-[0.6em] block text-muted">{project.title}</span>
            <span className="mt-[0.6em] block">
              <Countries countries={project.countries} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  const cases = projects.map((project) => {
    const desktop = project.screenshots?.desktop[0];
    const phone = project.screenshots?.mobile[0];
    return (
      <div key={project.id} className="deck-split deck-split--case sec-projects">
        <div>
          <p className="meta text-muted">
            <span className="text-accent">
              {stageLabel(project)} · {project.flow}
            </span>{' '}
            · <Countries countries={project.countries} />
          </p>
          <h2 className="deck-h2 mt-[0.4em]">{project.title}</h2>
          <div className="mt-[0.6em]">
            <Status status={project.status} />
          </div>
          <h3 className="deck-label mt-[1.4em]">{tCase('problem')}</h3>
          <p className="mt-[0.3em] text-muted">{project.challenge}</p>
          <h3 className="deck-label mt-[1.1em]">{tCase('did')}</h3>
          <ul className="deck-bullets mt-[0.3em]">
            {project.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="deck-label mt-[1.1em]">{tCase('outcome')}</h3>
          <p className="mt-[0.3em] text-muted">{project.outcome}</p>
        </div>
        {desktop && (
          <figure className="deck-shot">
            <div className="border border-line bg-stage">
              <Image
                src={desktop}
                alt={tProject('desktopShot', { title: project.title })}
                width={2530}
                height={1140}
                sizes="(orientation: portrait) 100vw, 50vw"
                className="block h-auto w-full"
              />
            </div>
            {phone && (
              <div className="deck-phone">
                <Image
                  src={phone}
                  alt={tProject('mobileShot', { title: project.title })}
                  width={659}
                  height={1024}
                  sizes="(orientation: portrait) 30vw, 12vw"
                  className="block h-auto w-full"
                />
              </div>
            )}
          </figure>
        )}
      </div>
    );
  });

  const architecture = (
    <div className="deck-split sec-arquitectura">
      <div>
        <p className="meta text-accent">{tArch('note')}</p>
        <h2 className="deck-h2 mt-[0.5em]">{tArch.rich('title', { hl })}</h2>
        <p className="deck-lead mt-[1em] text-muted">{tArch('body')}</p>
        <p className="mt-[1em] text-muted">{tArch('rule')}</p>
      </div>
      <ol className="deck-list">
        {layers.map((layer) => (
          <li key={layer.id}>
            <span className="flex items-center gap-[0.6em]">
              <span className={`swatch ${CHANNEL[layer.channel]}`} aria-hidden="true" />
              <span className="wide">{layer.name}</span>
            </span>
            <span className="meta mt-[0.3em] block text-muted">{layer.tools.join(' / ')}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  const ai = (
    <div className="sec-ia">
      <p className="meta text-accent">{t('ai')}</p>
      <h2 className="deck-h2 mt-[0.5em] max-w-[18em]">{tAi.rich('title', { hl })}</h2>
      <p className="deck-lead mt-[0.8em] max-w-[40em] text-muted">{tAi('body')}</p>
      <ol className="deck-grid mt-[2em]" aria-label={tAi('protocol')}>
        {steps.map((step, i) => (
          <li key={step.id} className={step.critical ? 'border-accent' : undefined}>
            <span className="meta block text-accent">
              {String(i + 1).padStart(2, '0')}
              {step.critical && ` · ${tAi('critical')}`}
            </span>
            <span className="wide mt-[0.3em] block">{step.title}</span>
            <span className="meta mt-[0.5em] block text-muted">{step.tools.join(' · ')}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  const contact = (
    <div className="deck-cover sec-contact">
      <p className="meta text-accent">{t('contact')}</p>
      <h2 className="deck-display mt-[0.3em]">{tContact('title')}</h2>
      <p className="deck-lead mt-[0.8em] max-w-[36em] text-muted">{tContact('body')}</p>
      <a href={`mailto:${info.email}`} className="link-underline wide mt-[1.6em] text-[1.8em]">
        {info.email}
      </a>
      <ul className="meta mt-[2em] flex flex-wrap gap-x-[2.5em] gap-y-[0.8em] text-muted">
        <li>
          {t('site')} · <span className="text-text">{info.site}</span>
        </li>
        {SOCIAL_LINKS.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-underline text-text">
              {link.name}
            </a>
          </li>
        ))}
        <li>
          <a href={info.cv} download className="link-underline text-text">
            {t('cv')} PDF
          </a>
        </li>
      </ul>
    </div>
  );

  return <Deck slides={[cover, about, journey, ...cases, architecture, ai, contact]} />;
};

export default Presentation;
