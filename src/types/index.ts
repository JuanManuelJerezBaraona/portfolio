import type { Locale } from 'next-intl';

/** Copy that changes with the language. A plain string reads the same in both. */
export type Text = string | Record<Locale, string>;

/** The same shape with every `Text` resolved to the string of one language. */
export type InLocale<T> = T extends Record<Locale, string>
  ? string
  : T extends readonly (infer Item)[]
    ? InLocale<Item>[]
    : T extends object
      ? { [K in keyof T]: InLocale<T[K]> }
      : T;

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'ai' | 'tools';

export interface SkillData {
  id: string;
  name: Text;
  category: SkillCategory;
}
export type Skill = InLocale<SkillData>;

export type CountryCode = 'CL' | 'PE' | 'CO';

export interface ProjectData {
  id: string;
  title: Text;
  category: string;
  description: Text;
  techStack: string[];
  url?: string;
  screenshots?: {
    /** All 2530×1140. With more than one, the frame cycles through them; the first is the poster. */
    desktop: string[];
    /** All 659×1024, paired by index with `desktop` (the phone follows the cycle). */
    mobile: string[];
  };

  /** Position in the customer journey (1 = entry). */
  stage: number;
  /** Journey stage name, e.g. "Cotización". */
  flow: Text;
  /** Countries where the flow runs in production. */
  countries: CountryCode[];
  /** "live" = public URL in production, "internal" = restricted access. */
  status: 'live' | 'internal';
  /** What Juan Manuel specifically owned on this flow. */
  role: Text;
  /** Longer narrative used on the case-file hero. */
  summary: Text;
  /** The problem this flow had to solve. */
  challenge: Text;
  /** Concrete contributions, grounded in the real stack. */
  contributions: Text[];
  /** What the application does for its users, in one sentence, with no figures. */
  outcome: Text;
}
export type Project = InLocale<ProjectData>;

export interface TimelineEntryData {
  /** e.g. "2016 – 2022" */
  period: Text;
  role: Text;
  place: Text;
  detail?: Text;
  /** Concrete things he did in this role, confirmed by him. */
  highlights?: Text[];
  /** The role he holds today. */
  current?: boolean;
}
export type TimelineEntry = InLocale<TimelineEntryData>;

/** One layer of the architecture the Seguros Falabella apps share. */
export interface ArchitectureLayerData {
  id: string;
  /** Channel it's tinted with (frontend, backend, data); `text` for the rest. */
  channel: 'dapi' | 'gfp' | 'yfp' | 'text';
  name: Text;
  /** What the layer is responsible for. */
  role: Text;
  tools: string[];
}
export type ArchitectureLayer = InLocale<ArchitectureLayerData>;

export interface AiPracticeData {
  id: string;
  title: Text;
  body: Text;
  tools: Text[];
}
export type AiPractice = InLocale<AiPracticeData>;

export interface NavLinkData {
  id: string;
  label: Text;
  href: string;
}
export type NavLink = InLocale<NavLinkData>;

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfoData {
  name: string;
  shortName: string;
  /** Role with level, the first thing the hero says about him. */
  title: Text;
  /** Seniority on its own, for the fact rows. */
  level: Text;
  location: Text;
  /** Year he started working as a Full Stack developer. */
  fullStackSince: number;
  email: string;
  /** The portfolio's address as the CV prints it, without the protocol. */
  site: string;
  /** PDF in each language. */
  cv: Text;
  profileImage: string;
}
export type PersonalInfo = InLocale<PersonalInfoData>;
