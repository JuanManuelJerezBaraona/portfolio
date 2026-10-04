import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getPersonalInfo, getTimeline } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const AboutMe = () => {
  const t = useTranslations('About');
  const locale = useLocale();
  const info = getPersonalInfo(locale);
  const timeline = getTimeline(locale);

  return (
    <section id="about" className="sec-about px-4 py-24 sm:px-6 lg:px-8 lg:py-32" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading id="about-heading" eyebrow={t('eyebrow')} title={t('title')}>
            <p>{t('lab')}</p>
            <p className="mt-4">{t('code')}</p>
          </SectionHeading>

          <Reveal delay={120} className="mt-12 flex items-end gap-5">
            <div className="relative aspect-[3/4] w-32 flex-none overflow-hidden border border-line sm:w-40">
              <Image
                src={info.profileImage}
                alt={t('portrait', { name: info.name })}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <p className="meta pb-1 text-muted">
              {info.name}
              <br />
              {info.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ol className="border-t border-line" aria-label={t('eyebrow')}>
            {timeline.map((entry) => (
              <li
                key={`${entry.period}-${entry.place}`}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
              >
                <p className={`meta pt-1 ${entry.current ? 'text-accent' : 'text-muted'}`}>
                  {entry.period}
                </p>
                <div>
                  <p className="text-lg font-medium leading-snug">
                    {entry.role}
                    <span className="text-muted"> · {entry.place}</span>
                  </p>
                  {entry.detail && <p className="mt-1 text-[0.95rem] text-muted">{entry.detail}</p>}
                  {entry.highlights && (
                    <ul className="mt-3 space-y-1.5 text-[0.95rem] text-muted">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 flex-none bg-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutMe;
