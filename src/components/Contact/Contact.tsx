import { useLocale, useTranslations } from 'next-intl';
import { SOCIAL_LINKS, getPersonalInfo } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionCover from '@/components/ui/SectionCover';
import Arrow from '@/components/ui/Arrow';

const Contact = () => {
  const t = useTranslations('Contact');
  const tCv = useTranslations('Cv');
  const info = getPersonalInfo(useLocale());
  const facts = [
    { label: t('level'), value: info.level },
    { label: t('location'), value: info.location },
    { label: t('languages'), value: t('languagesValue') },
    { label: t('fullStackSince'), value: String(info.fullStackSince) },
  ];

  return (
    <section
      id="contact"
      className="sec-contact chapter px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-36 lg:pt-8"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionCover id="contact" note={t('note')} />
        <div className="mt-14 grid gap-16 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
          <div>
            <Reveal>
              <h2 id="contact-heading" className="display text-[2.6rem] sm:text-6xl lg:text-7xl">
                {t('title')}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {t('body')}
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-12">
              <a
                href={`mailto:${info.email}`}
                className="link-underline wide break-all text-2xl sm:text-4xl"
              >
                {info.email}
              </a>

              <ul className="mt-12 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      {link.name}
                      <Arrow dir="out" />
                    </a>
                  </li>
                ))}
                <li>
                  <a href={info.cv} download className="btn btn-ghost">
                    {tCv('download')}
                    <span className="meta text-muted">PDF</span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <dl className="border-t border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-muted">{fact.label}</dt>
                  <dd className="text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
