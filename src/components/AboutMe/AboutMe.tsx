import Image from 'next/image';
import { PERSONAL_INFO, TIMELINE } from '@/constants/data';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const AboutMe = () => {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading id="about-heading" eyebrow="Trayectoria" title="Del laboratorio al desarrollo web.">
            <p>
              Estudié Ingeniería en Biotecnología y pasé tres años en un laboratorio de
              neurobiología haciendo estadística, análisis de datos y bioinformática. Ahí aprendí
              a no creerle a un resultado hasta poder reproducirlo.
            </p>
            <p className="mt-4">
              En 2016 empecé a programar tiendas online y desde 2022 trabajo como full-stack. La
              costumbre del laboratorio se vino conmigo: pruebo, mido y reviso antes de dar algo
              por terminado.
            </p>
          </SectionHeading>

          <Reveal delay={120} className="mt-12 flex items-end gap-5">
            <div className="relative aspect-[3/4] w-32 flex-none overflow-hidden border border-line sm:w-40">
              <Image
                src={PERSONAL_INFO.profileImage}
                alt={`Retrato de ${PERSONAL_INFO.name}`}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <p className="meta pb-1 text-muted">
              {PERSONAL_INFO.name}
              <br />
              {PERSONAL_INFO.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ol className="border-t border-line" aria-label="Trayectoria">
            {TIMELINE.map((entry) => (
              <li
                key={`${entry.period}-${entry.place}`}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
              >
                <p className={`meta pt-1 ${entry.current ? 'text-gfp' : 'text-muted'}`}>
                  {entry.period}
                </p>
                <div>
                  <p className="text-lg font-medium leading-snug">
                    {entry.role}
                    <span className="text-muted"> · {entry.place}</span>
                  </p>
                  {entry.detail && <p className="mt-1 text-[0.95rem] text-muted">{entry.detail}</p>}
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
