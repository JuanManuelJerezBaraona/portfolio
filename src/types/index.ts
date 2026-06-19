export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export type CountryCode = 'CL' | 'PE' | 'CO';

export interface ProjectHighlight {
  /** monospace value, e.g. "03" or "100%" */
  value: string;
  /** short label below the value */
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  filters: string[];
  url?: string;
  screenshots?: {
    desktop: string;
    mobile: string;
  };

  /** Position in the customer journey funnel (1 = entry). */
  stage: number;
  /** Funnel stage name, e.g. "Cotización". */
  flow: string;
  /** Countries where the flow runs in production. */
  countries: CountryCode[];
  /** "live" = public URL in production, "internal" = restricted access. */
  status: 'live' | 'internal';
  /** What Juan Manuel specifically owned on this flow. */
  role: string;
  /** Longer narrative used on the case-file hero. */
  summary: string;
  /** The problem this flow had to solve. */
  challenge: string;
  /** Concrete contributions, grounded in the real stack. */
  contributions: string[];
  /** Honest, derivable stats for the case file. */
  highlights: ProjectHighlight[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  age: number;
  experience: string[];
  bio: string[];
  profileImage: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

