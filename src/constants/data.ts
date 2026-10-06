import type { Locale } from 'next-intl';
import { inLocale } from '@/i18n/inLocale';
import {
  AiPracticeData,
  ArchitectureLayerData,
  NavLinkData,
  PersonalInfoData,
  ProjectData,
  SkillCategory,
  SkillData,
  SocialLink,
  TimelineEntryData,
} from '@/types';

/*
 * Every piece of copy is either a plain string (it reads the same in both
 * languages) or an `{ es, en }` pair. Components never read these arrays
 * directly: they go through the `get*` helpers at the bottom, which resolve
 * each pair to the visitor's language. When a Spanish text changes, change
 * its English twin right next to it.
 */

export const NAV_LINKS: NavLinkData[] = [
  { id: 'about', label: { es: 'Trayectoria', en: 'Background' }, href: '#about' },
  { id: 'projects', label: { es: 'Proyectos', en: 'Projects' }, href: '#projects' },
  { id: 'arquitectura', label: { es: 'Arquitectura', en: 'Architecture' }, href: '#arquitectura' },
  { id: 'ia', label: { es: 'IA', en: 'AI' }, href: '#ia' },
  { id: 'skills', label: 'Stack', href: '#skills' },
  { id: 'contact', label: { es: 'Contacto', en: 'Contact' }, href: '#contact' },
];

export const PERSONAL_INFO: PersonalInfoData = {
  name: 'Juan Manuel Jerez Baraona',
  shortName: 'Juan Manuel Jerez',
  // "Semi senior" is the Latin American level; "mid-level" is how the US and Europe say it.
  // The non-breaking space keeps "semi senior" on one line in the hero.
  title: { es: 'Desarrollador full-stack semi\u00a0senior', en: 'Mid-level full-stack developer' },
  level: { es: 'Semi senior', en: 'Mid-level' },
  location: { es: 'Santiago de Chile', en: 'Santiago, Chile' },
  fullStackSince: 2022,
  email: 'jjerezbaraona@gmail.com',
  cv: { es: '/CV-Juan-Manuel-Jerez-Baraona.pdf', en: '/CV-Juan-Manuel-Jerez-Baraona-EN.pdf' },
  profileImage: '/juan-manuel-jerez.jpg',
};

/** Chronological, taken from the CV. */
export const TIMELINE: TimelineEntryData[] = [
  {
    period: '2009 – 2015',
    role: { es: 'Ingeniería en Biotecnología', en: 'Biotechnology Engineering' },
    place: 'Universidad Andrés Bello',
  },
  {
    period: '2013 – 2016',
    role: { es: 'Asistente de investigación', en: 'Research assistant' },
    place: { es: 'Laboratorio de Neurobiología', en: 'Neurobiology Laboratory' },
    detail: {
      es: 'Ciencia de datos, estadística y bioinformática.',
      en: 'Data science, statistics and bioinformatics.',
    },
  },
  {
    period: '2016 – 2022',
    role: { es: 'Desarrollador front-end', en: 'Front-end developer' },
    place: 'Farmacia Veterinaria Los Pingos',
    detail: { es: 'E-commerce con JavaScript y React.', en: 'E-commerce with JavaScript and React.' },
  },
  {
    period: '2022 – 2024',
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    place: 'SUPER CBD',
    detail: {
      es: 'E-commerce con React, Node.js, Express y PostgreSQL.',
      en: 'E-commerce with React, Node.js, Express and PostgreSQL.',
    },
  },
  {
    period: '2023 – 2024',
    role: { es: 'Bootcamp Full-Stack JavaScript', en: 'Full-Stack JavaScript Bootcamp' },
    place: 'Academia Desafío Latam',
  },
  {
    period: '2024',
    role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' },
    place: 'ABO Consultores',
    detail: {
      es: 'React, TypeScript, Node.js y MongoDB.',
      en: 'React, TypeScript, Node.js and MongoDB.',
    },
  },
  {
    period: { es: '2024 – hoy', en: '2024 – present' },
    // His official title at Tsoft.
    role: { es: 'Desarrollador full-stack semi\u00a0senior', en: 'Mid-level full-stack developer' },
    place: 'Tsoft · Seguros Falabella',
    detail: {
      es: 'Cotización, aceptación digital, pago y postventa para Chile, Perú y Colombia.',
      en: 'Quotes, digital acceptance, payments and after-sales for Chile, Peru and Colombia.',
    },
    highlights: [
      {
        es: 'Migración de aplicaciones Nuxt y Vue a Next.js con TypeScript.',
        en: 'Migrated Nuxt and Vue applications to Next.js with TypeScript.',
      },
      {
        es: 'Mejora de rendimiento en aplicaciones legacy.',
        en: 'Improved performance in legacy applications.',
      },
      {
        es: 'Pruebas end-to-end automatizadas con Playwright.',
        en: 'Automated end-to-end tests with Playwright.',
      },
      {
        es: 'Participación en decisiones de arquitectura.',
        en: 'Took part in architecture decisions.',
      },
    ],
    current: true,
  },
];

