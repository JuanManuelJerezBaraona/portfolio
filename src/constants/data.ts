import {
  AiPractice,
  NavLink,
  PersonalInfo,
  Project,
  Skill,
  SocialLink,
  TimelineEntry,
} from '@/types';

export const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'Trayectoria', href: '#about' },
  { id: 'codigo', label: 'Código', href: '#codigo' },
  { id: 'projects', label: 'Proyectos', href: '#projects' },
  { id: 'ia', label: 'IA', href: '#ia' },
  { id: 'skills', label: 'Stack', href: '#skills' },
  { id: 'contact', label: 'Contacto', href: '#contact' },
];

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Juan Manuel Jerez Baraona',
  shortName: 'Juan Manuel Jerez',
  title: 'Desarrollador full-stack',
  location: 'Santiago de Chile',
  fullStackSince: 2022,
  email: 'jjerezbaraona@gmail.com',
  cv: '/CV-Juan-Manuel-Jerez-Baraona.pdf',
  profileImage: '/juan-manuel-jerez.jpg',
};

/** Chronological, taken from the CV. */
export const TIMELINE: TimelineEntry[] = [
  {
    period: '2009 – 2015',
    role: 'Ingeniería en Biotecnología',
    place: 'Universidad Andrés Bello',
  },
  {
    period: '2013 – 2016',
    role: 'Asistente de investigación',
    place: 'Laboratorio de Neurobiología',
    detail: 'Ciencia de datos, estadística y bioinformática.',
  },
  {
    period: '2016 – 2022',
    role: 'Desarrollador front-end',
    place: 'Farmacia Veterinaria Los Pingos',
    detail: 'E-commerce con JavaScript y React.',
  },
  {
    period: '2022 – 2024',
    role: 'Desarrollador full-stack',
    place: 'SUPER CBD',
    detail: 'E-commerce con React, Node.js, Express y PostgreSQL.',
  },
  {
    period: '2023 – 2024',
    role: 'Bootcamp Full-Stack JavaScript',
    place: 'Academia Desafío Latam',
  },
  {
    period: '2024',
    role: 'Desarrollador full-stack',
    place: 'ABO Consultores',
    detail: 'React, TypeScript, Node.js y MongoDB.',
  },
  {
    period: '2024 – hoy',
    role: 'Desarrollador full-stack',
    place: 'Tsoft · Seguros Falabella',
    detail: 'Cotización, aceptación digital, pago y postventa para Chile, Perú y Colombia.',
    highlights: [
      'Migración de aplicaciones Nuxt y Vue a Next.js con TypeScript.',
      'Mejora de rendimiento en aplicaciones legacy.',
      'Pruebas end-to-end automatizadas con Playwright.',
      'Participación en decisiones de arquitectura.',
    ],
    current: true,
  },
];

