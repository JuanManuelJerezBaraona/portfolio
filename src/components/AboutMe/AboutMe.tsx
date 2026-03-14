'use client';

import { PERSONAL_INFO } from '@/constants/data';
import Link from 'next/link';

const AboutMe = () => {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl">
        <h2
          id="about-heading"
          className="text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Sobre mí
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-indigo-300/20 bg-slate-950/65 p-7 backdrop-blur-md lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Perfil profesional</p>
            <div className="mt-5 space-y-5">
            {PERSONAL_INFO.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-slate-300 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition-all hover:border-cyan-200/70 hover:bg-cyan-500/20"
                aria-label="Ir a la sección de contacto"
              >
                Hablemos de tu próximo proyecto
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-2xl border border-indigo-200/20 bg-slate-900/65 p-6 backdrop-blur-md">
              <p className="text-3xl font-bold text-cyan-200">3+</p>
              <p className="mt-1 text-sm text-slate-300">Años creando productos web escalables</p>
            </article>
            <article className="rounded-2xl border border-indigo-200/20 bg-slate-900/65 p-6 backdrop-blur-md">
              <p className="text-3xl font-bold text-indigo-200">50+</p>
              <p className="mt-1 text-sm text-slate-300">Entregas exitosas en entornos reales</p>
            </article>
            <article className="rounded-2xl border border-indigo-200/20 bg-slate-900/65 p-6 backdrop-blur-md">
              <p className="text-3xl font-bold text-cyan-100">12+</p>
              <p className="mt-1 text-sm text-slate-300">Tecnologías dominadas y aplicadas</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

