import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 pt-28 sm:px-6">
      <div className="hud scanlines relative w-full max-w-lg overflow-hidden p-8 text-center sm:p-10">
        <p className="label text-neon">Error · 404</p>
        <h1 className="mt-4 text-5xl font-bold text-grad sm:text-6xl">Nodo perdido</h1>
        <p className="mt-5 text-muted">
          Esta ruta no existe en el sistema. Puede que el flujo se haya movido o que la URL
          esté mal escrita.
        </p>
        <Link
          href="/#projects"
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-neon/50 bg-neon/10 px-6 py-3 font-mono text-sm tracking-wide text-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-neon/20"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0 6-6m-6 6 6 6" />
          </svg>
          Volver al sistema
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
