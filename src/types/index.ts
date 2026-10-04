export type SkillCategory = 'frontend' | 'backend' | 'database' | 'ai' | 'tools';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export type CountryCode = 'CL' | 'PE' | 'CO';

/** One figure in a case's result, read as a sentence: value + label. */
export interface Metric {
  /** Short enough to read at a glance, e.g. "54 → 90" or "~3 min". */
  value: string;
  /** Continues the value, e.g. "de las contrataciones en tienda…". */
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  url?: string;
  screenshots?: {
    desktop: string;
    mobile: string;
  };

  /** Position in the customer journey (1 = entry). */
  stage: number;
  /** Journey stage name, e.g. "Cotización". */
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
  /** What changed after the work, in one sentence. */
  outcome: string;
  /** The figures behind the outcome. */
  metrics: Metric[];
}

export interface TimelineEntry {
  /** e.g. "2016 – 2022" */
  period: string;
  role: string;
  place: string;
  detail?: string;
  /** Concrete things he did in this role, confirmed by him. */
  highlights?: string[];
  /** The role he holds today. */
  current?: boolean;
}

export interface AiPractice {
  id: string;
  title: string;
  body: string;
  tools: string[];
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
  shortName: string;
  title: string;
  location: string;
  /** Year he started working as a full-stack developer. */
  fullStackSince: number;
  email: string;
  cv: string;
  profileImage: string;
}
