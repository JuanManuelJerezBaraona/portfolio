import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
    description: 'Desarrollador Web Full Stack',
    type: 'website',
    locale: 'es_ES',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es">
      <body className="antialiased text-white">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
