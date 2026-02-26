'use client';

import { NAV_LINKS } from '@/constants/data';
import { useUIStore } from '@/store/uiStore';
import Link from 'next/link';
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

  const handleNavClick = (href: string, sectionId: string) => {
    setActiveSection(sectionId);
    closeMobileMenu();
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
  }, [setActiveSection]);

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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="relative z-50 mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl border border-indigo-300/20 bg-slate-950/65 px-4 backdrop-blur-xl shadow-[0_0_35px_rgba(59,130,246,0.18)]">
          <Link
            href="/"
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            aria-label="Ir al inicio"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/40 bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 text-sm font-bold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              J
            </div>
            <div className="leading-tight">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-300">
                Desarrollador Web
              </span>
              <span className="block text-sm font-semibold text-white group-hover:text-cyan-200">
                Juan Manuel Jerez Baraona
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-indigo-300/20 bg-slate-900/70 p-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href, link.id)}
                onKeyDown={(e) => handleKeyDown(e, link.href, link.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none ${
                  activeSection === link.id
                    ? 'bg-cyan-400/20 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.22)]'
                    : 'text-slate-200 hover:bg-indigo-400/15 hover:text-white'
                }`}
                tabIndex={0}
                aria-label={`Ir a ${link.label}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
            </div>
          </div>

          <button
            ref={mobileMenuButtonRef}
            onClick={toggleMobileMenu}
            className="rounded-xl border border-white/15 p-2 text-white transition-colors hover:bg-white/10 md:hidden"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
      </div>

      <button
        type="button"
        onClick={closeMobileMenu}
        aria-label="Cerrar menú móvil"
        className={`fixed inset-x-0 bottom-0 top-24 bg-slate-950/45 backdrop-blur-[3px] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={mobileMenuRef}
        className={`relative z-50 mx-auto w-full max-w-7xl overflow-hidden transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen
            ? 'mt-3 max-h-80 opacity-100'
            : 'mt-0 max-h-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`rounded-2xl border border-indigo-300/20 bg-slate-950/90 p-3 backdrop-blur-xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href, link.id)}
                  onKeyDown={(e) => handleKeyDown(e, link.href, link.id)}
                  className={`rounded-xl px-4 py-2 text-left transition-all hover:bg-indigo-400/20 hover:text-white ${
                    activeSection === link.id
                      ? 'bg-cyan-400/15 text-cyan-100'
                      : 'text-slate-200'
                  }`}
                  tabIndex={0}
                  aria-label={`Ir a ${link.label}`}
                  aria-current={activeSection === link.id ? 'page' : undefined}
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

