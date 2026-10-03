# Simmer — cook what's already home (app landing template)

**A landing page that demos the app, not just describes it.** Simmer is a
complete mobile-app showcase for a fictional cook-from-your-fridge app: a
sticky phone whose screen changes as you scroll each feature, a swipeable
screenshot carousel, working FAQ, real store badges, and a validated
notify-me capture — all in light and dark mode.

## Why buyers pick Simmer over a static landing mockup

- **The scroll-sync centerpiece.** Four feature chapters drive four real app
  screens in a sticky phone via IntersectionObserver — verified end to end.
- **Screens with actual thought.** Pantry matching with match bars, lights-out
  cook mode with timer, leftover-aware week plan, tappable grocery list.
- **Working commerce bits.** Swipeable carousel (drag + arrows + dots),
  FAQ accordion, validated email capture with success state, clickable
  App Store / Google Play badges (lucide-built, no trademark images).
- **Buyer-grade code.** Strict TypeScript, zero `any`, lint-clean, commented
  scroll-sync, `components / sections / screens / lib` structure.

## What's inside

| Area | What works |
|---|---|
| Hero | Load stagger, live phone, store badges, rating strip |
| How it cooks | Sticky scroll-synced phone + 4 chapters + jump dots |
| Screens | Drag/swipe carousel with arrows, dots and full ARIA |
| FAQ | Keyboard-operable accordion, one open at a time |
| Launch CTA | Email validation + success state, compact store badges |
| Chrome | Sticky nav, dark-mode toggle, footer, skip link, focus rings |

## Tech stack

React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) · Tailwind CSS ·
Motion (`motion/react`) · Vite · lucide-react icons only · oxlint clean

## Setup (2 minutes)

```bash
npm install
npm run dev      # demo at http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the production bundle
```

Node 18+. No backend, no env vars, no tracking.

## Swap in your own app

| Change | File |
|---|---|
| Feature copy + steps | `src/lib/content.ts` (`FEATURES`, `FAQS`) |
| Phone screens | `src/screens/*.tsx` — one file per screen, same 270–300px well |
| Screen registry | `SCREENS` maps in `src/sections/Features.tsx` + `Carousel.tsx` |
| Store links | `href="#"` in `src/components/StoreBadges.tsx` → your App Store / Play Console URLs |
| Waitlist endpoint | `onSubmit` in `src/sections/Cta.tsx` — POST `email` to ConvertKit/Loops/your API |
| Brand colours (6 hex) | `tailwind.config.js` → `theme.extend.colors` |
| Fonts | `<link>` in `index.html` + `fontFamily` in `tailwind.config.js` |
| Scroll-sync feel | `useActiveChapter.ts` (observer band) + `PhoneFrame.tsx` (transition) |

Dark mode is class-based: the moon button toggles `.dark` on `<html>` and
persists to `localStorage`. Every section ships `dark:` styles. Reduced
motion collapses all transitions while keeping content in sync.

## Deploy anywhere

`npm run build` outputs static files in `dist/` — Vercel, Netlify,
Cloudflare Pages or any static host. No server required.

## License

Your purchase includes lifetime access to the Simmer source and free updates
within major version 1.x. Use it in **unlimited personal and client projects**.
Redistribution or resale of the source itself (as a template, starter or part
of a competing product) is not permitted. Demo app, dishes and copy are
fictional — replace them with your own before going live.
