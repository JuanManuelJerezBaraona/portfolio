import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Countries, Status } from '@/components/ui/ProjectMeta';
import Reveal from '@/components/ui/Reveal';
import TagMark from '@/components/ui/TagMark';
import { contrast, tokenValue, type Mode } from './tokens';

const MODES: Mode[] = ['fluorescence', 'brightfield'];

/** How a group's contrast is measured: body text on the color, or the color on the page. */
type Measure = 'textOn' | 'onVoid';

type GroupKey = 'surfaces' | 'text' | 'channels' | 'sections';
type TokenKey =
  | 'void' | 'stage' | 'stage2' | 'line' | 'lineStrong' | 'text' | 'muted'
  | 'dapi' | 'gfp' | 'mcherry' | 'yfp'
  | 'about' | 'projects' | 'arquitectura' | 'ia' | 'skills' | 'contact';

const GROUPS: { key: GroupKey; measure: Measure; tokens: [name: string, key: TokenKey][] }[] = [
  {
    key: 'surfaces',
    measure: 'textOn',
    tokens: [
      ['--void', 'void'],
      ['--stage', 'stage'],
      ['--stage-2', 'stage2'],
      ['--line', 'line'],
      ['--line-strong', 'lineStrong'],
    ],
  },
  { key: 'text', measure: 'onVoid', tokens: [['--text', 'text'], ['--muted', 'muted']] },
  {
    key: 'channels',
    measure: 'onVoid',
    tokens: [
      ['--dapi', 'dapi'],
      ['--gfp', 'gfp'],
      ['--mcherry', 'mcherry'],
      ['--yfp', 'yfp'],
    ],
  },
  {
    key: 'sections',
    measure: 'onVoid',
    tokens: [
      ['--sec-about', 'about'],
      ['--sec-projects', 'projects'],
      ['--sec-arquitectura', 'arquitectura'],
      ['--sec-ia', 'ia'],
      ['--sec-skills', 'skills'],
      ['--sec-contact', 'contact'],
    ],
  },
];

const SECTIONS = ['about', 'projects', 'arquitectura', 'ia', 'skills', 'contact'];

// The same mapping as the hero's channel toggles, plus YFP for data.
const CHANNELS = [
  { code: 'C1', name: 'DAPI', color: 'text-dapi', stack: 'frontend' },
  { code: 'C2', name: 'GFP', color: 'text-gfp', stack: 'backend' },
  { code: 'C3', name: 'mCherry', color: 'text-mcherry', stack: 'ai' },
  { code: 'C4', name: 'YFP', color: 'text-yfp', stack: 'database' },
] as const;

const measure = (name: string, mode: Mode, how: Measure) => {
  const value = tokenValue(name, mode);
  const background = tokenValue('--void', mode);
  return how === 'textOn' ? contrast(tokenValue('--text', mode), value) : contrast(value, background);
};

/** Lowest contrast of the colors used for text, across both modes and both page surfaces. */
const lowestTextContrast = () => {
  const names = ['--text', '--muted', ...SECTIONS.map((id) => `--sec-${id}`)];
  const ratios = MODES.flatMap((mode) =>
    names.flatMap((name) =>
      ['--void', '--stage'].map((surface) => contrast(tokenValue(name, mode), tokenValue(surface, mode)) ?? Infinity),
    ),
  );
  return Math.min(...ratios);
};

/**
 * The design system behind the site, built from the same tokens it documents:
 * values come from globals.css at build time, and every swatch shows both
 * looks side by side whichever mode the visitor has on.
 */
