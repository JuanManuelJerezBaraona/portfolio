import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const NotFound = () => {
  const t = useTranslations('NotFound');

  return (
    <section className="flex min-h-[80vh] items-center px-4 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="meta text-muted">Error 404</p>
        <h1 className="display mt-5 text-5xl sm:text-7xl">{t('title')}</h1>
        <p className="mt-6 max-w-lg text-lg text-muted">{t('body')}</p>
        <Link href="/#projects" className="btn btn-primary mt-10">
          {t('cta')}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
