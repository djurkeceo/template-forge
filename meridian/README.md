# Meridian — a premium minimal admin dashboard

**The dashboard that feels expensive.** Meridian is a complete admin template
for SaaS operations: an Overview with counting KPIs and a live revenue chart,
a sortable/filterable Customers table with CSV export, and a working Settings
view — wrapped in one confident accent color, generous whitespace, and motion
that sells "real app" in the first ten seconds.

## Why clients pick Meridian over a widget farm

- **Motion with a job.** Counting KPIs, staggered lists, spring sidebar,
  animated chart ranges, cross-fading theme — every animation answers a
  state change, and all of it collapses under `prefers-reduced-motion`.
- **Actually functional.** Sort, filter, paginate and export real table data;
  jump anywhere with Cmd+K; pause a subscription through a confirm dialog.
- **Dark mode is first-class.** Both palettes fully styled, toggled with a
  smooth cross-fade instead of a flash.
- **Buyer-grade code.** Strict TypeScript, zero `any`, lint-clean, commented
  logic, shadcn-style `components/ui` primitives over Radix, typed mock data.

## What's inside

| Area | What works |
|---|---|
| Overview | 4 counting KPI cards, revenue chart with 7/30/90-day ranges, channel bars, staggered activity feed, payout panel |
| Customers | Live search, status pills, 5 sortable columns, pagination, CSV export of filtered rows, row actions, cancel-via-dialog, empty state |
| Settings | Profile form with save confirmation, live notification switches, light/dark picker |
| Command palette | `Ctrl/⌘+K`: navigate, toggle theme/sidebar, export CSV, fuzzy customer search |
| Shell | Collapsible animated sidebar, mobile drawer, skeleton loading pass, skip link, full ARIA |

## Tech stack

React 19 + TypeScript (strict, `noUncheckedIndexedAccess`) · Tailwind CSS ·
shadcn/ui patterns (`cn()`, cva, Radix Dialog + DropdownMenu) · Motion
(`motion/react`) · Recharts (styled) · cmdk · Vite · lucide-react · oxlint clean

## Setup (2 minutes)

```bash
npm install
npm run dev      # demo at http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the production bundle
```

Node 18+. No backend, no env vars, no tracking.

## Wire in a real data source

Everything reads from `src/data/mock.ts` (typed, marked for replacement):

| Swap | With |
|---|---|
| `CUSTOMERS` | `GET /api/customers` (React Query/SWR recommended) |
| `revenueSeries()` | `GET /api/revenue?range=7d\|30d\|90d` |
| `ACTIVITY`, `CHANNELS` | Your events/analytics endpoints |
| Simulated 900ms load in `App.tsx` | Delete it — your fetch `isLoading` drives the same skeletons |
| `cancelPlan()` in `App.tsx` | `DELETE /api/subscriptions/:id`, then refetch |
| `downloadCSV()` in `src/lib/csv.ts` | Keep — it already exports whatever rows you pass it |

## Make it yours

| Change | File |
|---|---|
| Palette (6 hex) + elevation levels | `tailwind.config.js` → `theme.extend` |
| Fonts | `<link>` in `index.html` + `fontFamily` in `tailwind.config.js` |
| Chart styling | `src/components/RevenueChart.tsx` (gradient id, stroke, tooltip) |
| New view | Add to `views/`, register in `App.tsx` + sidebar + palette |

## Deploy anywhere

`npm run build` outputs static files in `dist/` — Vercel, Netlify,
Cloudflare Pages or any static host. No server required.

## License

Your purchase includes lifetime access to the Meridian source and free updates
within major version 1.x. Use it in **unlimited personal and client projects**.
Redistribution or resale of the source itself (as a template, starter or part
of a competing product) is not permitted. Demo names, companies and metrics are
fictional — replace them with real data before going live.
