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
    'Construyo experiencias web de alto impacto orientadas a negocio, con foco en performance percibida, accesibilidad y UI moderna.',
    'Me especializo en crear productos escalables con React, Next.js y TypeScript, cuidando tanto la arquitectura técnica como la calidad visual.',
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
  { id: 'bootstrap', name: 'Bootstrap', icon: '/icons/bootstrap.svg', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg', category: 'frontend' },
  { id: 'docker', name: 'Docker', icon: '/icons/docker.svg', category: 'tools' },
  { id: 'postman', name: 'Postman', icon: '/icons/postman.svg', category: 'tools' },
  { id: 'mongodb', name: 'MongoDB', icon: '/icons/mongodb.svg', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', icon: '/icons/postgresql.svg', category: 'database' },
  { id: 'figma', name: 'Figma', icon: '/icons/figma.svg', category: 'tools' },
];

export const PROJECTS: Project[] = [
  {
    id: 'seguros-falabella-landing',
    title: 'Landing Seguros Falabella - Regional',
    category: 'Seguros Falabella',
    description:
      'Landing de Seguros Falabella para Chile, Perú y Colombia, optimizando experiencia de usuario, escalabilidad y consistencia regional.',
    techStack: ['Next.js', 'TypeScript', 'Bootstrap 5', 'SASS', 'HTML', 'Strapi 5', 'MongoDB'],
    url: 'https://www.segurosfalabella.com',
  },
  {
    id: 'seguros-falabella-boton-pago',
    title: 'Botón de Pago - Chile',
    category: 'Seguros Falabella',
    description:
      'Solución para pagar cuotas atrasadas de Seguros Falabella de manera fácil y eficiente para el cliente.',
    techStack: ['Next.js', 'NestJS', 'TypeScript', 'Zustand', 'Tomaco Components', 'MongoDB'],
    url: 'https://pago.segurosfalabella.com/',
  },
  {
    id: 'seguros-falabella-aceptacion-digital',
    title: 'Aceptación Digital - Chile',
    category: 'Seguros Falabella',
    description:
      'Desarrollé la solución para aceptar documentos digitales de manera eficiente y segura.',
    techStack: ['Next.js', 'NestJS', 'TypeScript', 'Bootstrap 5', 'Tomaco Components', 'MongoDB'],
    url: 'https://aceptacion.segurosfalabella.com/',
  },
  {
    id: 'seguros-falabella-postventa',
    title: 'Postventa - Regional',
    category: 'Seguros Falabella',
    description:
      'Plataforma Postventa de Seguros Falabella, con operación multi-país (CL/CO/PE) y enfoque en autogestión del cliente/ejecutivo.',
    techStack: ['React', 'NestJS', 'TypeScript', 'Webpack', 'Material UI', 'Tailwind CSS', 'SCSS', 'Node', 'MongoDB'],
  },
  {
    id: 'seguros-falabella-login-postventa',
    title: 'Login Postventa - Regional',
    category: 'Seguros Falabella',
    description:
      'Aplicación web orientada al flujo de login postventa de clientes de Banco y Seguros Falabella, para múltiples países (CL/CO/PE)',
    techStack: ['Next.js', 'NestJS', 'JavaScript', 'Bootstrap 5', 'Tomaco Components', 'MongoDB'],
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
