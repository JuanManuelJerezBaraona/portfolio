'use client';

import { NAV_LINKS, PERSONAL_INFO } from '@/constants/data';
import ModeToggle from '@/components/ui/ModeToggle';
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
      let currentSectionId = '';

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
    <nav className="fixed inset-x-0 top-0 z-50">
      {/* The blur lives on this wrapper, not on <nav>: backdrop-filter would
          otherwise become the containing block of the fixed overlay below. */}
      <div className="relative z-50 border-b border-line bg-void/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
            <span className="channel-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="wide text-[0.95rem]">{PERSONAL_INFO.shortName}</span>
          </Link>

          <div className="flex items-center gap-5 md:gap-8">
            <div className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = isHome && activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href, link.id)}
                    onKeyDown={(event) => handleKeyDown(event, link.href, link.id)}
                    className={`meta cursor-pointer py-2 transition-colors ${
                      isActive ? 'text-text' : 'text-muted hover:text-text'
                    }`}
                    tabIndex={0}
                    aria-label={`Ir a ${link.label}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={`mr-2 inline-block h-1.5 w-1.5 align-middle transition-opacity ${
                        link.id === 'ia' ? 'bg-mcherry' : 'bg-text'
                      } ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      aria-hidden="true"
                    />
                    {link.label}
                  </button>
                );
              })}
            </div>

            <ModeToggle />

            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="meta -mr-2 p-2 text-text md:hidden"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? 'Cerrar' : 'Menú'}
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={closeMobileMenu}
        aria-label="Cerrar menú móvil"
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={`fixed inset-x-0 bottom-0 top-16 bg-void/70 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={mobileMenuRef}
        className={`relative z-50 overflow-hidden border-line bg-void transition-all duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'max-h-96 border-t opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.href, link.id)}
              onKeyDown={(event) => handleKeyDown(event, link.href, link.id)}
              className={`wide border-b border-line py-4 text-left text-2xl last:border-b-0 ${
                isHome && activeSection === link.id ? 'text-text' : 'text-muted'
              }`}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              aria-label={`Ir a ${link.label}`}
              aria-current={isHome && activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
