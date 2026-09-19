# Cadence — bookings & memberships template for service studios

A commercial SaaS starter for independent studios (swim schools, climbing gyms,
salons, tutoring rooms). One timetable, self-filling waitlists, memberships and
a Friday payout story — with a **live pricing calculator** and a validated
email-capture form buyers can demo in seconds.

## Quick setup

```bash
cd studio-template
npm install
npm run dev      # local demo at http://localhost:5173
npm run build    # strict TS check + production bundle in dist/
npm run preview  # serve the production bundle locally
```

Requires Node 18+. No environment variables, no backend.

## Customisation

| What | Where |
|---|---|
| Palette (paper, ink, verdant, marigold, fog, line) | `tailwind.config.js` → `theme.extend.colors` |
| Type pairing (Space Grotesk display + Inter body) | `<link>` in `index.html`, `fontFamily` in `tailwind.config.js` |
| Plans, overages, annual discount | `src/lib/pricing.ts` (`PLANS`, `quote()`) |
| Studio names, testimonials, FAQs | `src/lib/content.ts` (all fictional) |
| Layout variants | `src/sections/` + the `VariantBar` switcher in `src/App.tsx` |

Dark mode is class-based: `useDarkMode()` toggles `.dark` on `<html>` and
persists to `localStorage`. All sections ship `dark:` styles.

## Layout variants (all in the demo)

- **Hero:** `HeroSplit` (editorial + live schedule board) or `HeroCentered`
  (compact ticket-stub strip) — swap via the demo bar.
- **Features:** `FeaturesRows` (staggered editorial) or `FeaturesGrid`
  (compact six-tile) — same copy, different rhythm.
- **Pricing:** `PricingCalculator` (live slider quote), `PricingTiers`
  (three cards), or both stacked.

## Working features

1. **Pricing calculator** (`src/sections/PricingCalculator.tsx` + pure
   `quote()` in `src/lib/pricing.ts`): plan radiogroup, bookings slider,
   location stepper and annual toggle all recalculate the receipt live,
   with an `aria-live` total and full keyboard support.
2. **Email capture** (`src/sections/CtaCapture.tsx` + `src/lib/validation.ts`):
   real client-side validation with error/success states announced to
   screen readers. Simulates the request; wire `fetch` where marked.
3. **FAQ accordion, mobile nav, theme toggle** — all native buttons with
   `aria-expanded` / `role="switch"` semantics.

## Structure

```
src/
  components/  Button, SectionHeading, Toggle
  sections/    Navbar, HeroSplit, HeroCentered, ProofStrip, FeaturesRows,
               FeaturesGrid, PricingCalculator, PricingTiers, Testimonials,
               Faq, CtaCapture, Customise, Footer, ScheduleMock, VariantBar
  lib/         pricing.ts, validation.ts, content.ts
  hooks/       useDarkMode.ts, usePrefersReducedMotion.ts
```

## Notes for buyers

- Stack: React 18+ (tested on 19), TypeScript strict, Tailwind utilities,
  Motion from `motion/react`, Vite, `lucide-react` icons only.
- Motion is one orchestrated hero entrance plus hover/tap feedback;
  `usePrefersReducedMotion()` + a global CSS guard disable it on request.
- No real brands, names or photos. Visuals are CSS gradients, shapes and
  the pure-CSS schedule board — safe to redistribute commercially.
- Code is fully typed (`noUncheckedIndexedAccess`, no `any`) and linted
  with `oxlint`; `npm run build` runs the strict check.
