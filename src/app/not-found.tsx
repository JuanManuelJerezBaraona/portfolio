import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="flex min-h-[80vh] items-center px-4 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="meta text-mcherry">Error 404</p>
        <h1 className="display mt-5 text-5xl sm:text-7xl">Esta página está fuera de foco.</h1>
        <p className="mt-6 max-w-lg text-lg text-muted">
          La dirección no existe o cambió. Los proyectos siguen donde siempre.
        </p>
        <Link href="/#projects" className="btn btn-primary mt-10">
          Ir a los proyectos
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
