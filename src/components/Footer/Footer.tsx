'use client';

import { SOCIAL_LINKS, PERSONAL_INFO } from '@/constants/data';
import Link from 'next/link';
import type { ReactNode } from 'react';

const SocialIcon = ({ icon }: { icon: string }) => {
  const iconComponents: Record<string, ReactNode> = {
    linkedin: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };

  return iconComponents[icon] || null;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleKeyDown = (event: React.KeyboardEvent, url: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="border-t border-indigo-300/20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-slate-400">Sígueme en:</p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-indigo-300/25 bg-slate-900/70 p-3 text-slate-200 transition-all hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-100"
                aria-label={`Visitar ${social.name}`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, social.url)}
              >
                <SocialIcon icon={social.icon} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-indigo-300/20 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} {PERSONAL_INFO.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

