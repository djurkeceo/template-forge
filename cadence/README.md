# Cadence — Bookings & Memberships Template for Service Studios

**Sell the week, not the software.** Cadence is a complete, conversion-focused
SaaS landing page for independent studios — swim schools, climbing gyms,
salons, physio rooms, tutoring centres. Visitors don't just scroll screenshots:
they drag a **live pricing calculator**, watch a schedule board fill itself,
and get a validated trial invite in one interaction.

## Why buyers pick Cadence over a static theme

- **It demos like a product, not a picture.** The pricing quote recalculates
  live from plan, bookings, locations and billing period. Prospects play with
  it — and convince themselves.
- **Premium motion, done tastefully.** Cinematic scroll reveals, split-text
  headlines, a fluid morphing hero backdrop, a breathing SVG wave into
  pricing, and inertial momentum scrolling. All gated behind
  `prefers-reduced-motion`.
- **Layout variants included.** Two heroes, two feature layouts, three pricing
  presentations — switch them live in the demo bar, ship the combo you like.
- **Buyer-grade code.** Strict TypeScript with zero `any`, commented logic,
  `components / sections / lib` structure, lint-clean, accessible (skip link,
  focus rings, ARIA, live regions) and dark-mode ready.

## What's inside

| Section | What it does |
|---|---|
| Sticky nav + demo variant bar | Live layout switcher, mobile menu, dark-mode toggle |
| Hero — Week view | Split-text headline, magnetic CTAs, CSS schedule board |
| Hero — Ticket stub (alt) | Compact centred hero with perforated outcome strip |
| Proof strip | Six fictional studios, each with one concrete result |
| Features — staggered rows (alt: compact grid) | Waitlists, timetables, payouts + stat callouts |
| Pricing calculator | Live quote: slider, stepper, plan picker, annual toggle |
| Tier cards (alt) | Three plans sharing one pricing model — never out of sync |
| Studio stories | Sticky intro + alternating quote cards with mini-stats |
| FAQ accordion | Keyboard-operable, one-open-at-a-time |
| Trial capture | Email validation with error/success states, screen-reader announced |
| Customisation sheet | Palette + file map rendered on the page itself |
| Footer | Real sitemap anchors, fictional-content disclaimer |

## The premium animation suite

- **Cinematic scroll reveal** (`src/components/Reveal.tsx`) — rise + de-blur +
  settle, once per element, staggered across cards.
- **Split-text stagger** (`src/components/SplitText.tsx`) — headlines build
  character by character; screen readers hear the full line once.
- **Fluid morphing** (`src/components/Morph.tsx`) — breathing hero blob plus
  an SVG wave divider that melts the page into the pricing band.
- **Inertial scrolling** (`src/hooks/useLenis.ts`) — Lenis momentum with
  anchor routing and a sticky-header offset.

## Tech stack

React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) · Tailwind CSS ·
Motion (`motion/react`) · Lenis · Vite · lucide-react icons only · oxlint clean

## Setup (2 minutes)

```bash
npm install
npm run dev      # demo at http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the production bundle
```

Node 18+. No backend, no env vars, no tracking.

## Make it yours (30 minutes)

| Change | File |
|---|---|
| Brand colours (6 hex values) | `tailwind.config.js` → `theme.extend.colors` |
| Fonts | `<link>` in `index.html` + `fontFamily` in `tailwind.config.js` |
| Plans, overages, annual discount | `src/lib/pricing.ts` — calculator and cards share this model |
| Studio names, quotes, FAQs | `src/lib/content.ts` — one file, all fictional |
| Pick your layouts | `src/App.tsx` variant state, or delete the variants you don't ship |
| Tune the motion | `Reveal` (delay/distance), `useLenis` (lerp) |

Dark mode is class-based: the moon button toggles `.dark` on `<html>` and
persists to `localStorage`. Every section ships `dark:` styles.

## Deploy anywhere

`npm run build` outputs static files in `dist/` — drop them on Vercel,
Netlify, Cloudflare Pages or any static host. No server required.

## License

Your purchase includes lifetime access to the Cadence source and free updates
within major version 1.x. Use it in **unlimited personal and client projects**.
Redistribution or resale of the source itself (as a template, starter or part
of a competing product) is not permitted. Demo copy, names and stats are
fictional — replace them with your own before going live.
