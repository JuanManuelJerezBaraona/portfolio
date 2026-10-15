import { Children, type CSSProperties } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getPersonalInfo } from '@/constants/data';
import Micrograph from './Micrograph';
import Arrow from '@/components/ui/Arrow';
import DecryptedText from '@/components/bits/DecryptedText';
import CircularText from '@/components/bits/CircularText';

const CHANNELS = [
  { id: 'ch-c1', stack: 'frontend', color: 'text-dapi', code: 'C1', dye: 'DAPI', ring: 'ring-c1' },
  { id: 'ch-c2', stack: 'backend', color: 'text-gfp', code: 'C2', dye: 'GFP', ring: 'ring-c2' },
  { id: 'ch-c3', stack: 'ai', color: 'text-mcherry', code: 'C3', dye: 'mCherry', ring: 'ring-c3' },
] as const;

/** Engraved on the objective's barrel, like a real one: its optics, then the three channels. */
const OPTICS = 'PLAN APO 20×/0.75 · ∞/0.17 · WD 1.0 · ';

const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

const Header = () => {
  const t = useTranslations('Header');
  const tStack = useTranslations('Stack');
  const tCv = useTranslations('Cv');
  const info = getPersonalInfo(useLocale());
  const engraving = [
    { text: OPTICS, className: 'text-muted' },
    ...CHANNELS.map((channel) => ({
      text: `${channel.code} ${channel.dye} ${tStack(channel.stack)} · `,
      className: `${channel.color} ${channel.ring}`,
    })),
  ];

  return (
    <header id="home" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          {/* Who he is before the hook: role and level, readable at a glance. */}
          <p className="rise wide text-wrap text-xl leading-snug sm:text-2xl">{info.title}</p>
          <p className="rise meta mt-2 text-muted">{info.location}</p>

          <h1 className="rise display mt-6 text-[2.75rem] sm:text-6xl lg:text-[5.4rem]" style={delay(80)}>
            {/* Genetic code turned source code: once the line has come into
                focus, the word dissolves into DNA bases and is read back. */}
            {t.rich('title', {
              seq: (chunks) => <DecryptedText text={Children.toArray(chunks).join('')} delay={1300} />,
            })}
          </h1>

          <p
            className="rise mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style={delay(160)}
          >
            {t.rich('intro', {
              name: info.shortName,
              b: (chunks) => <span className="text-text">{chunks}</span>,
            })}
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={delay(240)}>
            <Link href="#projects" className="btn btn-primary">
              {t('seeProjects')}
              <Arrow dir="down" />
            </Link>
            <a href={info.cv} download className="btn btn-ghost">
              {tCv('download')}
              <span className="meta opacity-60">PDF</span>
            </a>
          </div>

          <dl
            className="rise mt-12 grid max-w-xl grid-cols-2 gap-y-5 border-t border-line pt-5 sm:grid-cols-4"
            style={delay(320)}
          >
            <div>
              <dt className="meta text-muted">{t('level')}</dt>
              <dd className="mt-1 font-medium">{info.level}</dd>
            </div>
            <div>
              <dt className="meta text-muted">{t('fullStackSince')}</dt>
              <dd className="mt-1 font-medium">{info.fullStackSince}</dd>
            </div>
            <div>
              <dt className="meta text-muted">{t('inProduction')}</dt>
              <dd className="mt-1 font-medium">CL · PE · CO</dd>
            </div>
            <div>
              <dt className="meta text-muted">{t('profile')}</dt>
              <dd className="mt-1 font-medium">
                <Link href="#ia" className="sec-ia link-underline text-accent">
                  {t('aiReady')}
                </Link>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="scope-rig mx-auto w-full max-w-[34rem]">
          {/* The objective's barrel, engraved around the field (twice, so the
              letters keep a tight spacing). A channel switched off dims its
              name here too. */}
          <div className="objective">
            <CircularText className="objective-ring" segments={[...engraving, ...engraving]} />
            <div className="scope">
              <Micrograph />
              <div className="scope-reticle" aria-hidden="true" />
              <div
                className="absolute bottom-[17%] right-[19%] z-[4] flex flex-col items-end gap-1"
                aria-hidden="true"
              >
                <span className="h-[3px] w-14 bg-text/85" />
                <span className="meta text-[0.62rem] text-text/80">20 µm</span>
              </div>
            </div>
          </div>

          <figcaption className="mt-8">
            <fieldset className="@container">
              <legend className="meta text-muted">
                {t('channels')}
              </legend>
              {/* Three across only when each box fits "C1 Frontend"; otherwise one per row. */}
              <div className="mt-3 grid grid-cols-1 gap-2 @md:grid-cols-3">
                {CHANNELS.map((channel) => (
                  <label key={channel.id} htmlFor={channel.id} className="channel">
                    <input id={channel.id} type="checkbox" defaultChecked />
                    <span className={`swatch ${channel.color}`} aria-hidden="true" />
                    <span className="meta text-muted">{channel.code}</span>
                    <span className="text-sm font-medium">{tStack(channel.stack)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </figcaption>
        </figure>
      </div>
    </header>
  );
};

export default Header;
