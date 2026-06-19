import { PERSONAL_INFO } from '@/constants/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/40 bg-linear-to-br from-neon/20 to-cyan/20 font-display text-sm font-bold text-text">
            JJ
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold text-text">{PERSONAL_INFO.name}</p>
            <p className="label mt-0.5 text-muted">Full-Stack Developer</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2">
          <span className="dot dot-live" />
          <span className="label text-muted">Sistema en línea · {currentYear}</span>
        </div>
      </div>

      <p className="label mt-8 text-center text-muted/70">
        © {currentYear} {PERSONAL_INFO.name} · Construido con Next.js + Tailwind
      </p>
    </footer>
  );
};

export default Footer;
