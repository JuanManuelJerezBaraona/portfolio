import type { Metadata } from 'next';
import { Archivo, Martian_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer, Navbar } from '@/components';
import ScrollReset from '@/components/ui/ScrollReset';
import { MODE_INIT_SCRIPT } from '@/components/ui/scopeMode';
import { alternatesFor, getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://juanmanueljerezportfolio.vercel.app';

// Both are variable fonts; the width axis drives the headline treatment.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const martianMono = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-martian',
  display: 'swap',
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({ params }: LayoutProps): Promise<Metadata> => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'Meta' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: t.raw('keywords') as string[],
    authors: [{ name: 'Juan Manuel Jerez Baraona' }],
    alternates: alternatesFor('/', locale),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: t('ogLocale'),
      url: getPathname({ href: '/', locale }),
      siteName: 'Portfolio — Juan Manuel Jerez Baraona',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

const LocaleLayout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`reveal-ready ${archivo.variable} ${martianMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `${MODE_INIT_SCRIPT}if('scrollRestoration' in history){history.scrollRestoration='manual';}if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}window.scrollTo(0,0);`,
          }}
        />
        {/* Without JS the reveal elements would stay hidden, so force them visible. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>.reveal,.cover-name{opacity:1!important;filter:none!important;transform:none!important}</style>`,
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider>
          <div className="relative min-h-screen overflow-x-clip">
            <ScrollReset />
            <a href="#main" className="skip-link meta">
              {t('skipToContent')}
            </a>
            <Navbar />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
