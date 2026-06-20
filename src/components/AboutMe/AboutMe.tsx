import { Corners } from '@/components/ui/Hud';
import Reveal from '@/components/ui/Reveal';

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
        <Reveal className="max-w-2xl">
          <p className="label text-neon">// Perfil</p>
          <h2
            id="about-heading"
            className="mt-4 text-3xl font-bold leading-[1.05] text-text sm:text-4xl lg:text-5xl"
          >
            Quién está <span className="text-grad">detrás del sistema.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal
            as="article"
            className="hud scanlines relative overflow-hidden p-7 sm:p-9 lg:col-span-2"
            delay={80}
          >
            <Corners tone="neon" />
            <p className="label text-muted">Perfil profesional</p>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-text/90">
              <p>
                Me obsesiona una sola cosa: que un producto se sienta rápido, claro y sin
                fricción. No me conformo con que funcione —busco que la persona del otro lado no
                tenga que pensar para usarlo, y que eso se note en los números.
              </p>
              <p>
                En Seguros Falabella me tocó meter mano en casi todo el viaje del cliente
                —cotización, contratación, aceptación digital, pago y postventa— para Chile, Perú
                y Colombia. Ahí aprendí que el código limpio y la buena UX no son un lujo: son lo
                que hace que una plataforma aguante, crezca y no se caiga justo el viernes a las
                seis.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, index) => (
              <Reveal
                key={stat.label}
                className="hud scanlines relative overflow-hidden p-5"
                delay={140 + index * 80}
              >
                <Corners tone="cyan" />
                <p className="text-grad font-display text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="label mt-2 text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
