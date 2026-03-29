'use client';

import Link from 'next/link';

const CONTACT_CHANNELS = [
  {
    id: 'email',
    title: 'Email',
    value: 'jjerezbaraona@gmail.com',
    href: 'mailto:jjerezbaraona@gmail.com',
    description: 'Para propuestas, vacantes o colaboraciones directas.',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: 'juan-manuel-jerez-baraona',
    href: 'https://www.linkedin.com/in/juan-manuel-jerez-baraona-b54486274/',
    description: 'Ideal para conectar a nivel profesional y revisar experiencia.',
  },
  {
    id: 'github',
    title: 'GitHub',
    value: 'JuanManuelJerezBaraona',
    href: 'https://github.com/JuanManuelJerezBaraona',
    description: 'Para ver codigo, proyectos y forma de trabajo.',
  },
];

const ContactIcon = ({ channelId }: { channelId: string }) => {
  if (channelId === 'email') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16v10H4z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m5 8 7 5 7-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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

const ContactForm = () => {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl">
        <h2
          id="contact-heading"
          className="text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Conectemos
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-300">
          Si quieres conversar sobre una oportunidad, un proyecto o simplemente conectar,
          aquí tienes mis canales directos.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CONTACT_CHANNELS.map((channel) => (
            <Link
              key={channel.id}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-3xl border border-indigo-300/20 bg-slate-950/70 p-6 shadow-[0_20px_50px_rgba(2,6,23,0.6)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
              aria-label={`Abrir ${channel.title}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-500/10 text-cyan-100">
                  <ContactIcon channelId={channel.id} />
                </span>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                  {channel.title}
                </p>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{channel.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{channel.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

