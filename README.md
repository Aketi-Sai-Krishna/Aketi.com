# AKETI Website

A responsive, single-page website for AKETI, built with React, TypeScript, Vite, SCSS, and Three.js.

The content and design are original for AKETI. The website uses a familiar digital-agency structure—services, work, process, principles, insights, and contact—as inspiration, rather than copying another agency's text, code, branding, or proprietary visual assets.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed in the terminal.

## Build for production

Run `npm run build`. Vite writes the production site to `dist/`.

## Where to edit

- `src/pages/Home.tsx` — the order of homepage sections.
- `src/components/Navbar.tsx` — navigation and mobile menu.
- `src/components/Hero.tsx` — main headline and call to action.
- `src/components/Services.tsx` — service cards.
- `src/components/Work.tsx` and `src/data/projects.ts` — project case studies and their content.
- `src/components/Process.tsx` — how AKETI works.
- `src/components/Approach.tsx` — AKETI's principles.
- `src/components/Insights.tsx` — editorial notes.
- `src/components/Contact.tsx` — enquiry form and contact links.
- `src/styles/global.scss` — global font setup, brand colors, resets, and shared base styles.
- `src/styles/home.scss` — all homepage layout, section styling, navbar styling, and responsive rules. Imported directly by `Home.tsx`.
- `public/fonts/` — local font files.

## Before publishing

- Replace `hello@aketi.in` if that is not the final contact email.
- Replace the generic WhatsApp link with AKETI's official business number.
- Confirm the Flaviotte font license permits web embedding and commercial use.
- Replace concept work with real projects or keep it clearly labelled as a concept.
- Test keyboard navigation, form behavior, reduced-motion settings, and responsive layouts.


## Component styling structure

Each visual component imports its own SCSS file: `Navbar.tsx` → `navbar.scss`, `Hero.tsx` → `hero.scss`, and so on. `src/styles/home.scss` contains shared homepage heading rules and responsive page-wide adjustments. `global.scss` contains global tokens and reset styles.
