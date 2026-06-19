import { Corners } from '@/components/ui/Hud';

const STATS = [
  { value: '2+', label: 'Años en producción' },
  { value: '3', label: 'Países · CL·PE·CO' },
  { value: '05', label: 'Flujos end-to-end' },
  { value: '16', label: 'Tecnologías' },
];

const AboutMe = () => {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="label text-neon">// Perfil</p>
          <h2
            id="about-heading"
            className="mt-4 text-3xl font-bold leading-[1.05] text-text sm:text-4xl lg:text-5xl"
          >
            Quién está <span className="text-grad">detrás del sistema.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="hud scanlines relative overflow-hidden p-7 sm:p-9 lg:col-span-2">
            <Corners tone="neon" />
            <p className="label text-muted">Perfil profesional</p>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-text/90">
              <p>
                Soy Full-Stack Developer y me obsesiona construir experiencias web claras,
                rápidas y bien pensadas: productos que se ven bien y que además mueven los
                números del negocio.
              </p>
              <p>
                Construí gran parte del ecosistema digital de Seguros Falabella para Chile,
                Perú y Colombia —cotización, contratación, aceptación digital, pago y
                postventa—. Me importan el código limpio, la buena UX y las soluciones que de
                verdad le simplifican la vida a las personas.
              </p>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="hud scanlines relative overflow-hidden p-5">
                <Corners tone="cyan" />
                <p className="text-grad font-display text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="label mt-2 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
