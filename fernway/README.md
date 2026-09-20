# Fernway — Plants, Planters & Care Goods (E-commerce Template)

**A storefront that sells like a plant shop, not a theme demo.** Fernway is a
complete e-commerce template for nurseries, plant shops and home-garden brands:
filterable catalog, product detail with pot-size variants, a slide-in cart that
persists across visits, a wishlist, and a 4-step checkout that runs end to end
— with a clearly-marked file and line where you plug in Stripe.

## Why buyers pick Fernway over a static store mockup

- **The whole funnel actually works.** Browse → filter → detail → cart →
  shipping → mock payment → confirmation. Open the demo and buy a monstera;
  every number recalculates live.
- **Cart state buyers can trust.** One tiny Zustand store, persisted to
  `localStorage`. Money is always derived from the catalog — prices can never
  drift out of sync.
- **Zero photo-license risk.** Product artwork is six graded gradient tiles +
  lucide icons at a consistent 4:5 framing. Swap in real photography later
  without touching a component.
- **Buyer-grade code.** Strict TypeScript, zero `any`, commented logic,
  `components / data / lib / store` structure, lint-clean, accessible
  (skip link, focus rings, ARIA steppers/dialogs/live regions) and dark-mode
  ready.

## What's inside

| Area | What works |
|---|---|
| Catalog | Category pills, price bands, Saved filter, 4 sort orders, live result count, empty states |
| Product cards | Hover zoom, badges, half-star ratings, wishlist heart, quick-add morphing to a check |
| Detail view | Image gallery with thumbnails, size variants with price deltas, quantity stepper, live total, care facts, related products |
| Cart drawer | Slides in without reload, quantity steppers, remove, live subtotal, free-shipping progress bar, empty-cart state |
| Checkout | Review → validated shipping form → mock payment (card formatting + validation) → confirmation with order number |
| Wishlist | Heart toggles everywhere, persisted, with its own filter view |
| Chrome | Announcement bar, sticky nav with popping cart badge, trust row, footer, dark mode |

## Tech stack

React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) · Tailwind CSS ·
Motion (`motion/react`, commerce feedback only) · Zustand + persist ·
Vite · lucide-react icons only · oxlint clean

## Setup (2 minutes)

```bash
npm install
npm run dev      # demo at http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the production bundle
```

Node 18+. No backend, no env vars, no tracking.

## Make it yours

| Change | File |
|---|---|
| Products, prices, variants | `src/data/products.ts` — the ONE file the whole store reads |
| Brand colours (6 hex) | `tailwind.config.js` → `theme.extend.colors` + `backgroundImage` tiles |
| Fonts | `<link>` in `index.html` + `fontFamily` in `tailwind.config.js` |
| Free-shipping threshold | `FREE_SHIPPING_AT` / `FLAT_SHIPPING` in `src/data/products.ts` |
| Cart logic | `src/store/shop.ts` — actions, selectors, persistence key |
| Form rules | `src/lib/validation.ts` |

Dark mode is class-based: the moon button toggles `.dark` on `<html>` and
persists to `localStorage`. Every view ships `dark:` styles.

## Wiring a real payment gateway (Stripe)

The checkout is built so the gateway swap is surgical:

1. `npm install @stripe/stripe-js @stripe/react-stripe-js`.
2. Open `src/components/CheckoutFlow.tsx` and find the `WHERE TO PLUG IN
   STRIPE` comment in the payment step.
3. Wrap the step in `<Elements>` and replace the three card inputs with
   Stripe's `CardNumberElement`, `CardExpiryElement`, `CardCvcElement`.
4. In `submitPayment`, create the PaymentIntent on **your server**, confirm
   with `stripe.confirmCardPayment`, and advance to `'done'` on success.
5. Replace `mockOrderNumber()` with the gateway's payment reference.

Review and shipping steps stay untouched — they already collect everything
the PaymentIntent metadata needs. Same pattern works for Paddle, Lemon
Squeezy or any redirect gateway: swap step 3's submit handler.

## Deploy anywhere

`npm run build` outputs static files in `dist/` — Vercel, Netlify,
Cloudflare Pages or any static host. No server required.

## License

Your purchase includes lifetime access to the Fernway source and free updates
within major version 1.x. Use it in **unlimited personal and client projects**.
Redistribution or resale of the source itself (as a template, starter or part
of a competing product) is not permitted. Demo products, names and reviews are
fictional — replace them with your catalog before going live.
