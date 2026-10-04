import { PERSONAL_INFO, SOCIAL_LINKS } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';

const FACTS = [
  { label: 'Ubicación', value: PERSONAL_INFO.location },
  { label: 'Idiomas', value: 'Español nativo · Inglés B2' },
  { label: 'Full-stack desde', value: String(PERSONAL_INFO.fullStackSince) },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="sec-contact border-t border-line px-4 py-24 sm:px-6 lg:px-8 lg:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
        <div>
          <Reveal>
            <p className="meta flex items-center gap-2.5 text-muted">
              <span className="swatch text-accent" aria-hidden="true" />
              Contacto · Disponible para nuevas oportunidades
            </p>
            <h2 id="contact-heading" className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl">
              Conversemos.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              ¿Buscas un desarrollador full-stack para tu equipo? Escríbeme: el correo es la vía más
              directa y respondo rápido.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="link-underline wide break-all text-2xl sm:text-4xl"
            >
              {PERSONAL_INFO.email}
            </a>

            <ul className="mt-12 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    {link.name}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                      <path strokeLinecap="square" d="M7 17 17 7m0 0H8m9 0v9" />
                    </svg>
                  </a>
                </li>
              ))}
              <li>
                <a href={PERSONAL_INFO.cv} download className="btn btn-ghost">
                  Descargar CV
                  <span className="meta text-muted">PDF</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <dl className="border-t border-line">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="meta text-muted">{fact.label}</dt>
                <dd className="text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
