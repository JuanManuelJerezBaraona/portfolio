import { NavLink, PersonalInfo, Project, Skill, SocialLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'Sobre Mí', href: '#about' },
  { id: 'projects', label: 'El Sistema', href: '#projects' },
  { id: 'skills', label: 'Stack', href: '#skills' },
  { id: 'contact', label: 'Contacto', href: '#contact' },
];

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Juan Manuel Jerez Baraona',
  title: 'Full Stack Developer',
  age: 35,
  experience: ['Tsoft', 'Seguros Falabella'],
  bio: [
    'Soy Full Stack Developer con experiencia construyendo plataformas de Seguros Falabella para Chile, Perú y Colombia, liderando flujos clave como cotización, contratación, aceptación digital, pago y postventa.',
    'Trabajo con React, Next.js, TypeScript, NestJS y Strapi para entregar productos escalables, con foco en arquitectura limpia, UX/UI de alto estándar y resultados concretos para el negocio.',
  ],
  profileImage: '/profile-image.jpg',
};

export const SKILLS: Skill[] = [
  { id: 'js', name: 'JavaScript', icon: '/icons/javascript.svg', category: 'frontend' },
  { id: 'ts', name: 'TypeScript', icon: '/icons/typescript.svg', category: 'frontend' },
  { id: 'react', name: 'React', icon: '/icons/react.svg', category: 'frontend' },
  { id: 'vue', name: 'Vue', icon: '/icons/vue.svg', category: 'frontend' },
  { id: 'angular', name: 'Angular', icon: '/icons/angular.svg', category: 'frontend' },
  { id: 'next', name: 'Next.js', icon: '/icons/nextjs.svg', category: 'frontend' },
  { id: 'nest', name: 'NestJS', icon: '/icons/nestjs.svg', category: 'backend' },
  { id: 'strapi', name: 'Strapi', icon: '/icons/strapi.svg', category: 'backend' },
  { id: 'bootstrap', name: 'Bootstrap', icon: '/icons/bootstrap.svg', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', category: 'frontend' },
  { id: 'docker', name: 'Docker', icon: '/icons/docker.svg', category: 'tools' },
  { id: 'storybook', name: 'Storybook', icon: '/icons/storybook.svg', category: 'tools' },
  { id: 'postman', name: 'Postman', icon: '/icons/postman.svg', category: 'tools' },
  { id: 'mongodb', name: 'MongoDB', icon: '/icons/mongodb.svg', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', icon: '/icons/postgresql.svg', category: 'database' },
  { id: 'figma', name: 'Figma', icon: '/icons/figma.svg', category: 'tools' },
];

/**
 * Projects are ordered as the real insurance customer journey:
 * Cotización → Aceptación → Pago → Acceso → Postventa.
 * `stage` drives the funnel; `countries`/`role`/`contributions` are seeded
 * from the existing descriptions, real tech stacks and bio — verify & refine.
 */
export const PROJECTS: Project[] = [
  {
    id: 'seguros-falabella-landing',
    title: 'Seguros Falabella',
    category: 'Seguros Falabella',
    stage: 1,
    flow: 'Cotización',
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: 'Desarrollo full-stack del flujo de cotización y contratación.',
    description:
      'Cotización y contratación de seguros 100% online para Chile, Perú y Colombia. Foco en conversión y UX.',
    summary:
      'La puerta de entrada al ecosistema: una experiencia de cotización y contratación 100% online pensada para convertir. Selección de producto, cotización en tiempo real y derivación al flujo de contratación, con contenido administrable por negocio.',
    challenge:
      'Unificar la cotización de múltiples productos de seguro en una sola experiencia rápida y conversiva, manteniendo el contenido editable por el negocio sin depender de despliegues.',
    contributions: [
      'Arquitectura de la aplicación con Next.js y componentes documentados en Storybook.',
      'Gestión del estado del flujo de cotización con Zustand.',
      'Servicios de orquestación con NestJS y persistencia en MongoDB.',
      'Contenido y campañas administrables con Strapi 5.',
    ],
    highlights: [
      { value: '01', label: 'Etapa · Cotización' },
      { value: '3', label: 'Países en vivo' },
      { value: '9', label: 'Tecnologías' },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Strapi 5', 'MongoDB'],
    filters: ['Cotización', 'Contratación'],
    url: 'https://www.segurosfalabella.com',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-landing-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-landing-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-aceptacion-digital',
    title: 'Aceptación Digital',
    category: 'Seguros Falabella',
    stage: 2,
    flow: 'Aceptación',
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: 'Desarrollo del flujo de aceptación y contratación digital.',
    description:
      'Contratación digital sin papeles ni firmas físicas. Experiencia guiada y validada completamente online.',
    summary:
      'Contratación sin papeles ni firmas físicas. Una experiencia guiada que valida al cliente y formaliza la contratación completamente online, paso a paso y sin fricción.',
    challenge:
      'Reemplazar la firma física por un proceso digital validado, guiando al usuario etapa por etapa y cumpliendo los requisitos legales del negocio.',
    contributions: [
      'Implementación del flujo guiado de aceptación paso a paso.',
      'Sistema de componentes con Tomaco Components y Storybook.',
      'Servicios de validación y orquestación con NestJS.',
      'Textos legales y contenido administrables con Strapi.',
    ],
    highlights: [
      { value: '02', label: 'Etapa · Aceptación' },
      { value: '0', label: 'Papeles o firmas físicas' },
      { value: '9', label: 'Tecnologías' },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    filters: ['Contratación', 'Pagos'],
    url: 'https://aceptacion.segurosfalabella.com/',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-aceptacion-digital-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-aceptacion-digital-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-boton-pago',
    title: 'Botón de Pago',
    category: 'Seguros Falabella',
    stage: 3,
    flow: 'Pago',
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: 'Desarrollo del flujo de pago de cuotas en línea.',
    description:
      'Pago de cuotas de seguros en línea. Flujo guiado desde la propuesta hasta la confirmación del pago.',
    summary:
      'Pago de cuotas de seguros en línea: desde la consulta de la deuda o propuesta hasta la confirmación del pago, con un flujo guiado, claro y confiable.',
    challenge:
      'Construir un flujo de pago sin fricción y con estados claros —de la propuesta a la confirmación— integrable con el resto del ecosistema.',
    contributions: [
      'Flujo de pago con estados claros: propuesta → pago → confirmación.',
      'Gestión de estado con Zustand y componentes Tomaco.',
      'Integración de servicios de pago con NestJS.',
      'Manejo de la intención de pago y su confirmación.',
    ],
    highlights: [
      { value: '03', label: 'Etapa · Pago' },
      { value: '3', label: 'Estados del flujo' },
      { value: '10', label: 'Tecnologías' },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    filters: ['Pagos'],
    url: 'https://pago.segurosfalabella.com/',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-boton-pago-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-boton-pago-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-login-postventa',
    title: 'Login Postventa',
    category: 'Seguros Falabella',
    stage: 4,
    flow: 'Acceso',
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: 'Desarrollo del acceso unificado al ecosistema postventa.',
    description:
      'Autenticación centralizada para el ecosistema postventa. Acceso seguro y unificado para CL, CO y PE.',
    summary:
      'Autenticación centralizada y segura para el ecosistema postventa. Un único punto de acceso para clientes de Chile, Colombia y Perú, consistente en todos los productos.',
    challenge:
      'Centralizar el acceso de tres países en una autenticación única, segura y consistente para todo el ecosistema postventa.',
    contributions: [
      'Autenticación centralizada para el ecosistema postventa.',
      'Acceso unificado multi-país (CL · CO · PE).',
      'Componentes Tomaco y documentación en Storybook.',
      'Servicios de sesión y seguridad con NestJS.',
    ],
    highlights: [
      { value: '04', label: 'Etapa · Acceso' },
      { value: '1', label: 'Punto de acceso único' },
      { value: '3', label: 'Países' },
    ],
    techStack: ['JavaScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    filters: ['Login'],
    url: 'https://clientes.segurosfalabella.com/',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-login-postventa-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-login-postventa-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-postventa',
    title: 'Postventa',
    category: 'Seguros Falabella',
    stage: 5,
    flow: 'Postventa',
    countries: ['CL', 'PE', 'CO'],
    status: 'internal',
    role: 'Desarrollo de la plataforma de autogestión postventa.',
    description:
      'Gestión de trámites post-contratación para CL, PE y CO. Plataforma unificada, autónoma y escalable.',
    summary:
      'Gestión de trámites post-contratación para Chile, Perú y Colombia. Una plataforma unificada, autónoma y escalable para que el cliente resuelva por su cuenta, sin llamar.',
    challenge:
      'Unificar los trámites postventa de tres países en una plataforma escalable que permita autogestión total al cliente.',
    contributions: [
      'Plataforma de autogestión de trámites postventa.',
      'Arquitectura escalable multi-país con React y Tailwind CSS.',
      'Servicios de dominio con NestJS y MongoDB.',
      'Contenido y configuración por país con Strapi.',
    ],
    highlights: [
      { value: '05', label: 'Etapa · Postventa' },
      { value: '3', label: 'Países autogestionados' },
      { value: '8', label: 'Tecnologías' },
    ],
    techStack: ['TypeScript', 'React', 'NestJS', 'Storybook', 'Figma', 'Tailwind CSS', 'Strapi 5', 'MongoDB'],
    filters: ['Cotización', 'Contratación', 'Pagos', 'Postventa'],
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-postventa-desktop.png',
      mobile: '',
    },
  },
];

/** Category for each technology, used to group the stack on case-file pages. */
const TECH_CATEGORY: Record<string, string> = {
  JavaScript: 'Frontend',
  TypeScript: 'Frontend',
  React: 'Frontend',
  Vue: 'Frontend',
  Angular: 'Frontend',
  'Next.js': 'Frontend',
  Zustand: 'Frontend',
  'Bootstrap 5': 'Frontend',
  'Tailwind CSS': 'Frontend',
  'Tomaco Components': 'Frontend',
  NestJS: 'Backend',
  'Strapi 5': 'Backend',
  MongoDB: 'Datos',
  PostgreSQL: 'Datos',
  Storybook: 'Herramientas',
  Figma: 'Herramientas',
  Docker: 'Herramientas',
  Postman: 'Herramientas',
};

const GROUP_ORDER = ['Frontend', 'Backend', 'Datos', 'Herramientas'];

export interface TechGroup {
  label: string;
  items: string[];
}

/** Groups a project's tech stack into ordered, labeled buckets. */
export const groupTechStack = (techStack: string[]): TechGroup[] => {
  const buckets = new Map<string, string[]>();
  for (const tech of techStack) {
    const group = TECH_CATEGORY[tech] ?? 'Herramientas';
    const items = buckets.get(group) ?? [];
    items.push(tech);
    buckets.set(group, items);
  }
  return GROUP_ORDER.filter((group) => buckets.has(group)).map((group) => ({
    label: group,
    items: buckets.get(group) as string[],
  }));
};

export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((project) => project.id === id);

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/juan-manuel-jerez-baraona-b54486274/',
    icon: 'linkedin',
  },
];
