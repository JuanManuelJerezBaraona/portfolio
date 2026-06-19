import type { Metadata } from 'next';
import { Chakra_Petch, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Footer, Navbar } from '@/components';
import ScrollReset from '@/components/ui/ScrollReset';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://juanmanueljerezportfolio.vercel.app';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Juan Manuel Jerez Baraona — Full-Stack Developer',
  description:
    'Construyo plataformas de seguros 100% online de punta a punta — cotización, aceptación digital, pago y postventa — en producción para Chile, Perú y Colombia.',
  keywords: [
    'desarrollador web',
    'full stack',
    'react',
    'nextjs',
    'typescript',
    'nestjs',
    'portfolio',
  ],
  authors: [{ name: 'Juan Manuel Jerez Baraona' }],
  openGraph: {
    title: 'Juan Manuel Jerez Baraona — Full-Stack Developer',
    description:
      'El funnel completo, de punta a punta. Plataformas de seguros en producción para CL · PE · CO.',
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Portfolio — Juan Manuel Jerez Baraona',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Manuel Jerez Baraona — Full-Stack Developer',
    description:
      'El funnel completo, de punta a punta. Plataformas de seguros en producción para CL · PE · CO.',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="es"
      className={`${chakraPetch.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">
        <div className="app-bg relative min-h-screen overflow-x-hidden">
          <ScrollReset />
          <div className="grid-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
          <Navbar />
          <div className="relative z-10">
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
