import { PERSONAL_INFO } from '@/constants/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
      <div className="meta mx-auto flex max-w-7xl flex-col gap-2 text-muted sm:flex-row sm:justify-between">
        <p>
          © {currentYear} {PERSONAL_INFO.name}
        </p>
        <p>{PERSONAL_INFO.location}</p>
      </div>
    </footer>
  );
};

export default Footer;
