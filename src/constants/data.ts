import { NavLink, PersonalInfo, Project, Skill, SocialLink } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'Sobre Mí', href: '#about' },
  { id: 'projects', label: 'Proyectos', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
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
  { id: 'zustand', name: 'Zustand', icon: '/icons/zustand.svg', category: 'frontend' },
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

export const PROJECTS: Project[] = [
  {
    id: 'seguros-falabella-landing',
    title: 'Portal de Seguros Falabella 🇨🇱🇵🇪🇨🇴',
    category: 'Seguros Falabella',
    description:
      'Portal regional para descubrir productos, cotizar en pocos pasos y contratar seguros de forma totalmente online. Se diseñó para Chile, Perú y Colombia con foco en conversión, consistencia visual y rendimiento en múltiples dispositivos.',
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Strapi 5', 'MongoDB'],
    filters: ['Cotización', 'Contratación'],
    url: 'https://www.segurosfalabella.com',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-landing-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-landing-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-boton-pago',
    title: 'Botón de Pago 🇨🇱',
    category: 'Seguros Falabella',
    description:
      'Portal transaccional para consultar cuotas pendientes y completar pagos de seguros en línea de forma simple. El flujo inicia con el número de propuesta, muestra la deuda asociada y conduce al cliente hasta la confirmación final.',
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    filters: ['Pagos'],
    url: 'https://pago.segurosfalabella.com/',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-boton-pago-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-boton-pago-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-aceptacion-digital',
    title: 'Aceptación Digital 🇨🇱',
    category: 'Seguros Falabella',
    description:
      'Módulo digital para cerrar la contratación de seguros previamente cotizados u ofertados por el canal comercial. Reemplaza firmas y documentos físicos por una experiencia guiada, segura y validada completamente en línea.',
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    filters: ['Contratación', 'Pagos'],
    url: 'https://aceptacion.segurosfalabella.com/',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-aceptacion-digital-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-aceptacion-digital-mobile.png',
    },
  },
  {
    id: 'seguros-falabella-postventa',
    title: 'Postventa 🇨🇱🇵🇪🇨🇴',
    category: 'Seguros Falabella',
    description:
      'Plataforma regional de postventa para gestionar trámites posteriores a la contratación con alta autonomía del usuario. Unifica procesos de clientes y equipos internos en Chile, Perú y Colombia con una operación continua y escalable.',
    techStack: ['TypeScript', 'React', 'NestJS', 'Storybook', 'Figma', 'Tailwind CSS', 'Strapi 5','MongoDB'],
    filters: ['Cotización', 'Contratación', 'Pagos', 'Postventa'],
  },
  {
    id: 'seguros-falabella-login-postventa',
    title: 'Login Postventa 🇨🇱🇵🇪🇨🇴',
    category: 'Seguros Falabella',
    description:
      'Componente de autenticación regional que habilita el acceso seguro al ecosistema de postventa de Seguros Falabella. Centraliza el inicio de sesión para clientes de banco y seguros en CL, CO y PE con una experiencia homogénea.',
    techStack: ['JavaScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5','MongoDB'],
    filters: ['Login'],
    url: 'https://clientes.segurosfalabella.com/',
    screenshots: {
      desktop: '/project-shots/desktop/seguros-falabella-login-postventa-desktop.png',
      mobile: '/project-shots/mobile/seguros-falabella-login-postventa-mobile.png',
    },
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/juan-manuel-jerez-baraona-b54486274/',
    icon: 'linkedin',
  },
];
