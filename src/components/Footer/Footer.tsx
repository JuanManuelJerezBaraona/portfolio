'use client';

import { PERSONAL_INFO } from '@/constants/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-indigo-300/20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} {PERSONAL_INFO.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

