import { useLocale, useTranslations } from 'next-intl';
import { getPersonalInfo } from '@/constants/data';
import { Link } from '@/i18n/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const info = getPersonalInfo(useLocale());
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-line px-4 py-8 sm:px-6 lg:px-8">
      <div className="meta mx-auto flex max-w-7xl flex-col gap-2 text-muted sm:flex-row sm:justify-between">
        <p>
          © {currentYear} {info.name}
        </p>
        <p className="flex gap-4">
          <Link href="/sistema" className="link-underline hover:text-text">
            {t('system')}
          </Link>
          <span>{info.location}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
