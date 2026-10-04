import { useLocale } from 'next-intl';
import { getPersonalInfo } from '@/constants/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const info = getPersonalInfo(useLocale());

  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
      <div className="meta mx-auto flex max-w-7xl flex-col gap-2 text-muted sm:flex-row sm:justify-between">
        <p>
          © {currentYear} {info.name}
        </p>
        <p>{info.location}</p>
      </div>
    </footer>
  );
};

export default Footer;
