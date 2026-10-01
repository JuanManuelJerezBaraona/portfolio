# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server at http://localhost:3000
npm run build    # production build (also runs generateStaticParams for /proyectos/[id])
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next, flat config)
```

There is no test suite. `npm run lint` is the only static check.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zustand. Path alias `@/*` → `src/*`. This is a single-page personal portfolio (Spanish, Chilean), deployed on Vercel.

## Architecture

**Content is data-driven, not hardcoded in components.** `src/constants/data.ts` is the single source of truth: `PERSONAL_INFO`, `TIMELINE`, `SKILLS`, `AI_PRACTICES`, `PROJECTS`, `NAV_LINKS`, `SOCIAL_LINKS`, plus helpers `getProjectById()` and `groupTechStack()`. Types for all of these live in `src/types/index.ts`. To change copy, skills, or projects, edit `data.ts` — components render from it. When adding fields, update the interface in `types/index.ts` first.

**Concept: a fluorescence microscope.** Juan Manuel is a biotechnology engineer who worked in a neurobiology lab before moving to software, and the site is built around that. The hero is a procedurally drawn neuron (`Header/Micrograph.tsx`) split into three emission channels that map to his work: C1 DAPI (blue) → frontend, C2 GFP (green) → backend, C3 mCherry (red) → IA. Keep that mapping consistent wherever the channel colors appear (Skills columns, the IA section, the logo mark).

**Truthfulness matters — recruiters will ask about everything on the page.** `TIMELINE` and project countries come from the CV in `public/`. `AI_PRACTICES` and the `ai` skills list only tools he confirmed using (Claude Code, GitHub Copilot, his own skills, MCP servers, LLM API integration). The project fields `role`, `summary`, `challenge` and `contributions` were seeded from descriptions and stacks and are **not independently verified**. Don't add metrics, tools or claims that aren't backed by him.

**Sections** (`src/app/page.tsx`): `Header → AboutMe (Trayectoria) → Projects → AiProfile → Skills → Contact`.

- `Projects` renders `ProjectViewer` (client; tablist of the five journey stages + the selected screenshot under a `Loupe`) on `lg+`, and a plain stacked list below `lg`. `PROJECTS` order is the customer journey (Cotización → Aceptación → Pago → Acceso → Postventa); numbering and prev/next rely on it.
- `src/app/proyectos/[id]/page.tsx` statically generates one case file per project via `generateStaticParams`, rendered by `src/components/case/CaseFile.tsx`.

**Layout (`src/app/layout.tsx`)** is just `Navbar`, `main` and `Footer` on a flat black background. It also injects an inline `<head>` script that forces `scrollRestoration='manual'` and scrolls to top on load (the `ScrollReset` component reinforces this), plus a `<noscript>` fallback that un-hides `.reveal` elements.

**Components** are organized one folder per section under `src/components/`, each with a barrel `index.ts`; the top-level `src/components/index.ts` re-exports the page sections. Shared pieces live in `src/components/ui/` (`Reveal`, `SectionHeading`, `Loupe`, `ProjectMeta`, `ScrollReset`). Most components are server components; only `Navbar`, `ProjectViewer`, `Loupe` and `Reveal` use `'use client'`. The micrograph is server-rendered from a seeded PRNG and ships no JS; its channel toggles are checkboxes wired with CSS `:has()`.

**State:** `src/store/uiStore.ts` (Zustand) holds only UI state — mobile menu open, active section. No data fetching anywhere; everything is static.

## Styling

Tailwind v4 with a CSS-first theme in `src/app/globals.css` — no `tailwind.config`. The `@theme inline` block maps design tokens to utility colors. Use the semantic token names rather than raw hex:
- Surfaces: `void` (page), `stage`, `stage-2`; borders: `line`, `line-strong`
- Text: `text`, `muted`
- Channels: `dapi` (blue, frontend), `gfp` (green, backend and "live/selected"), `mcherry` (red, IA)
- Fonts: Archivo (variable, `font-sans`/`font-display`) and Martian Mono (`font-mono`). Headlines use Archivo's width axis: `h1–h3` and `.wide` run at `wdth 118`, `.display` at `wdth 125`. `.meta` is the small mono readout used for labels and metadata.

Base and component styles in `globals.css` live inside `@layer base` / `@layer components` so Tailwind utilities can override them — keep new rules inside a layer, since unlayered CSS beats every utility in Tailwind v4.

Avoid the generic "AI portfolio" look the redesign moved away from: no gradient text, glassmorphism cards, corner brackets, scanlines, marquees, pinging status dots or `// eyebrow` comments. Motion is deliberately limited to the hero's focus pull, content coming into focus on scroll (`.reveal`), the loupe and the calcium flashes in the micrograph.

## SEO / OG

OG and Twitter images are generated by `src/app/opengraph-image.tsx` / `twitter-image.tsx`, rendering `src/components/og/OgShareImage.tsx` with the micrograph exported as a standalone SVG (`micrographSvg()`). Fonts are fetched from Google Fonts as static TTF instances at build time and fall back to the default sans if the network fails. `metadataBase` comes from `NEXT_PUBLIC_SITE_URL` (falls back to the Vercel URL). Per-project metadata is built in the `[id]` route's `generateMetadata`.
