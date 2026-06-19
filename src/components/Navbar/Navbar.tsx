'use client';

import { NAV_LINKS } from '@/constants/data';
import { useUIStore } from '@/store/uiStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const Navbar = () => {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    activeSection,
    setActiveSection,
  } = useUIStore();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  const handleNavClick = (href: string, sectionId: string) => {
    setActiveSection(sectionId);
    closeMobileMenu();

    if (!isHome) {
      router.push(`/${href}`);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    href: string,
    sectionId: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(href, sectionId);
    }
  };

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    let ticking = false;

    const updateActiveSection = () => {
      const viewportMarker = window.scrollY + window.innerHeight * 0.35;
      let currentSectionId = sectionIds[0];

      for (const section of sections) {
        if (section.offsetTop <= viewportMarker) {
          currentSectionId = section.id;
        } else {
          break;
        }
      }

      setActiveSection(currentSectionId);
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [setActiveSection, pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const isMenuClick = mobileMenuRef.current?.contains(target);
      const isButtonClick = mobileMenuButtonRef.current?.contains(target);

      if (isMenuClick || isButtonClick) {
        return;
      }

      closeMobileMenu();
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="relative z-50 mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-xl border border-line bg-ink-2/80 px-3 backdrop-blur-xl">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Ir al inicio"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/40 bg-linear-to-br from-neon/20 to-cyan/20 font-display text-sm font-bold text-text shadow-[0_0_18px_-4px_rgba(255,46,136,0.6)]">
            JJ
          </div>
          <div className="leading-tight">
            <span className="label block text-muted">Full-Stack Dev</span>
            <span className="block font-display text-sm font-semibold text-text group-hover:text-grad">
              Juan Manuel Jerez
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-line bg-ink/60 p-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href, link.id)}
                onKeyDown={(event) => handleKeyDown(event, link.href, link.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none ${
                  isHome && activeSection === link.id
                    ? 'bg-neon/15 text-text shadow-[0_0_18px_-6px_rgba(255,46,136,0.8)]'
                    : 'text-muted hover:bg-white/5 hover:text-text'
                }`}
                tabIndex={0}
                aria-label={`Ir a ${link.label}`}
                aria-current={isHome && activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <button
          ref={mobileMenuButtonRef}
          onClick={toggleMobileMenu}
          className="rounded-lg border border-line p-2 text-text transition-colors hover:bg-white/5 md:hidden"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className={`h-6 w-6 transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={closeMobileMenu}
        aria-label="Cerrar menú móvil"
        className={`fixed inset-x-0 bottom-0 top-24 bg-ink/60 backdrop-blur-[3px] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={mobileMenuRef}
        className={`relative z-50 mx-auto w-full max-w-7xl overflow-hidden transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen
            ? 'mt-3 max-h-80 opacity-100'
            : 'pointer-events-none mt-0 max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`rounded-xl border border-line bg-ink-2/95 p-3 backdrop-blur-xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href, link.id)}
                onKeyDown={(event) => handleKeyDown(event, link.href, link.id)}
                className={`rounded-lg px-4 py-2.5 text-left transition-all hover:bg-white/5 hover:text-text ${
                  isHome && activeSection === link.id ? 'bg-neon/10 text-text' : 'text-muted'
                }`}
                tabIndex={0}
                aria-label={`Ir a ${link.label}`}
                aria-current={isHome && activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
