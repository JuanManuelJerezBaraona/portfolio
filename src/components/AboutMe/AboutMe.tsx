"use client";

import { PERSONAL_INFO } from "@/constants/data";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="about-heading"
          className="text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Sobre mí
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-indigo-300/20 bg-slate-950/65 p-7 backdrop-blur-md lg:col-span-2">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-cyan-200/80">
              Perfil profesional
            </p>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>
                Soy {PERSONAL_INFO.title} y me gusta construir experiencias web
                claras, modernas y bien pensadas. Me enfoco en productos que no
                solo se vean bien, sino que también ayuden a cumplir objetivos
                reales de negocio. 💻✨
              </p>
              <p>
                He trabajado creando plataformas para Seguros Falabella en
                Chile, Perú y Colombia, participando en flujos clave como
                cotización, contratación, pagos y postventa. Me encanta combinar
                código limpio, buena UX y soluciones que de verdad le hagan la
                vida más fácil a las personas. 🚀🤝
              </p>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-2xl border border-indigo-200/20 bg-slate-900/65 p-6 backdrop-blur-md">
              <p className="font-heading text-3xl font-bold text-cyan-200">
                2+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Años creando productos web escalables
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-200/20 bg-slate-900/65 p-6 backdrop-blur-md">
              <p className="font-heading text-3xl font-bold text-indigo-200">
                50+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Entregas exitosas en entornos reales
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-200/20 bg-slate-900/65 p-6 backdrop-blur-md">
              <p className="font-heading text-3xl font-bold text-cyan-100">
                12+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Tecnologías dominadas y aplicadas
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
