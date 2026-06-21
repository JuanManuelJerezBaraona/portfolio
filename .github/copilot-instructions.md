# Copilot instructions for this repository

Purpose
- Help future Copilot sessions understand how to build, run, and reason about this codebase quickly.

Quick commands (use npm, yarn, pnpm, or bun as you prefer)
- Development (hot reload): npm run dev  # runs `next dev`
- Build for production: npm run build     # runs `next build`
- Start production server: npm run start # runs `next start`
- Lint: npm run lint                     # runs `eslint`

Notes on linting
- The repo uses ESLint (eslint-config-next). To lint a single file or folder:
  - npx eslint src/components/Header/Header.tsx
  - npx eslint src/**/*.ts --fix

Tests
- No test scripts are defined in package.json at the moment.

High-level architecture
- Framework: Next.js (app router) under src/app. Pages and route handlers live in src/app.
- UI layer: All visual components live in src/components and are re-exported from src/components/index.ts for centralized imports.
- Static/seed data: src/constants/data.ts contains the portfolio content (NAV_LINKS, PERSONAL_INFO, PROJECTS, SOCIAL_LINKS). PROJECTS drives case-file pages and includes stage/flow/techStack metadata.
- Types: src/types defines shared TypeScript interfaces used across the app (Project, Skill, NavLink, etc.).
- State: Lightweight client state uses Zustand. See src/store/uiStore.ts (useUIStore).
- Assets: Static images and icons are served from the public/ directory (standard Next.js public folder).
- Styling: Tailwind CSS (v4) plus some Bootstrap/Tomaco mentions — Tailwind config and PostCSS are present in package.json devDependencies.
- Deployment: README references Vercel; the app follows the default Next.js deployment model.

Important repo-specific conventions
- Absolute imports use the alias `@/` (e.g., import X from '@/components'). Prefer these for consistency.
- Component barrel: Import UI components from '@/components' — the index.ts file re-exports the main components.
- Project ordering: PROJECTS in src/constants/data.ts is ordered by customer funnel `stage` (1..N). Code relies on that ordering for prev/next navigation in case-file pages.
- generateStaticParams: Dynamic case-file routes (src/app/proyectos/[id]/page.tsx) rely on getProjectById and generateStaticParams for static generation. Keep PROJECTS IDs stable if you want unchanged routes.
- Zustand store naming: stores follow `use<Name>Store` convention (e.g., useUIStore). Persisted/derived state is currently minimal — check src/store/* before adding global state.
- Types centralization: Add new shared interfaces to src/types to keep contracts consistent across components and pages.

Files and tooling Copilot should prefer when reasoning
- Page composition: src/app/** (entry points and route-level logic)
- Visual building blocks: src/components/** and src/components/index.ts
- Data source for content: src/constants/data.ts
- Types and contracts: src/types/index.ts
- Small client state: src/store/**

Missing or noted tooling
- Storybook is referenced in project metadata but no storybook config was found. If adding Storybook, place its config under .storybook/ and add npm scripts.
- No test framework configured. If tests are added, put them under src/__tests__ or alongside files and add test scripts to package.json.

AI / Assistant files found
- No existing Copilot/Claude/Cursor/Aider rules files were detected. This file is the primary assistant hint for the repo.

MCP servers
- This is a web project. Would you like an MCP server configured for Playwright (end-to-end tests) or a browser-based preview server? (yes/no)

Summary
- Created .github/copilot-instructions.md with build/lint commands, high-level architecture, and repository-specific conventions. Tell me if you want this expanded (tests, Storybook, CI, or Playwright setup).