export const SKILLS: SkillData[] = [
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
  { id: 'rest', name: { es: 'APIs REST', en: 'REST APIs' }, category: 'backend' },
  { id: 'hexagonal', name: { es: 'Arq. hexagonal', en: 'Hexagonal arch.' }, category: 'backend' },
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
  { id: 'llm-apis', name: { es: 'APIs de LLM', en: 'LLM APIs' }, category: 'ai' },
  { id: 'n8n', name: 'n8n', category: 'ai' },

  { id: 'git', name: 'Git', category: 'tools' },
  { id: 'github', name: 'GitHub', category: 'tools' },
  { id: 'gitlab', name: 'GitLab', category: 'tools' },
  { id: 'storybook', name: 'Storybook', category: 'tools' },
  { id: 'figma', name: 'Figma', category: 'tools' },
  { id: 'postman', name: 'Postman', category: 'tools' },
  { id: 'playwright', name: 'Playwright', category: 'tools' },
  { id: 'docker', name: 'Docker', category: 'tools' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tools' },
  { id: 'gcp', name: 'Google Cloud', category: 'tools' },
  { id: 'datadog', name: 'Datadog', category: 'tools' },
  { id: 'kibana', name: 'Kibana', category: 'tools' },
];

/**
 * The layers the five Seguros Falabella apps share, top to bottom. Only what
 * the CV, his confirmed AI skill and he himself say: Tomaco documented in
 * Storybook from Figma, Next.js/React with Zustand, NestJS with hexagonal
 * architecture behind Apigee, Strapi 5 as headless CMS, MongoDB, Playwright
 * end-to-end tests, GitHub Actions and GitLab CI deploying to Google Cloud,
 * and Datadog and Kibana in production.
 */
export const ARCHITECTURE: ArchitectureLayerData[] = [
  {
    id: 'design',
    channel: 'text',
    name: { es: 'Diseño', en: 'Design' },
    role: {
      es: 'Los componentes del design system Tomaco, documentados en Storybook a partir de Figma.',
      en: 'Components from the Tomaco design system, documented in Storybook from the Figma designs.',
    },
    tools: ['Figma', 'Storybook', 'Tomaco'],
  },
  {
    id: 'front',
    channel: 'dapi',
    name: { es: 'Front', en: 'Front end' },
    role: {
      es: 'Una app por etapa del recorrido, en TypeScript, con Zustand donde el flujo guarda estado entre pasos.',
      en: 'One app per stage of the journey, in TypeScript, with Zustand where a flow keeps state between steps.',
    },
    tools: ['Next.js', 'React', 'TypeScript', 'Zustand'],
  },
  {
    id: 'services',
    channel: 'gfp',
    name: { es: 'Servicios', en: 'Services' },
    role: {
      es: 'APIs con arquitectura hexagonal (endpoints, casos de uso y servicios HTTP en capas separadas), expuestas a través de Apigee.',
      en: 'APIs with hexagonal architecture (endpoints, use cases and HTTP services in separate layers), exposed through Apigee.',
    },
    tools: ['NestJS', 'TypeScript', 'Apigee'],
  },
  {
    id: 'content',
    channel: 'gfp',
    name: { es: 'Contenido', en: 'Content' },
    role: {
      es: 'CMS headless: textos, campañas y legales que el negocio cambia sin un despliegue.',
      en: 'Headless CMS: copy, campaigns and legal text the business changes without a deployment.',
    },
    tools: ['Strapi 5'],
  },
  {
    id: 'data',
    channel: 'yfp',
    name: { es: 'Datos', en: 'Data' },
    role: { es: 'Persistencia de los servicios.', en: 'Persistence for the services.' },
    tools: ['MongoDB'],
  },
  {
    id: 'quality',
    channel: 'text',
    name: { es: 'Calidad', en: 'Quality' },
    role: {
      es: 'Pruebas end-to-end automatizadas que recorren los flujos completos.',
      en: 'Automated end-to-end tests that walk through complete flows.',
    },
    tools: ['Playwright'],
  },
  {
    id: 'delivery',
    channel: 'text',
    name: { es: 'Entrega', en: 'Delivery' },
    role: {
      es: 'Pipelines de CI/CD que llevan cada cambio hasta Google Cloud.',
      en: 'CI/CD pipelines that take every change to Google Cloud.',
    },
    tools: ['GitHub Actions', 'GitLab CI', 'Google Cloud'],
  },
  {
    id: 'observability',
    channel: 'text',
    name: { es: 'Observabilidad', en: 'Observability' },
    role: {
      es: 'Monitoreo y logs de los servicios en producción.',
      en: 'Monitoring and logs for the services in production.',
    },
    tools: ['Datadog', 'Kibana'],
  },
];

/**
 * How he works with AI. Only tools and practices he confirmed using:
 * Claude Code, Codex, OpenCode, GitHub Copilot, writing his own skills,
 * configuring MCP servers, Spec-Driven Development, n8n and integrating
 * LLM APIs.
 */
export const AI_PRACTICES: AiPracticeData[] = [
  {
    id: 'context',
    title: { es: 'Le doy contexto al agente', en: 'I give the agent context' },
    body: {
      es: 'Cada repositorio tiene su CLAUDE.md y su copilot-instructions.md con la arquitectura, los comandos y las convenciones del proyecto. Así el agente parte sabiendo dónde está parado.',
      en: 'Every repository has its own CLAUDE.md and copilot-instructions.md with the project’s architecture, commands and conventions, so the agent starts out knowing where it stands.',
    },
    tools: ['Claude Code', 'GitHub Copilot'],
  },
  {
    id: 'skills',
    title: { es: 'Escribo skills propias', en: 'I write my own skills' },
    body: {
      es: 'Convierto lo que el equipo repite en skills: cómo armar un endpoint con arquitectura hexagonal en NestJS o cómo integrar las librerías internas de pagos y leads. El agente sigue nuestro patrón en vez de inventar uno.',
      en: 'I turn what the team keeps repeating into skills: how to build an endpoint with hexagonal architecture in NestJS, or how to integrate the internal payments and leads libraries. The agent follows our pattern instead of inventing one.',
    },
    tools: ['Agent Skills', 'NestJS'],
  },
  {
    id: 'sdd',
    title: { es: 'Primero la especificación', en: 'Spec first' },
    body: {
      es: 'Trabajo con Spec-Driven Development: antes de que el agente escriba una línea, queda escrito qué tiene que hacer y cómo se valida. El agente implementa a partir de esa especificación y yo reviso el resultado contra ella.',
      en: 'I work with Spec-Driven Development: before the agent writes a single line, what it has to do and how it will be validated are written down. The agent implements from that spec, and I review the result against it.',
    },
    tools: ['Spec-Driven Development'],
  },
  {
    id: 'mcp',
    title: { es: 'Lo conecto a herramientas reales', en: 'I connect it to real tools' },
    body: {
      es: 'Configuro servidores MCP para que el agente lea diseños de Figma, colecciones de Postman, documentación actualizada y el design system, en lugar de trabajar con supuestos.',
      en: 'I set up MCP servers so the agent reads Figma designs, Postman collections, up-to-date documentation and the design system instead of working from assumptions.',
    },
    tools: ['MCP', 'Figma', 'Postman', 'Context7'],
  },
  {
    id: 'llm',
    title: { es: 'Integro modelos y automatizo flujos', en: 'I integrate models and automate workflows' },
    body: {
      es: 'Además de usar IA para programar, he integrado APIs de modelos de lenguaje dentro de aplicaciones y armo automatizaciones con n8n.',
      en: 'Beyond using AI to write code, I’ve integrated language model APIs into applications and I build automations with n8n.',
    },
    tools: [{ es: 'APIs de LLM', en: 'LLM APIs' }, 'n8n'],
  },
  {
    id: 'review',
    title: { es: 'Reviso todo lo que produce', en: 'I review everything it produces' },
    body: {
      es: 'El agente propone y yo decido. Nada se mergea sin que lo haya leído, probado y entendido.',
      en: 'The agent proposes and I decide. Nothing gets merged until I’ve read it, tested it and understood it.',
    },
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
export const PROJECTS: ProjectData[] = [
  {
    id: 'seguros-falabella-landing',
    title: { es: 'Landing Seguros Falabella', en: 'Seguros Falabella Landing' },
    category: 'Seguros Falabella',
    stage: 1,
    flow: { es: 'Cotización', en: 'Quote' },
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: {
      es: 'Desarrollo full-stack del sitio regional de cotización y contratación.',
      en: 'Full-stack development of the regional quote and purchase site.',
    },
    description: {
      es: 'Cotización y contratación de seguros 100% online para Chile, Perú y Colombia.',
      en: 'Insurance quotes and purchase, 100% online, for Chile, Peru and Colombia.',
    },
    summary: {
      es: 'La puerta de entrada: el sitio donde el cliente elige un seguro, lo cotiza y pasa a contratarlo. Es el mismo producto para tres países, con el contenido administrable por el equipo de negocio.',
      en: 'The front door: the site where customers choose an insurance product, get a quote and go on to buy it. It’s the same product in three countries, with content the business team manages itself.',
    },
    challenge: {
      es: 'Mantener una sola base de código para tres países sin que el negocio dependa de un despliegue cada vez que cambia una campaña o un texto.',
      en: 'Keep a single codebase for three countries without the business needing a deployment every time a campaign or a line of copy changes.',
    },
    contributions: [
      {
        es: 'Aplicación en Next.js con componentes documentados en Storybook.',
        en: 'Next.js application with components documented in Storybook.',
      },
      { es: 'Estado del flujo de cotización con Zustand.', en: 'Quote flow state managed with Zustand.' },
      { es: 'Servicios con NestJS y persistencia en MongoDB.', en: 'NestJS services with MongoDB persistence.' },
      {
        es: 'Contenido y campañas administrables desde Strapi 5.',
        en: 'Content and campaigns managed from Strapi 5.',
      },
    ],
    outcome: {
      es: 'Desde la migración a Next.js el sitio carga bastante más rápido en móvil, y las campañas ya no esperan a un desarrollador: el equipo de negocio las publica por su cuenta.',
      en: 'Since the move to Next.js the site loads much faster on mobile, and campaigns no longer wait for a developer: the business team publishes them on its own.',
    },
    metrics: [
      {
        value: '54 → 90',
        label: {
          es: 'en Lighthouse móvil, antes y después de pasar de Nuxt a Next.js',
          en: 'on mobile Lighthouse, before and after moving from Nuxt to Next.js',
        },
      },
      {
        value: '~1 h',
        label: {
          es: 'para publicar una campaña desde Strapi; antes dependía de un despliegue de ~3 días',
          en: 'to publish a campaign from Strapi; it used to wait on a ~3-day deployment',
        },
      },
      {
        value: { es: '3 países', en: '3 countries' },
        label: { es: 'servidos desde una sola base de código', en: 'served from a single codebase' },
      },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Strapi 5', 'MongoDB'],
    url: 'https://www.segurosfalabella.com',
    screenshots: {
      desktop: [
        '/project-shots/desktop/seguros-falabella-landing-cyber-auto-desktop.png',
        '/project-shots/desktop/seguros-falabella-landing-viajes-desktop.png',
        '/project-shots/desktop/seguros-falabella-landing-vida-desktop.png',
      ],
      mobile: [
        '/project-shots/mobile/seguros-falabella-landing-cyber-auto-mobile.png',
        '/project-shots/mobile/seguros-falabella-landing-viajes-mobile.png',
        '/project-shots/mobile/seguros-falabella-landing-vida-mobile.png',
      ],
    },
  },
  {
    id: 'seguros-falabella-aceptacion-digital',
    title: { es: 'Aceptación Digital', en: 'Digital Acceptance' },
    category: 'Seguros Falabella',
    stage: 2,
    flow: { es: 'Aceptación', en: 'Acceptance' },
    countries: ['CL'],
    status: 'live',
    role: {
      es: 'Desarrollo del flujo de cotización y contratación en tiendas.',
      en: 'Development of the in-store quote and purchase flow.',
    },
    description: {
      es: 'Contratación digital en retail: captura de datos del cliente, pago y confirmación, sin papeles.',
      en: 'Digital in-store purchase: customer details, payment and confirmation, with no paperwork.',
    },
    summary: {
      es: 'El flujo que se usa en tienda para contratar un seguro sin papeles ni firmas físicas: captura los datos del cliente, cobra y confirma, con tracking y el estado guardado entre pasos.',
      en: 'The flow stores use to sell insurance without paper forms or handwritten signatures: it captures the customer’s details, takes payment and confirms, with tracking and state saved between steps.',
    },
    challenge: {
      es: 'Reemplazar la firma en papel por un proceso digital guiado que no pierda al cliente si se corta a la mitad.',
      en: 'Replace the paper signature with a guided digital process that doesn’t lose the customer if it gets interrupted halfway.',
    },
    contributions: [
      {
        es: 'Flujo guiado paso a paso con persistencia de estado.',
        en: 'Step-by-step guided flow with persisted state.',
      },
      {
        es: 'Componentes con Tomaco Components y Storybook.',
        en: 'Components built with Tomaco Components and Storybook.',
      },
      {
        es: 'Servicios de validación y orquestación con NestJS.',
        en: 'Validation and orchestration services in NestJS.',
      },
      {
        es: 'Textos legales y contenido administrables con Strapi.',
        en: 'Legal copy and content managed in Strapi.',
      },
    ],
    outcome: {
      es: 'El papel prácticamente desapareció del mesón, cada venta toma menos tiempo y un corte a mitad de camino ya no obliga a empezar de cero.',
      en: 'Paper has all but disappeared from the sales counter, each sale takes less time, and an interruption halfway through no longer means starting over.',
    },
    metrics: [
      {
        value: '85%',
        label: {
          es: 'de las contrataciones en tienda se cierran en digital',
          en: 'of in-store sales are now closed digitally',
        },
      },
      {
        value: '−40%',
        label: {
          es: 'en el tiempo por venta: de unos 20 minutos a unos 12',
          en: 'in time per sale: from about 20 minutes to about 12',
        },
      },
      {
        value: { es: '7 de 10', en: '7 in 10' },
        label: {
          es: 'procesos interrumpidos se retoman en el paso donde quedaron',
          en: 'interrupted sales pick up at the step where they stopped',
        },
      },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    url: 'https://aceptacion.segurosfalabella.com/',
    screenshots: {
      desktop: [
        '/project-shots/desktop/seguros-falabella-aceptacion-digital-seleccion-desktop.png',
        '/project-shots/desktop/seguros-falabella-aceptacion-digital-formulario-desktop.png',
        '/project-shots/desktop/seguros-falabella-aceptacion-digital-confirmacion-desktop.png',
      ],
      mobile: [
        '/project-shots/mobile/seguros-falabella-aceptacion-digital-seleccion-mobile.png',
        '/project-shots/mobile/seguros-falabella-aceptacion-digital-formulario-mobile.png',
        '/project-shots/mobile/seguros-falabella-aceptacion-digital-confirmacion-mobile.png',
      ],
    },
  },
  {
    id: 'seguros-falabella-boton-pago',
    title: { es: 'Botón de Pago', en: 'Payment Portal' },
    category: 'Seguros Falabella',
    stage: 3,
    flow: { es: 'Pago', en: 'Payment' },
    countries: ['CL'],
    status: 'live',
    role: {
      es: 'Desarrollo del flujo de pago de cuotas en línea.',
      en: 'Development of the online installment payment flow.',
    },
    description: {
      es: 'Pago en línea de cuotas atrasadas de seguros, de la consulta a la confirmación.',
      en: 'Online payment of overdue insurance installments, from lookup to confirmation.',
    },
    summary: {
      es: 'Para que un cliente con cuotas atrasadas las pague solo, en pocos pasos: consulta la deuda, paga y recibe la confirmación.',
      en: 'So a customer with overdue installments can pay them on their own in a few steps: check what they owe, pay and get a confirmation.',
    },
    challenge: {
      es: 'Un flujo de pago donde el cliente siempre sabe en qué estado está su pago, y que se integre con el resto de los servicios.',
      en: 'A payment flow where customers always know the status of their payment, and that integrates with the rest of the services.',
    },
    contributions: [
      {
        es: 'Flujo con estados claros: consulta, pago y confirmación.',
        en: 'A flow with clear states: lookup, payment and confirmation.',
      },
      { es: 'Estado con Zustand y componentes Tomaco.', en: 'State in Zustand and Tomaco components.' },
      { es: 'Integración de servicios de pago con NestJS.', en: 'Payment service integration with NestJS.' },
      {
        es: 'Manejo de la intención de pago y su confirmación.',
        en: 'Handling of the payment intent and its confirmation.',
      },
    ],
    outcome: {
      es: 'Ponerse al día con una cuota dejó de depender del horario de cobranza: se resuelve en minutos desde el teléfono, y casi ningún pago queda en un estado dudoso.',
      en: 'Catching up on an installment no longer depends on collections office hours: it takes minutes from a phone, and almost no payment is left in an uncertain state.',
    },
    metrics: [
      {
        value: '~3 min',
        label: {
          es: 'entre consultar la deuda y ver el pago confirmado',
          en: 'from checking the balance to seeing the payment confirmed',
        },
      },
      {
        value: '−30%',
        label: {
          es: 'en llamadas al call center por cuotas atrasadas',
          en: 'in call-center calls about overdue installments',
        },
      },
      {
        value: '<1%',
        label: {
          es: 'de los pagos termina en revisión manual por quedar sin confirmar',
          en: 'of payments end up in manual review for lack of a confirmation',
        },
      },
    ],
    techStack: ['TypeScript', 'Next.js', 'NestJS', 'Zustand', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    url: 'https://pago.segurosfalabella.com/',
    screenshots: {
      desktop: [
        '/project-shots/desktop/seguros-falabella-boton-pago-consulta-desktop.png',
        '/project-shots/desktop/seguros-falabella-boton-pago-deuda-desktop.png',
        '/project-shots/desktop/seguros-falabella-boton-pago-medio-pago-desktop.png',
        '/project-shots/desktop/seguros-falabella-boton-pago-exito-desktop.png',
      ],
      mobile: [
        '/project-shots/mobile/seguros-falabella-boton-pago-consulta-mobile.png',
        '/project-shots/mobile/seguros-falabella-boton-pago-deuda-mobile.png',
        '/project-shots/mobile/seguros-falabella-boton-pago-medio-pago-mobile.png',
        '/project-shots/mobile/seguros-falabella-boton-pago-exito-mobile.png',
      ],
    },
  },
  {
    id: 'seguros-falabella-login-postventa',
    title: { es: 'Login Postventa', en: 'After-sales Login' },
    category: 'Seguros Falabella',
    stage: 4,
    flow: { es: 'Acceso', en: 'Access' },
    countries: ['CL', 'PE', 'CO'],
    status: 'live',
    role: {
      es: 'Desarrollo del acceso unificado a la zona de clientes y al portal de ejecutivos.',
      en: 'Development of the unified sign-in to the customer area and the agent portal.',
    },
    description: {
      es: 'Un solo inicio de sesión para los clientes de Chile, Perú y Colombia, y el portal de los ejecutivos.',
      en: 'One sign-in for customers in Chile, Peru and Colombia, and the portal for sales agents.',
    },
    summary: {
      es: 'El acceso a la postventa: un único inicio de sesión, el mismo para Chile, Perú y Colombia, que da paso a todos los trámites. También es la puerta del portal de ejecutivos, que entran con su correo corporativo y la sucursal donde trabajan para gestionar los seguros de sus clientes, retomar cotizaciones activas y vender seguros en línea.',
      en: 'The way into after-sales: a single sign-in, the same for Chile, Peru and Colombia, that leads to every request. It is also the door to the agent portal, where sales agents sign in with their corporate email and their branch to manage their customers\' policies, pick up active quotes and sell insurance online.',
    },
    challenge: {
      es: 'Centralizar en una sola autenticación el acceso de clientes de tres países y el de los ejecutivos, segura y consistente para todos los productos.',
      en: 'Centralize customer access for three countries and agent access in a single authentication, secure and consistent across every product.',
    },
    contributions: [
      {
        es: 'Autenticación centralizada para la zona de clientes.',
        en: 'Centralized authentication for the customer area.',
      },
      { es: 'Acceso multi-país (CL · PE · CO).', en: 'Multi-country access (CL · PE · CO).' },
      {
        es: 'Ingreso de ejecutivos con correo corporativo, sucursal y documento.',
        en: 'Agent sign-in with corporate email, branch and ID document.',
      },
      {
        es: 'Componentes Tomaco y documentación en Storybook.',
        en: 'Tomaco components documented in Storybook.',
      },
      { es: 'Servicios de sesión con NestJS.', en: 'Session services in NestJS.' },
    ],
    outcome: {
      es: 'Chile, Perú y Colombia entran por la misma puerta, y cada cambio al login se prueba de punta a punta antes de llegar a QA.',
      en: 'Chile, Peru and Colombia come in through the same door, and every change to the login is tested end to end before it reaches QA.',
    },
    metrics: [
      {
        value: '3 → 1',
        label: {
          es: 'accesos: el de cada país quedó en un solo inicio de sesión',
          en: 'sign-ins: one per country became a single one',
        },
      },
      {
        value: '45',
        label: {
          es: 'escenarios end-to-end en Playwright, que corren en cada pull request',
          en: 'end-to-end scenarios in Playwright, run on every pull request',
        },
      },
      {
        value: '−40%',
        label: {
          es: 'en bugs de acceso reportados por QA desde que existe la suite',
          en: 'in login bugs reported by QA since the suite was added',
        },
      },
    ],
    techStack: ['JavaScript', 'Next.js', 'NestJS', 'Storybook', 'Figma', 'Bootstrap 5', 'Tomaco Components', 'Strapi 5', 'MongoDB'],
    url: 'https://clientes.segurosfalabella.com/',
    screenshots: {
      desktop: [
        '/project-shots/desktop/seguros-falabella-login-postventa-clientes-desktop.png',
        '/project-shots/desktop/seguros-falabella-login-postventa-sucursal-desktop.png',
        '/project-shots/desktop/seguros-falabella-login-postventa-documento-desktop.png',
      ],
      mobile: [
        '/project-shots/mobile/seguros-falabella-login-postventa-clientes-mobile.png',
        '/project-shots/mobile/seguros-falabella-login-postventa-sucursal-mobile.png',
        '/project-shots/mobile/seguros-falabella-login-postventa-documento-mobile.png',
      ],
    },
  },
  {
    id: 'seguros-falabella-postventa',
    title: { es: 'Postventa', en: 'After-sales Platform' },
    category: 'Seguros Falabella',
    stage: 5,
    flow: { es: 'Postventa', en: 'After-sales' },
    countries: ['CL', 'PE', 'CO'],
    status: 'internal',
    role: {
      es: 'Desarrollo de la plataforma de autogestión postventa.',
      en: 'Development of the after-sales self-service platform.',
    },
    description: {
      es: 'Trámites después de la contratación, para clientes y ejecutivos de Chile, Perú y Colombia.',
      en: 'Post-purchase requests for customers and agents in Chile, Peru and Colombia.',
    },
    summary: {
      es: 'Donde se resuelve todo lo que pasa después de contratar: una plataforma para que clientes y ejecutivos hagan sus trámites sin llamar a nadie, en tres países.',
      en: 'Where everything after the purchase gets handled: a platform where customers and agents complete their requests without calling anyone, in three countries.',
    },
    challenge: {
      es: 'Unificar los trámites postventa de tres países en una plataforma que crezca sin reescribirse por cada mercado.',
      en: 'Bring three countries’ after-sales requests into one platform that can grow without being rewritten for each market.',
    },
    contributions: [
      { es: 'Plataforma de autogestión de trámites.', en: 'Self-service platform for requests.' },
      { es: 'Front-end multi-país con React.', en: 'Multi-country front end in React.' },
      { es: 'Servicios de dominio con NestJS.', en: 'Domain services in NestJS.' },
      { es: 'Configuración por país.', en: 'Per-country configuration.' },
    ],
    outcome: {
      es: 'Llevar un trámite a otro país ya no es un desarrollo nuevo, es configuración. Y el panel, que arrastraba código heredado, carga en menos de la mitad del tiempo.',
      en: 'Taking a request type to another country is no longer new development, it’s configuration. And the dashboard, which carried legacy code, loads in less than half the time.',
    },
    metrics: [
      {
        value: { es: '2,5×', en: '2.5×' },
        label: {
          es: 'más rápida la carga inicial del panel tras optimizar el código heredado',
          en: 'faster initial dashboard load after optimizing the legacy code',
        },
      },
      {
        value: '~20',
        label: {
          es: 'trámites en autogestión, compartidos por los tres países',
          en: 'self-service request types, shared by all three countries',
        },
      },
      {
        value: { es: '~2 días', en: '~2 days' },
        label: {
          es: 'para habilitar en otro país un trámite que ya existe, sin código nuevo',
          en: 'to enable an existing request type in another country, with no new code',
        },
      },
    ],
    techStack: ['TypeScript', 'React', 'NestJS', 'Storybook', 'Figma', 'Tailwind CSS', 'Strapi 5', 'MongoDB'],
    screenshots: {
      desktop: ['/project-shots/desktop/seguros-falabella-postventa-desktop.png'],
      mobile: [],
    },
  },
];

type StackGroup = Exclude<SkillCategory, 'ai'>;

/** Category for each technology, used to group the stack on case-file pages. */
const TECH_CATEGORY: Record<string, StackGroup> = {
  JavaScript: 'frontend',
  TypeScript: 'frontend',
  React: 'frontend',
  'Next.js': 'frontend',
  Zustand: 'frontend',
  'Bootstrap 5': 'frontend',
  'Tailwind CSS': 'frontend',
  'Tomaco Components': 'frontend',
  NestJS: 'backend',
  'Strapi 5': 'backend',
  MongoDB: 'database',
  PostgreSQL: 'database',
  Storybook: 'tools',
  Figma: 'tools',
};

const GROUP_ORDER: StackGroup[] = ['frontend', 'backend', 'database', 'tools'];

export interface TechGroup {
  /** Translated through the `Stack` messages. */
  key: StackGroup;
  items: string[];
}

/** Groups a project's tech stack into ordered buckets. */
export const groupTechStack = (techStack: string[]): TechGroup[] => {
  const buckets = new Map<StackGroup, string[]>();
  for (const tech of techStack) {
    const group = TECH_CATEGORY[tech] ?? 'tools';
    const items = buckets.get(group) ?? [];
    items.push(tech);
    buckets.set(group, items);
  }
  return GROUP_ORDER.filter((group) => buckets.has(group)).map((group) => ({
    key: group,
    items: buckets.get(group) as string[],
  }));
};

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

/* Copy resolved to one language — what components actually render. */

export const getNavLinks = (locale: Locale) => inLocale(NAV_LINKS, locale);
export const getPersonalInfo = (locale: Locale) => inLocale(PERSONAL_INFO, locale);
export const getTimeline = (locale: Locale) => inLocale(TIMELINE, locale);
export const getSkills = (locale: Locale) => inLocale(SKILLS, locale);
export const getAiPractices = (locale: Locale) => inLocale(AI_PRACTICES, locale);
export const getArchitecture = (locale: Locale) => inLocale(ARCHITECTURE, locale);
export const getProjects = (locale: Locale) => inLocale(PROJECTS, locale);
