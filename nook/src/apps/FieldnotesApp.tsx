import type { ReactElement } from 'react';
import { Coffee, Compass, MapPin } from 'lucide-react';

// Fieldnotes — the about card. Avatar is a stitched initial tile, never a
// photo, so buyers inherit zero likeness rights to clear.
export function FieldnotesApp(): ReactElement {
  return (
    <div className="p-5">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="grid h-20 w-20 shrink-0 rotate-[-3deg] place-items-center rounded-tile border-2 border-ink bg-lagoon font-display text-2xl font-bold text-white shadow-icon"
        >
          RA
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">Robin Ash</h2>
          <p className="text-sm font-semibold text-lagoon">Creative developer & interface gardener</p>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink/60">
            <MapPin size={13} aria-hidden="true" />
            Portland, OR · UTC−8 · open to remote
          </p>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
        I build playful, legible interfaces for small teams — design systems,
        dashboards, and the occasional weird little game. Eight years in, my
        rule is still the same: if a first-time visitor can't use it without a
        tour, it isn't done.
      </p>

      <h3 className="font-display mt-5 text-sm font-bold uppercase tracking-wide text-ink/60">Daily drivers</h3>
      <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Skills">
        {['React', 'TypeScript', 'Tailwind', 'Motion', 'Figma', 'Node', 'Postgres', 'Vite'].map((s) => (
          <li key={s} className="rounded-full border-2 border-ink bg-marigold-soft px-2.5 py-0.5 text-xs font-bold text-ink">
            {s}
          </li>
        ))}
      </ul>

      <h3 className="font-display mt-5 text-sm font-bold uppercase tracking-wide text-ink/60">Field facts</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
        <li className="flex items-center gap-2">
          <Coffee size={15} className="shrink-0 text-ink/50" aria-hidden="true" />
          Fueled by pour-over; deploys before the second cup.
        </li>
        <li className="flex items-center gap-2">
          <Compass size={15} className="shrink-0 text-ink/50" aria-hidden="true" />
          Currently learning: game-feel math and trail maps.
        </li>
      </ul>
    </div>
  );
}
