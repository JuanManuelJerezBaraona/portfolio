export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  url?: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