const DesignSystem = () => {
  const t = useTranslations('System');
  const tStack = useTranslations('Stack');
  const locale = useLocale();
  const ratio = (value: number) => value.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <article className="sec-arquitectura px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="meta link-underline text-muted hover:text-text">
          {t('back')}
        </Link>

        <header className="mt-14">
          <p className="rise meta text-accent">{t('kicker')}</p>
          <h1 className="rise display mt-5 text-[2.6rem] sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
            {t('title')}
          </h1>
          <p className="rise mt-6 max-w-3xl text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            {t('intro')}
          </p>
        </header>

        <section className="mt-20">
          <h2 id="tokens" className="text-3xl sm:text-4xl">
            {t('tokensTitle')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t('tokensBody')}</p>
          <p className="meta mt-4 max-w-2xl leading-relaxed text-muted">{t('contrastNote')}</p>

          {GROUPS.map((group) => (
            <Reveal key={group.key} className="mt-12">
              <h3 className="text-xl">{t(`groups.${group.key}`)}</h3>
              <div className="mt-4 hidden border-b border-line pb-2 sm:grid sm:grid-cols-[1.3fr_1fr_1fr] sm:gap-6">
                <span className="meta text-muted">{t('colToken')}</span>
                {MODES.map((mode) => (
                  <span key={mode} className="meta text-muted">
                    {t(mode)}
                  </span>
                ))}
              </div>
              <ul className="divide-y divide-line border-b border-line sm:border-t-0">
                {group.tokens.map(([name, key]) => (
                  <li key={name} className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:items-center sm:gap-6">
                    <div className="col-span-2 sm:col-span-1">
                      <code className="meta text-text">{name}</code>
                      <p className="mt-1 text-sm text-muted">{t(`tokens.${key}`)}</p>
                    </div>
                    {MODES.map((mode) => {
                      const value = tokenValue(name, mode);
                      const ratioValue = measure(name, mode, group.measure);
                      return (
                        <div key={mode} className="flex items-center gap-3">
                          {/* Literal values on purpose: the swatch shows that mode, not the one on screen. */}
                          <span
                            aria-hidden="true"
                            className="grid h-9 w-9 flex-none place-items-center border border-line-strong"
                            style={{ background: tokenValue('--void', mode) }}
                          >
                            <span className="h-6 w-6" style={{ background: value }} />
                          </span>
                          <span className="min-w-0">
                            <span className="meta block text-muted sm:hidden">{t(mode)}</span>
                            <span className="meta block truncate text-text">{value}</span>
                            {ratioValue && <span className="meta block text-muted">{ratio(ratioValue)}:1</span>}
                          </span>
                        </div>
                      );
                    })}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </section>

        <Reveal as="section" className="mt-24">
          <h2 id="channels" className="text-3xl sm:text-4xl">
            {t('channelsTitle')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t('channelsBody')}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((channel) => (
              <li key={channel.code} className="border border-line bg-stage p-5">
                <span className={`swatch ${channel.color}`} aria-hidden="true" />
                <p className="meta mt-4 text-muted">
                  {channel.code} · {channel.name}
                </p>
                <p className="wide mt-1 text-xl">{tStack(channel.stack)}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="mt-24">
          <h2 id="type" className="text-3xl sm:text-4xl">
            {t('typeTitle')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t('typeBody')}</p>
          <dl className="mt-10 border-t border-line">
            <div className="border-b border-line py-6">
              <dt className="meta text-muted">{t('typeDisplay')}</dt>
              <dd className="display mt-3 text-4xl sm:text-6xl">{t('sampleDisplay')}</dd>
            </div>
            <div className="border-b border-line py-6">
              <dt className="meta text-muted">{t('typeHeading')}</dt>
              <dd className="wide mt-3 text-3xl">{t('sampleHeading')}</dd>
            </div>
            <div className="border-b border-line py-6">
              <dt className="meta text-muted">{t('typeText')}</dt>
              <dd className="mt-3 max-w-2xl text-lg leading-relaxed">{t('sampleText')}</dd>
            </div>
            <div className="border-b border-line py-6">
              <dt className="meta text-muted">{t('typeMeta')}</dt>
              <dd className="meta mt-3 text-text">CL · PE · CO · 2530×1140 · 20 µm</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal as="section" className="mt-24">
          <h2 id="components" className="text-3xl sm:text-4xl">
            {t('componentsTitle')}
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-2">
            <div>
              <h3 className="meta font-normal text-muted">{t('buttons')}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="btn btn-primary">{t('primary')}</span>
                <span className="btn btn-ghost">{t('ghost')}</span>
              </div>
            </div>
            <div>
              <h3 className="meta font-normal text-muted">{t('link')}</h3>
              <p className="mt-4">
                <span className="link-underline font-medium">{t('linkSample')} →</span>
              </p>
            </div>
            <div>
              <h3 className="meta font-normal text-muted">{t('emphasis')}</h3>
              <ul className="mt-4 space-y-2">
                {SECTIONS.map((id) => (
                  <li key={id} className={`sec-${id} flex items-baseline justify-between gap-4`}>
                    <span>{t.rich('emphasisSample', { hl: (chunks) => <em className="hl">{chunks}</em> })}</span>
                    <code className="meta text-muted">--sec-{id}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="meta font-normal text-muted">{t('status')}</h3>
              <div className="sec-projects mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Status status="live" />
                <Status status="internal" />
                <Countries countries={['CL', 'PE', 'CO']} />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="meta font-normal text-muted">{t('logo')}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <TagMark className="text-5xl" />
                <p className="max-w-sm text-muted">{t('logoBody')}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-24">
          <h2 id="principles" className="text-3xl sm:text-4xl">
            {t('principlesTitle')}
          </h2>
          <ul className="mt-8 border-t border-line">
            {(['tokens', 'contrast', 'blend', 'hover', 'motion', 'focus'] as const).map((key) => (
              <li key={key} className="flex gap-4 border-b border-line py-5">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
                <p className="max-w-3xl leading-relaxed">
                  {key === 'contrast'
                    ? t('principles.contrast', { min: ratio(Math.floor(lowestTextContrast() * 10) / 10) })
                    : t(`principles.${key}`)}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
};

export default DesignSystem;
