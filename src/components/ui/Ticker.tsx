const ITEMS = [
  'Sistema en línea',
  'Despliegue · CL · PE · CO',
  '05 flujos en producción',
  'Cotización → Aceptación → Pago → Acceso → Postventa',
  'Full-Stack · React · Next.js · NestJS',
  'Código que aguanta el viernes a las seis',
  'Hecho a mano en Santiago de Chile',
];

const Ticker = () => {
  return (
    <div
      className="relative overflow-hidden border-y border-line bg-ink-2/40 py-3 [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]"
      aria-hidden="true"
    >
      <div className="ticker">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {ITEMS.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex items-center">
                <span className="label px-6 text-muted">{item}</span>
                <span className="text-xs text-neon/55">◇</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
