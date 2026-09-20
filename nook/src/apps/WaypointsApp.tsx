import { useState, type ReactElement } from 'react';

type Tag = 'All' | 'Web' | 'Game' | 'Tool';

interface CaseStudy {
  title: string;
  year: string;
  role: string;
  tags: Exclude<Tag, 'All'>[];
  blurb: string;
  outcome: string;
  stack: string[];
}

// All case studies are invented generics — buyers swap in their own work.
const CASES: CaseStudy[] = [
  {
    title: 'Harborlight Festival Site',
    year: '2025',
    role: 'Design + frontend',
    tags: ['Web'],
    blurb: 'Schedule, ticketing and lineup explorer for a fictional three-day music weekend by the water.',
    outcome: 'Prototype tested with 12 attendees; day-plan saves up 3× vs. the old PDF.',
    stack: ['React', 'Tailwind', 'Motion'],
  },
  {
    title: 'Tidepool Keeper',
    year: '2025',
    role: 'Solo dev',
    tags: ['Game'],
    blurb: 'A slow browser game about tending rock pools: feed anemones, trade shells, watch the moon.',
    outcome: 'Ludum-style jam entry; 4k plays in the first month.',
    stack: ['TypeScript', 'Canvas', 'Howler'],
  },
  {
    title: 'Pantry Ledger',
    year: '2024',
    role: 'Frontend lead',
    tags: ['Web', 'Tool'],
    blurb: 'Shared grocery and expiry tracker for housemates, with a barcode-scanning party trick.',
    outcome: 'Pilot house of five cut food waste roughly in half.',
    stack: ['React', 'Vite', 'SQLite'],
  },
  {
    title: 'Hexwood Tactics',
    year: '2024',
    role: 'Design + code',
    tags: ['Game'],
    blurb: 'Cozy hex-grid tactics puzzler where units are forest animals with strong opinions.',
    outcome: '40 hand-tuned levels; demo at two local showcases.',
    stack: ['TypeScript', 'PixiJS'],
  },
  {
    title: 'Standup Parrot',
    year: '2023',
    role: 'Side project',
    tags: ['Tool'],
    blurb: 'A Slack companion that turns rambling standups into tidy digests. Squawks when you forget.',
    outcome: 'Used daily by three small teams for over a year.',
    stack: ['Node', 'Slack API', 'Postgres'],
  },
  {
    title: 'Orchard Orders',
    year: '2023',
    role: 'Design + frontend',
    tags: ['Web'],
    blurb: 'Order-ahead counter for a fictional cider orchard, built for one-thumb use in muddy boots.',
    outcome: 'Checkout completion up 22% in usability rounds.',
    stack: ['React', 'Tailwind'],
  },
];

const TAGS: Tag[] = ['All', 'Web', 'Game', 'Tool'];

// Waypoints — filterable project shelf. The filter is real state (not tabs
// for show): counts update and an aria-live region announces the result.
export function WaypointsApp(): ReactElement {
  const [tag, setTag] = useState<Tag>('All');
  const visible = tag === 'All' ? CASES : CASES.filter((c) => c.tags.includes(tag));

  return (
    <div className="p-5">
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter projects by type">
        {TAGS.map((t) => {
          const active = t === tag;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={active}
              className={`rounded-full border-2 px-3 py-1 text-[13px] font-bold transition-colors ${
                active ? 'border-ink bg-ink text-paper' : 'border-ink/25 bg-transparent text-ink/70 hover:border-ink'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[13px] font-semibold text-ink/50" aria-live="polite">
        Showing {visible.length} of {CASES.length} waypoints
      </p>

      <ul className="mt-3 space-y-3">
        {visible.map((c) => (
          <li key={c.title} className="rounded-card border-2 border-ink bg-white/60 p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-base font-bold text-ink">{c.title}</h3>
              <span className="shrink-0 font-mono text-xs font-bold text-ink/50">{c.year}</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-lagoon">{c.role}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{c.blurb}</p>
            <p className="mt-1.5 rounded-pod bg-lagoon-tint px-2.5 py-1 text-[13px] font-semibold text-ink">
              {c.outcome}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1" aria-label={`Built with for ${c.title}`}>
              {c.stack.map((s) => (
                <li key={s} className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-ink/70">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
