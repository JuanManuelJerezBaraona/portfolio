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

**Content is data-driven, not hardcoded in components.** `src/constants/data.ts` is the single source of truth: `PERSONAL_INFO`, `SKILLS`, `PROJECTS`, `NAV_LINKS`, `SOCIAL_LINKS`, plus helpers `getProjectById()` and `groupTechStack()`. Types for all of these live in `src/types/index.ts`. To change copy, skills, or projects, edit `data.ts` — components render from it. When adding fields, update the interface in `types/index.ts` first.

**The portfolio is framed as an insurance "funnel / operations console."** `PROJECTS` are ordered as a real customer journey (Cotización → Aceptación → Pago → Acceso → Postventa), driven by each project's `stage`, `flow`, `countries`, `status`, and `role` fields. Note the comment at the top of `PROJECTS`: the case-file detail fields (`role`, `contributions`, `highlights`, `challenge`) were seeded from existing descriptions and the bio — they are **not independently verified**, so don't treat them as ground truth when editing.

**Two routes:**
- `src/app/page.tsx` — the single landing page. Composes section components in order: `Header → Ticker → AboutMe → Projects → Skills → Contact`.
- `src/app/proyectos/[id]/page.tsx` — statically generated case-file pages (one per project via `generateStaticParams`), rendered by `src/components/case/CaseFile.tsx` with prev/next navigation derived from `PROJECTS` order.

**Layout (`src/app/layout.tsx`)** wraps everything with the persistent background and chrome: `app-bg` → `grid-bg` → `CircuitBackground` (animated generative PCB canvas) → `ScrollMotionGuard` → `Navbar`, with page content in a `z-10` layer. It also injects an inline `<head>` script that forces `scrollRestoration='manual'` and scrolls to top on load (the `ScrollReset` component reinforces this), plus a `<noscript>` fallback that un-hides `.reveal` elements.

**Components** are organized one folder per section under `src/components/`, each with a barrel `index.ts`; the top-level `src/components/index.ts` re-exports the page sections. Shared primitives live in `src/components/ui/` (`Reveal`, `Ticker`, `Hud`, `CircuitBackground`, `ScrollReset`, `ScrollMotionGuard`). Most components are server components; only the interactive ones (`Navbar`, carousel, reveal/scroll utilities) use `'use client'`.

**State:** `src/store/uiStore.ts` (Zustand) holds only UI state — mobile menu open, active section, expanded accordion. No data fetching anywhere; everything is static.

## Styling

Tailwind v4 with a CSS-first theme in `src/app/globals.css` — no `tailwind.config`. The `@theme inline` block maps design tokens to utility colors. Use the semantic token names rather than raw hex:
- Surfaces: `ink`, `ink-2`, `ink-3` (dark backgrounds)
- Accents: `neon` (pink `#ff2e88`), `neon-soft`, `cyan`, `lime`
- Text: `text`, `muted`; borders: `line`
- Fonts: `font-display` (Chakra Petch), `font-sans` (Space Grotesk), `font-mono` (JetBrains Mono)

The aesthetic is intentionally distinctive/cyberpunk — neon-on-dark, monospace HUD details, animated circuit background. `globals.css` (~450 lines) holds the bespoke animation and effect classes; check there before inventing new ones.

## SEO / OG

OG and Twitter images are generated dynamically via `src/app/opengraph-image.tsx` / `twitter-image.tsx` (rendering `src/components/og/OgShareImage.tsx`). `metadataBase` comes from `NEXT_PUBLIC_SITE_URL` (falls back to the Vercel URL). Per-project metadata is built in the `[id]` route's `generateMetadata`.
