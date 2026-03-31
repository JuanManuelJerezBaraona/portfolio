import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://juanmanueljerezportfolio.vercel.app';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Juan Manuel Jerez Baraona - Desarrollador Web',
  description:
    'Portfolio de Juan Manuel Jerez Baraona, Desarrollador Web Full Stack especializado en React, Next.js, TypeScript y más.',
  keywords: [
    'desarrollador web',
    'frontend',
    'react',
    'nextjs',
    'typescript',
    'portfolio',
  ],
  authors: [{ name: 'Juan Manuel Jerez Baraona' }],
  openGraph: {
    title: 'Juan Manuel Jerez Baraona',
    description:
      'Desarrollador Web Full Stack · React, Next.js, TypeScript y más.',
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Portfolio — Juan Manuel Jerez Baraona',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Manuel Jerez Baraona',
    description:
      'Desarrollador Web Full Stack · React, Next.js, TypeScript y más.',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased text-white">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
