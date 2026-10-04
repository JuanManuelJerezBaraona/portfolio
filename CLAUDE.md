# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server at http://localhost:3000
npm run build    # production build (also runs generateStaticParams for /proyectos/[id])
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next, flat config)
npm run cv       # prints cv/cv.html to public/CV-Juan-Manuel-Jerez-Baraona.pdf with headless Chrome
```

The CV is ATS-oriented on purpose (one column, real text, standard section names, ligatures off). Edit `cv/cv.html`, run `npm run cv`, and check it still fits on one A4 page.

There is no test suite. `npm run lint` is the only static check.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zustand. Path alias `@/*` → `src/*`. This is a single-page personal portfolio (Spanish, Chilean), deployed on Vercel.

## Architecture

**Content is data-driven, not hardcoded in components.** `src/constants/data.ts` is the single source of truth: `PERSONAL_INFO`, `TIMELINE`, `SKILLS`, `AI_PRACTICES`, `PROJECTS`, `NAV_LINKS`, `SOCIAL_LINKS`, plus helpers `getProjectById()` and `groupTechStack()`. Types for all of these live in `src/types/index.ts`. To change copy, skills, or projects, edit `data.ts` — components render from it. When adding fields, update the interface in `types/index.ts` first.

**Concept: a fluorescence microscope.** Juan Manuel is a biotechnology engineer who worked in a neurobiology lab before moving to software, and the site is built around that. The hero is a procedurally drawn neuron (`Header/Micrograph.tsx`) split into three emission channels that map to his work: C1 DAPI (blue) → frontend, C2 GFP (green) → backend, C3 mCherry (red) → IA. Keep that mapping consistent wherever the channel colors appear (Skills columns, the IA section, the logo mark).

**Truthfulness matters — recruiters will ask about everything on the page.** `TIMELINE` and project countries come from the CV in `public/`. `AI_PRACTICES` and the `ai` skills list only tools he confirmed using (Claude Code, Codex, OpenCode, GitHub Copilot, his own skills, MCP servers, Spec-Driven Development, n8n, LLM API integration). The `highlights` of the Tsoft entry in `TIMELINE` (Nuxt/Vue → Next.js migrations, legacy performance, Playwright e2e, architecture decisions) are confirmed by him; keep the CV (`cv/cv.html`) in sync with them. The project fields `role`, `summary`, `challenge` and `contributions` were seeded from descriptions and stacks and are **not independently verified**. The `outcome` and `metrics` of each project (the "Resultado" section of the case file) are **invented placeholder estimates**, written at his request to be replaced by his real figures; until he confirms them, treat every number there as unverified. Don't add metrics, tools or claims that aren't backed by him.

**Sections** (`src/app/page.tsx`): `Header → AboutMe (Trayectoria) → CodeLab → Projects → AiProfile → Skills → Contact`.

- `CodeLab` ("La neurona del inicio es código") shows the real `grow()` function from `Header/Micrograph.tsx`, read at build time between the `// #region grow` / `// #endregion grow` markers — keep those markers if you edit the generator. `CodeLab/sequence.ts` tokenizes it and maps token kinds to Sanger sequencing bases (A keyword · C variable · G number · T call), which CSS draws as chromatogram peaks. Next to it, the hero's main neuron (`MAIN_NEURON`) grows one recursion order at a time. The "Secuenciar de nuevo" button is a checkbox that swaps every `animation-name` between two identical keyframe sets to restart them.

- `Projects` renders `ProjectViewer` (client; tablist of the five journey stages + the selected screenshot under a `Loupe`) on `lg+`, and `ProjectCarousel` below `lg` (client; each project is a glass slide on the microscope stage: native scroll-snap, only the centred slide is in focus, a vernier scale underneath tracks the stage through `--p`, and tapping a blurred neighbour centres it instead of following its links). `PROJECTS` order is the customer journey (Cotización → Aceptación → Pago → Acceso → Postventa); numbering and prev/next rely on it.
- `Skills` draws the stack as a well plate: one 12-well row per category, each technology a well that fluoresces in its channel color. Logos come from `simple-icons` (CC0), mapped by skill id in `Skills.tsx`; skills without a logo get a monogram.
- `src/app/proyectos/[id]/page.tsx` statically generates one case file per project via `generateStaticParams`, rendered by `src/components/case/CaseFile.tsx`.

**Layout (`src/app/layout.tsx`)** is just `Navbar`, `main` and `Footer` on a flat black background. It also injects an inline `<head>` script that forces `scrollRestoration='manual'` and scrolls to top on load (the `ScrollReset` component reinforces this), plus a `<noscript>` fallback that un-hides `.reveal` elements.

**Components** are organized one folder per section under `src/components/`, each with a barrel `index.ts`; the top-level `src/components/index.ts` re-exports the page sections. Shared pieces live in `src/components/ui/` (`Reveal`, `SectionHeading`, `Loupe`, `ProjectMeta`, `ScrollReset`). Most components are server components; only `Navbar`, `ModeToggle`, `ProjectViewer`, `ProjectCarousel`, `Loupe`, `Reveal` and `ScrollReset` use `'use client'`. The micrograph is server-rendered from a seeded PRNG and ships no JS; its channel toggles are checkboxes wired with CSS `:has()`.

**State:** `src/store/uiStore.ts` (Zustand) holds only UI state — mobile menu open, active section. No data fetching anywhere; everything is static.

## Styling

Tailwind v4 with a CSS-first theme in `src/app/globals.css` — no `tailwind.config`. The `@theme inline` block maps design tokens to utility colors. Use the semantic token names rather than raw hex:
- Surfaces: `void` (page), `stage`, `stage-2`; borders: `line`, `line-strong`
- Text: `text`, `muted`
- Channels: `dapi` (blue, frontend), `gfp` (green, backend and "live/selected"), `mcherry` (red, IA), `yfp` (yellow, datos)
- Sections: each top-level section has a `.sec-<id>` class (`about`, `codigo`, `projects`, `ia`, `skills`, `contact`) that sets `--accent` from `--sec-<id>`. Inside a section use `text-accent` / `bg-accent` for highlights and `<em className="hl">` to emphasize a word; never borrow a channel color for that. The six section colors were chosen in OKLCH at equal lightness to stay distinct from each other and from the four channels; the channels stay reserved for their meaning (frontend/backend/IA/datos, the neuron, the Sanger bases).
- Fonts: Archivo (variable, `font-sans`/`font-display`) and Martian Mono (`font-mono`). Headlines use Archivo's width axis: `h1–h3` and `.wide` run at `wdth 118`, `.display` at `wdth 125`. `.meta` is the small mono readout used for labels and metadata.

**Two looks, one set of tokens.** The navbar switch (`ui/ModeToggle.tsx`) flips the whole site between fluorescence (default: black field, channels blended with `plus-lighter`, i.e. added light) and brightfield (a stained slide: light field, channels become stains blended with `multiply`, i.e. absorbed light). The look is pure CSS: `:root:has(#mode-brightfield:checked)` redefines the tokens. With JS, the switch runs inside a View Transition (a circle of light spreading from the knob) with every CSS transition suspended via `html.mode-switching` — do not animate the tokens themselves or add color transitions that fire on the switch: transitioning variables on `:root` repaints the whole page per frame and ~160 element transitions firing at once made it stutter on iOS. JS also persists the choice (`<html data-mode="brightfield">` + localStorage, restored before paint by `MODE_INIT_SCRIPT` in `ui/scopeMode.ts`). Never hardcode a color in a component or in `globals.css` outside the token blocks, or it will break one of the two modes — use the tokens, `color-mix()`, `--glow` and `--blend`.

Base and component styles in `globals.css` live inside `@layer base` / `@layer components` so Tailwind utilities can override them — keep new rules inside a layer, since unlayered CSS beats every utility in Tailwind v4.

Avoid the generic "AI portfolio" look the redesign moved away from: no gradient text, glassmorphism cards, corner brackets, scanlines, marquees, pinging status dots or `// eyebrow` comments. Motion is deliberately limited to the hero's focus pull, content coming into focus on scroll (`.reveal`), the loupe, the calcium flashes in the micrograph and the mobile carousel (slides refocusing, the phone shot drifting on a scroll-driven timeline).

## SEO / OG

OG and Twitter images are generated by `src/app/opengraph-image.tsx` / `twitter-image.tsx`, rendering `src/components/og/OgShareImage.tsx` with the micrograph exported as a standalone SVG (`micrographSvg()`). Fonts are fetched from Google Fonts as static TTF instances at build time and fall back to the default sans if the network fails. `metadataBase` comes from `NEXT_PUBLIC_SITE_URL` (falls back to the Vercel URL). Per-project metadata is built in the `[id]` route's `generateMetadata`.
