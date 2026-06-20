import Link from 'next/link';
import { Corners } from '@/components/ui/Hud';
import Reveal from '@/components/ui/Reveal';

const CONTACT_CHANNELS = [
  {
    id: 'email',
    title: 'Email',
    value: 'jjerezbaraona@gmail.com',
    href: 'mailto:jjerezbaraona@gmail.com',
    description: 'El canal directo. Escríbeme y te respondo antes de que se enfríe el café.',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: 'juan-manuel-jerez-baraona',
    href: 'https://www.linkedin.com/in/juan-manuel-jerez-baraona-b54486274/',
    description: 'Mi trayectoria, con nombres y fechas. Conectemos y veamos qué se nos ocurre.',
  },
  {
    id: 'github',
    title: 'GitHub',
    value: 'JuanManuelJerezBaraona',
    href: 'https://github.com/JuanManuelJerezBaraona',
    description: 'Commits de verdad. Acá se ve cómo construyo, no solo qué construyo.',
  },
];

const ContactIcon = ({ channelId }: { channelId: string }) => {
  if (channelId === 'email') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (channelId === 'linkedin') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.32-.03-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.93v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.33 7.43A2.06 2.06 0 1 1 5.33 3.3a2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.97 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0Z" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.77.5 12.27c0 5.2 3.3 9.6 7.88 11.16.58.1.8-.26.8-.58 0-.28-.02-1.24-.02-2.24-2.9.64-3.65-.72-3.88-1.38-.12-.34-.63-1.4-1.08-1.68-.37-.2-.9-.72-.02-.74.84-.02 1.44.8 1.64 1.12.97 1.66 2.53 1.2 3.15.92.1-.72.38-1.2.68-1.48-2.58-.3-5.28-1.34-5.28-5.94 0-1.3.45-2.36 1.2-3.2-.13-.3-.53-1.54.1-3.2 0 0 .98-.32 3.2 1.2a10.8 10.8 0 0 1 5.82 0c2.2-1.54 3.2-1.2 3.2-1.2.62 1.66.22 2.9.1 3.2.74.84 1.2 1.9 1.2 3.2 0 4.62-2.72 5.64-5.3 5.94.42.36.77 1.04.77 2.1 0 1.52-.02 2.74-.02 3.12 0 .32.22.7.8.58A11.8 11.8 0 0 0 23.5 12.3C23.5 5.77 18.35.5 12 .5Z" />
    </svg>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <p className="label text-neon">// Contacto</p>
          <h2
            id="contact-heading"
            className="mt-4 text-3xl font-bold leading-[1.05] text-text sm:text-4xl lg:text-5xl"
          >
            Abramos <span className="text-grad">un canal.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            ¿Tienes algo entre manos —una oportunidad, un proyecto o pura curiosidad? Estos son
            mis canales directos. Elige el que prefieras; los leo todos.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CONTACT_CHANNELS.map((channel, index) => {
            const isExternal = channel.href.startsWith('http');
            return (
              <Reveal key={channel.id} delay={index * 90}>
                <Link
                  href={channel.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="hud hud-hover scanlines group relative flex h-full flex-col overflow-hidden p-6"
                  aria-label={`Abrir ${channel.title}`}
                >
                  <Corners tone="cyan" />
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-cyan transition-colors group-hover:text-neon">
                      <ContactIcon channelId={channel.id} />
                    </span>
                    <p className="label text-muted">{channel.title}</p>
                  </div>
                  <p className="mt-4 break-words font-mono text-sm text-text sm:text-base">
                    {channel.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted">{channel.description}</p>
                  <span className="label mt-5 inline-flex items-center gap-1.5 text-muted transition-colors group-hover:text-neon">
                    Abrir
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
