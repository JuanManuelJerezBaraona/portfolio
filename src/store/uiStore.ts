import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  activeSection: string;
  expandedAccordion: string | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setActiveSection: (section: string) => void;
  setExpandedAccordion: (accordion: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeSection: 'about',
  expandedAccordion: 'about',

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  setActiveSection: (section: string) => set({ activeSection: section }),

  setExpandedAccordion: (accordion: string | null) =>
    set({ expandedAccordion: accordion }),
}));