export const SKILLS: Skill[] = [
  { id: 'ts', name: 'TypeScript', category: 'frontend' },
  { id: 'js', name: 'JavaScript', category: 'frontend' },
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'next', name: 'Next.js', category: 'frontend' },
  { id: 'zustand', name: 'Zustand', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend' },
  { id: 'mui', name: 'Material UI', category: 'frontend' },
  { id: 'html', name: 'HTML5', category: 'frontend' },
  { id: 'css', name: 'CSS', category: 'frontend' },
  { id: 'sass', name: 'Sass', category: 'frontend' },
  { id: 'vite', name: 'Vite', category: 'frontend' },
  { id: 'vue', name: 'Vue', category: 'frontend' },
  { id: 'nuxt', name: 'Nuxt', category: 'frontend' },
  { id: 'angular', name: 'Angular', category: 'frontend' },

  { id: 'nest', name: 'NestJS', category: 'backend' },
  { id: 'node', name: 'Node.js', category: 'backend' },
  { id: 'express', name: 'Express', category: 'backend' },
  { id: 'fastify', name: 'Fastify', category: 'backend' },
  { id: 'strapi', name: 'Strapi', category: 'backend' },
  { id: 'rest', name: 'APIs REST', category: 'backend' },
  { id: 'hexagonal', name: 'Arq. hexagonal', category: 'backend' },
  { id: 'jest', name: 'Jest', category: 'backend' },
  { id: 'rxjs', name: 'RxJS', category: 'backend' },
  { id: 'axios', name: 'Axios', category: 'backend' },
  { id: 'swagger', name: 'Swagger', category: 'backend' },
  { id: 'apigee', name: 'Apigee', category: 'backend' },
  { id: 'oauth', name: 'OAuth 2.0', category: 'backend' },
  { id: 'sse', name: 'Server-Sent Events', category: 'backend' },

  { id: 'mongodb', name: 'MongoDB', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database' },

  { id: 'claude-code', name: 'Claude Code', category: 'ai' },
  { id: 'codex', name: 'Codex', category: 'ai' },
  { id: 'opencode', name: 'OpenCode', category: 'ai' },
  { id: 'copilot', name: 'GitHub Copilot', category: 'ai' },
  { id: 'sdd', name: 'Spec-Driven Development', category: 'ai' },
  { id: 'mcp', name: 'MCP', category: 'ai' },
  { id: 'skills', name: 'Agent Skills', category: 'ai' },
  { id: 'context-eng', name: 'Context engineering', category: 'ai' },
  { id: 'llm-apis', name: 'APIs de LLM', category: 'ai' },
  { id: 'n8n', name: 'n8n', category: 'ai' },

  { id: 'git', name: 'Git', category: 'tools' },
  { id: 'github', name: 'GitHub', category: 'tools' },
  { id: 'gitlab', name: 'GitLab', category: 'tools' },
  { id: 'storybook', name: 'Storybook', category: 'tools' },
  { id: 'figma', name: 'Figma', category: 'tools' },
  { id: 'postman', name: 'Postman', category: 'tools' },
  { id: 'playwright', name: 'Playwright', category: 'tools' },
  { id: 'docker', name: 'Docker', category: 'tools' },
  { id: 'datadog', name: 'Datadog', category: 'tools' },
  { id: 'kibana', name: 'Kibana', category: 'tools' },
];

/**
 * How he works with AI. Only tools and practices he confirmed using:
 * Claude Code, Codex, OpenCode, GitHub Copilot, writing his own skills,
 * configuring MCP servers, Spec-Driven Development, n8n and integrating
 * LLM APIs.
 */
export const AI_PRACTICES: AiPractice[] = [
  {
    id: 'context',
    title: 'Le doy contexto al agente',
    body: 'Cada repositorio tiene su CLAUDE.md y su copilot-instructions.md con la arquitectura, los comandos y las convenciones del proyecto. Así el agente parte sabiendo dónde está parado.',
    tools: ['Claude Code', 'GitHub Copilot'],
  },
  {
    id: 'skills',
    title: 'Escribo skills propias',
    body: 'Convierto lo que el equipo repite en skills: cómo armar un endpoint con arquitectura hexagonal en NestJS o cómo integrar las librerías internas de pagos y leads. El agente sigue nuestro patrón en vez de inventar uno.',
    tools: ['Agent Skills', 'NestJS'],
  },
  {
    id: 'sdd',
    title: 'Primero la especificación',
    body: 'Trabajo con Spec-Driven Development: antes de que el agente escriba una línea, queda escrito qué tiene que hacer y cómo se valida. El agente implementa a partir de esa especificación y yo reviso el resultado contra ella.',
    tools: ['Spec-Driven Development'],
  },
  {
    id: 'mcp',
    title: 'Lo conecto a herramientas reales',
    body: 'Configuro servidores MCP para que el agente lea diseños de Figma, colecciones de Postman, documentación actualizada y el design system, en lugar de trabajar con supuestos.',
    tools: ['MCP', 'Figma', 'Postman', 'Context7'],
  },
  {
    id: 'llm',
    title: 'Integro modelos y automatizo flujos',
    body: 'Además de usar IA para programar, he integrado APIs de modelos de lenguaje dentro de aplicaciones y armo automatizaciones con n8n.',
    tools: ['APIs de LLM', 'n8n'],
  },
  {
    id: 'review',
    title: 'Reviso todo lo que produce',
    body: 'El agente propone y yo decido. Nada se mergea sin que lo haya leído, probado y entendido.',
    tools: ['Code review'],
  },
];

/**
 * Projects are ordered as the real insurance customer journey:
 * Cotización → Aceptación → Pago → Acceso → Postventa.
 * Countries follow the CV. `role`, `summary`, `challenge` and
 * `contributions` were seeded from the descriptions and real stacks;
 * review before treating them as verified. `outcome` and `metrics` are
 * plausible estimates written as placeholders, not measured figures:
 * replace each one with his real number (or his best estimate) before
 * relying on it.
 */
export const PROJECTS: Project[] = [
  {
    id: 'seguros-falabella-landing',
    title: 'Landing Seguros Falabella',
    category: 'Seguros Falabella',
    stage: 1,
    flow: 'Cotización',
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: 'Desarrollo full-stack del sitio regional de cotización y contratación.',
    description:
      'Cotización y contratación de seguros 100% online para Chile, Perú y Colombia.',
    summary:
      'La puerta de entrada: el sitio donde el cliente elige un seguro, lo cotiza y pasa a contratarlo. Es el mismo producto para tres países, con el contenido administrable por el equipo de negocio.',
    challenge:
      'Mantener una sola base de código para tres países sin que el negocio dependa de un despliegue cada vez que cambia una campaña o un texto.',
    contributions: [
      'Aplicación en Next.js con componentes documentados en Storybook.',
      'Estado del flujo de cotización con Zustand.',
      'Servicios con NestJS y persistencia en MongoDB.',
      'Contenido y campañas administrables desde Strapi 5.',
    ],
    outcome:
      'Desde la migración a Next.js el sitio carga bastante más rápido en móvil, y las campañas ya no esperan a un desarrollador: el equipo de negocio las publica por su cuenta.',
    metrics: [
      { value: '54 → 90', label: 'en Lighthouse móvil, antes y después de pasar de Nuxt a Next.js' },
      { value: '~1 h', label: 'para publicar una campaña desde Strapi; antes dependía de un despliegue de ~3 días' },
      { value: '3 países', label: 'servidos desde una sola base de código' },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Strapi 5', 'MongoDB'],
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
    countries: ['CL'],
    status: 'live',
    role: 'Desarrollo del flujo de cotización y contratación en tiendas.',
    description:
      'Contratación digital en retail: captura de datos del cliente, pago y confirmación, sin papeles.',
    summary:
      'El flujo que se usa en tienda para contratar un seguro sin papeles ni firmas físicas: captura los datos del cliente, cobra y confirma, con tracking y el estado guardado entre pasos.',
    challenge:
      'Reemplazar la firma en papel por un proceso digital guiado que no pierda al cliente si se corta a la mitad.',
    contributions: [
      'Flujo guiado paso a paso con persistencia de estado.',
      'Componentes con Tomaco Components y Storybook.',
      'Servicios de validación y orquestación con NestJS.',
      'Textos legales y contenido administrables con Strapi.',
    ],
    outcome:
      'El papel prácticamente desapareció del mesón, cada venta toma menos tiempo y un corte a mitad de camino ya no obliga a empezar de cero.',
    metrics: [
      { value: '85%', label: 'de las contrataciones en tienda se cierran en digital' },
      { value: '−40%', label: 'en el tiempo por venta: de unos 20 minutos a unos 12' },
      { value: '7 de 10', label: 'procesos interrumpidos se retoman en el paso donde quedaron' },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
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
    countries: ['CL'],
    status: 'live',
    role: 'Desarrollo del flujo de pago de cuotas en línea.',
    description:
      'Pago en línea de cuotas atrasadas de seguros, de la consulta a la confirmación.',
    summary:
      'Para que un cliente con cuotas atrasadas las pague solo, en pocos pasos: consulta la deuda, paga y recibe la confirmación.',
    challenge:
      'Un flujo de pago donde el cliente siempre sabe en qué estado está su pago, y que se integre con el resto de los servicios.',
    contributions: [
      'Flujo con estados claros: consulta, pago y confirmación.',
      'Estado con Zustand y componentes Tomaco.',
      'Integración de servicios de pago con NestJS.',
      'Manejo de la intención de pago y su confirmación.',
    ],
    outcome:
      'Ponerse al día con una cuota dejó de depender del horario de cobranza: se resuelve en minutos desde el teléfono, y casi ningún pago queda en un estado dudoso.',
    metrics: [
      { value: '~3 min', label: 'entre consultar la deuda y ver el pago confirmado' },
      { value: '−30%', label: 'en llamadas al call center por cuotas atrasadas' },
      { value: '<1%', label: 'de los pagos termina en revisión manual por quedar sin confirmar' },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
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
    role: 'Desarrollo del acceso unificado a la zona de clientes.',
    description:
      'Un solo inicio de sesión para la zona de clientes en Chile, Perú y Colombia.',
    summary:
      'El acceso a la zona de clientes: un único inicio de sesión, el mismo para Chile, Perú y Colombia, que da paso a todos los trámites postventa.',
    challenge:
      'Centralizar el acceso de tres países en una sola autenticación, segura y consistente para todos los productos.',
    contributions: [
      'Autenticación centralizada para la zona de clientes.',
      'Acceso multi-país (CL · PE · CO).',
      'Componentes Tomaco y documentación en Storybook.',
      'Servicios de sesión con NestJS.',
    ],
    outcome:
      'Chile, Perú y Colombia entran por la misma puerta, y cada cambio al login se prueba de punta a punta antes de llegar a QA.',
    metrics: [
      { value: '3 → 1', label: 'accesos: el de cada país quedó en un solo inicio de sesión' },
      { value: '45', label: 'escenarios end-to-end en Playwright, que corren en cada pull request' },
      { value: '−40%', label: 'en bugs de acceso reportados por QA desde que existe la suite' },
    ],
    techStack: ['JavaScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
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
      'Trámites después de la contratación, para clientes y ejecutivos de Chile, Perú y Colombia.',
    summary:
      'Donde se resuelve todo lo que pasa después de contratar: una plataforma para que clientes y ejecutivos hagan sus trámites sin llamar a nadie, en tres países.',
    challenge:
      'Unificar los trámites postventa de tres países en una plataforma que crezca sin reescribirse por cada mercado.',
    contributions: [
      'Plataforma de autogestión de trámites.',
      'Front-end multi-país con React.',
      'Servicios de dominio con NestJS.',
      'Configuración por país.',
    ],
    outcome:
      'Llevar un trámite a otro país ya no es un desarrollo nuevo, es configuración. Y el panel, que arrastraba código heredado, carga en menos de la mitad del tiempo.',
    metrics: [
      { value: '2,5×', label: 'más rápida la carga inicial del panel tras optimizar el código heredado' },
      { value: '~20', label: 'trámites en autogestión, compartidos por los tres países' },
      { value: '~2 días', label: 'para habilitar en otro país un trámite que ya existe, sin código nuevo' },
    ],
    techStack: ['TypeScript', 'React', 'NestJS', 'Storybook', 'Figma', 'Tailwind CSS', 'Strapi 5', 'MongoDB'],
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
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/JuanManuelJerezBaraona',
    icon: 'github',
  },
];
