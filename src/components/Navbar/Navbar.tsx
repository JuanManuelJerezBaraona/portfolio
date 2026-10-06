'use client';

import { NAV_LINKS, PERSONAL_INFO, getNavLinks } from '@/constants/data';
import LocaleSwitch from '@/components/ui/LocaleSwitch';
import ModeToggle from '@/components/ui/ModeToggle';
import TagMark from '@/components/ui/TagMark';
import { Link, usePathname } from '@/i18n/navigation';
import { useUIStore } from '@/store/uiStore';
import { useLocale, useTranslations } from 'next-intl';
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
  const t = useTranslations('Nav');
  const links = getNavLinks(useLocale());
  const isHome = pathname === '/';

  // Real links (open in a new tab, copy the address); on the home page a
  // click scrolls instead of navigating and hands focus to the section, so
  // the next Tab carries on inside it rather than back in the navbar.
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setActiveSection(sectionId);
    closeMobileMenu();
    if (!isHome) return;

    const element = document.getElementById(sectionId);
    if (!element) return;
    event.preventDefault();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
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
        mobileMenuButtonRef.current?.focus();
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
          <Link href="/" className="flex items-center gap-3" aria-label={t('home')}>
            <TagMark className="text-[0.95rem]" />
            {/* On phones the mark stands alone: the bar has no room left for the name. */}
            <span className="wide hidden whitespace-nowrap text-[0.95rem] sm:inline">{PERSONAL_INFO.shortName}</span>
          </Link>

          {/* The full link row needs ~1040px with both languages, so below `lg` it folds into the menu. */}
          <div className="flex items-center gap-3.5 sm:gap-5 lg:gap-6 xl:gap-8">
            <div className="hidden items-center gap-5 lg:flex xl:gap-7">
              {links.map((link) => {
                const isActive = isHome && activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={`/${link.href}`}
                    onClick={(event) => handleNavClick(event, link.id)}
                    className={`meta py-2 transition-colors ${
                      isActive ? 'text-text' : 'text-muted hover:text-text'
                    }`}
                    aria-label={t('goTo', { section: link.label })}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span
                      className={`sec-${link.id} nav-dot ${isActive ? 'is-active' : ''}`}
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <LocaleSwitch />
            <ModeToggle />

            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="meta -mr-2 p-2 text-text lg:hidden"
              aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? t('close') : t('menu')}
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={closeMobileMenu}
        aria-label={t('closeMobileMenu')}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={`fixed inset-x-0 bottom-0 top-16 bg-void/70 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        ref={mobileMenuRef}
        // Open, it can grow to the screen (minus the bar) and scrolls if a short landscape phone can't fit it.
        className={`relative z-50 border-line bg-void transition-all duration-300 ease-out lg:hidden ${
          isMobileMenuOpen
            ? 'max-h-[calc(100dvh-4rem)] overflow-y-auto border-y opacity-100'
            : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col px-4 py-3 sm:px-6">
          {links.map((link) => (
            <Link
              key={link.id}
              href={`/${link.href}`}
              onClick={(event) => handleNavClick(event, link.id)}
              className={`wide border-b border-line py-4 text-left text-2xl last:border-b-0 ${
                isHome && activeSection === link.id ? 'text-text' : 'text-muted'
              }`}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              aria-label={t('goTo', { section: link.label })}
              aria-current={isHome && activeSection === link.id ? 'location' : undefined}
            >
              <span
                className={`sec-${link.id} nav-dot ${isHome && activeSection === link.id ? 'is-active' : ''}`}
                aria-hidden="true"
              />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
