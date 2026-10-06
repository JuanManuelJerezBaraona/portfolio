import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { DesignSystem } from '@/components/system';
import { alternatesFor } from '@/i18n/navigation';

interface SystemPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: SystemPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'System' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternatesFor('/sistema', locale as Locale),
    openGraph: { title: t('metaTitle'), description: t('metaDescription') },
  };
};

const SystemPage = async ({ params }: SystemPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <DesignSystem />;
};

export default SystemPage;
