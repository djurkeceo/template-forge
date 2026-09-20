# Nook — an interactive desktop portfolio

**A portfolio that feels like a place, not a page.** Nook is a fake desktop OS
for creative portfolios: drag paper-tile icons around a spruce desk, open
spring-animated windows for about, projects, resume and contact, minimize them
to a floating dock, and recolor the whole desk from inside. On touch devices it
gracefully becomes a launchpad with full-screen app sheets.

## Why buyers pick Nook over a scrolling one-pager

- **The demo is the differentiator.** Visitors play with it for minutes —
  opening, dragging, minimizing — and remember it against fifty static sites.
- **Real window management.** z-order focus, minimize/restore, dock toggle
  states, cascading opens, Escape-to-close, all keyboard reachable.
- **Apps with working insides.** Filterable project shelf, resume timeline
  with one-click `.txt` download, validated contact form, live desk
  customizer — not lorem ipsum in a frame.
- **Buyer-grade code.** Strict TypeScript, zero `any`, lint-clean, commented
  drag/z-index logic, `components / apps / lib` structure.

## What's inside

| Piece | What it does |
|---|---|
| Menu bar | Nook mark, focused-app name, invented status icons, live mono clock |
| Desktop icons | Draggable paper tiles (react-rnd), tactile press, keyboard openable |
| Windows | Drag-by-title-bar, corner resize, spring open/close, focus chrome, Escape closes |
| Dock | Quick-launch all apps; open/minimized/focused states with labels |
| Fieldnotes | About card, initial-tile avatar (no photo rights), skills, facts |
| Waypoints | Project shelf with working tag filter + live counts |
| Ledger | Resume timeline + Blob-generated resume download |
| Postbox | Contact form with inline validation + success state |
| Hues | Accent + desk-tint picker that recolors the live desktop |
| Mobile fallback | Launchpad grid + slide-up app sheets reusing the same app files |

## Tech stack

React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) · Tailwind CSS ·
Motion (`motion/react`, window transitions only) · react-rnd (drag/resize) ·
Vite · lucide-react icons only · oxlint clean

## Setup (2 minutes)

```bash
npm install
npm run dev      # demo at http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the production bundle
```

Node 18+. No backend, no env vars, no tracking.

## Add your own app (5 minutes)

1. Create `src/apps/MyApp.tsx` exporting a content component (see
   `FieldnotesApp.tsx` for the simplest shape).
2. Register it in `src/lib/apps.ts`: add the id to `AppId`, one entry in
   `APPS` with an invented name, tagline, lucide icon and literal tile classes.
3. Add one line to the `APP_CONTENT` maps in `src/components/Desktop.tsx`
   **and** `src/components/MobileFallback.tsx`.
4. Done — icon, dock entry, window chrome, mobile sheet and focus
   management all follow automatically.

## Make it yours

| Change | File |
|---|---|
| Identity (6 hex) + tile colors | `tailwind.config.js` → `theme.extend.colors` |
| Fonts | `<link>` in `index.html` + `fontFamily` in `tailwind.config.js` |
| Persona, projects, resume text | `src/apps/*.tsx` (+ `RESUME_TXT` in `LedgerApp.tsx`) |
| Contact endpoint | `TODO` comment in `PostboxApp.tsx` — POST `fields` to Formspree/Resend/your API |
| Motion feel | Spring values in `Window.tsx` / `MobileFallback.tsx`; `usePrefersReducedMotion` collapses to appear/disappear |

## Deploy anywhere

`npm run build` outputs static files in `dist/` — Vercel, Netlify,
Cloudflare Pages or any static host. No server required.

## License

Your purchase includes lifetime access to the Nook source and free updates
within major version 1.x. Use it in **unlimited personal and client projects**.
Redistribution or resale of the source itself (as a template, starter or part
of a competing product) is not permitted. Demo persona, projects and copy are
fictional — replace them with your own before going live.
