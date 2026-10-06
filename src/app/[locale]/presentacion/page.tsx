import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Presentation } from '@/components/deck';
import { alternatesFor } from '@/i18n/navigation';

interface DeckPageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: DeckPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Deck' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternatesFor('/presentacion', locale as Locale),
    // Shared by link in interviews; the site itself is what search should find.
    robots: { index: false, follow: true },
  };
};

const DeckPage = async ({ params }: DeckPageProps) => {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return <Presentation />;
};

export default DeckPage;
