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

interface ProjectBase {
  id: string;
  title: Text;
  /** Who it's for: the client, or "Proyecto propio". */
  category: Text;
  description: Text;
  techStack: string[];
  url?: string;
  screenshots?: {
    /** All 2530×1140. With more than one, the frame cycles through them; the first is the poster. */
    desktop: string[];
    /** All 659×1024, paired by index with `desktop` (the phone follows the cycle). */
    mobile: string[];
  };

  /** Journey stage name ("Cotización"); for a project of his own, what it is in a word ("Rimas"). */
  flow: Text;
  /** "live" = public URL in production, "internal" = restricted access. */
  status: 'live' | 'internal';
  /** What Juan Manuel specifically owned on this project. */
  role: Text;
  /** Longer narrative used on the case-file hero. */
  summary: Text;
  /** The problem it had to solve. */
  challenge: Text;
  /** Concrete contributions, grounded in the real stack. */
  contributions: Text[];
  /** What the application does for its users, in one sentence, with no figures. */
  outcome: Text;
}

/** One of the Seguros Falabella apps: a stage of the customer journey. */
export interface JourneyProjectData extends ProjectBase {
  kind: 'journey';
  /** Position in the customer journey (1 = entry). */
  stage: number;
  /** Countries where the flow runs in production. */
  countries: CountryCode[];
}

/** A project of his own, outside the journey: no stage and no countries. */
export interface OwnProjectData extends ProjectBase {
  kind: 'own';
}

/**
 * A union on purpose: anything that reads `stage` or `countries` has to
 * narrow on `kind` first, so nothing can present a project of his own as a
 * stage of the insurance journey.
 */
export type ProjectData = JourneyProjectData | OwnProjectData;
export type Project = InLocale<ProjectData>;
export type JourneyProject = InLocale<JourneyProjectData>;

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

/** One step of the protocol he follows with a coding agent, in the order he runs them. */
export interface AiStepData {
  id: string;
  title: Text;
  body: Text;
  /** What the step works with: files, tools or servers. */
  tools: Text[];
  /** The step nothing gets past without: flagged the way a lab protocol flags one. */
  critical?: boolean;
}
export type AiStep = InLocale<AiStepData>;

/** Something he built with language models, and the control that checks its output. */
export interface AiBuildData {
  id: string;
  title: Text;
  /** Employer or project it belongs to. */
  place: Text;
  /**
   * How far it has got, shown next to the place (`Ai.status*`): at work,
   * a project of his own that is live, one still being built, or a study.
   */
  status: 'work' | 'live' | 'building' | 'study';
  /** What the model does and how it is wired. */
  method: Text;
  /** What checks its output before anyone relies on it. */
  control: Text;
  tools: Text[];
  /** Id of its case file, when it has one. */
  project?: string;
}
export type AiBuild = InLocale<AiBuildData>;

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
  /**
   * What he works as, the first thing the hero says about him, one role per
   * line: the role he applies for, then the one he holds today with its level.
   */
  roles: Text[];
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
