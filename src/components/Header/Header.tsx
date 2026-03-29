"use client";

import { PERSONAL_INFO } from "@/constants/data";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header id="home" className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
        <div className="flex justify-center items-center w-full flex-col gap-5 lg:w-1/2">
          <div className="w-80 h-80 lg:w-90 lg:h-90 rounded-full border border-cyan-200/30 bg-slate-900/65 p-2 backdrop-blur-md shadow-[0_0_34px_rgba(34,211,238,0.35)]">
            <div className="h-full w-full overflow-hidden rounded-full border border-cyan-300/40">
              <Image
                src={PERSONAL_INFO.profileImage}
                alt={`Foto de perfil de ${PERSONAL_INFO.name}`}
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
                priority
                quality={100}
              />
            </div>
          </div>

        </div>

        <div className="flex justify-center items-center w-full flex-col">
          <p className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Portafolio
          </p>

          <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Desarrollador Web
            <span className="block bg-linear-to-r from-cyan-300 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Full Stack
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            Transformo ideas en productos digitales
            modernos, sólidos y escalables. Creando experiencias web atractivas y funcionales.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-cyan-200/60 bg-linear-to-r from-cyan-400/40 to-indigo-500/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_10px_28px_rgba(14,165,233,0.24)]"
            >
              Explorar proyectos
            </Link>
            {/* <a
              href="/CV-Juan-Manuel-Jerez-Baraona.pdf"
              download="CV-Juan-Manuel-Jerez-Baraona.pdf"
              className="inline-flex items-center justify-center rounded-full border border-slate-400/35 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:text-cyan-100 hover:shadow-[0_10px_28px_rgba(14,165,233,0.24)]"
              aria-label="Descargar Currículum Vitae en PDF"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0 4-4m-4 4-4-4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 18h14" />
              </svg>
              Descargar CV
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
