import type { Metadata } from 'next';
import { Archivo, Martian_Mono } from 'next/font/google';
import { Footer, Navbar } from '@/components';
import ScrollReset from '@/components/ui/ScrollReset';
import { MODE_INIT_SCRIPT } from '@/components/ui/scopeMode';
import './globals.css';

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

const description =
  'Desarrollador full-stack en Santiago de Chile. Ingeniero en biotecnología que hoy construye los flujos de cotización, pago y postventa de Seguros Falabella con React, Next.js, NestJS y Strapi, y trabaja a diario con agentes de IA.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Juan Manuel Jerez Baraona · Desarrollador full-stack',
  description,
  keywords: [
    'desarrollador full stack',
    'react',
    'next.js',
    'typescript',
    'nestjs',
    'strapi',
    'nuxt',
    'vue',
    'playwright',
    'claude code',
    'codex',
    'opencode',
    'github copilot',
    'spec-driven development',
    'n8n',
    'mcp',
    'ia',
    'santiago de chile',
  ],
  authors: [{ name: 'Juan Manuel Jerez Baraona' }],
  openGraph: {
    title: 'Juan Manuel Jerez Baraona · Desarrollador full-stack',
    description,
    type: 'website',
    locale: 'es_CL',
    url: siteUrl,
    siteName: 'Portfolio — Juan Manuel Jerez Baraona',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Manuel Jerez Baraona · Desarrollador full-stack',
    description,
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
            __html: `<style>.reveal{opacity:1!important;filter:none!important;transform:none!important}</style>`,
          }}
        />
      </head>
      <body className="antialiased">
        <div className="relative min-h-screen overflow-x-clip">
          <ScrollReset />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
