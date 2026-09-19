import type { ReactElement } from 'react';
import { PROOF_STUDIOS } from '../lib/content';

// Proof strip: invented studios only, each with one concrete outcome.
// Offset two-column rhythm on desktop (sticky note + list), single column mobile.
export function ProofStrip(): ReactElement {
  return (
    <section aria-label="Studios using Cadence" className="border-y border-line bg-white dark:border-white/10 dark:bg-ink-deep">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-display text-2xl font-bold leading-tight text-ink dark:text-white">
            Running the 6pm class, the Saturday queue and the payroll behind it.
          </p>
          <p className="mt-2 text-[15px] text-fog dark:text-gray-300">
            A few of the 1,400 independent rooms on Cadence this week:
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PROOF_STUDIOS.map((s) => (
            <li
              key={s.name}
              className="rounded-ticket border border-line bg-paper px-4 py-3 transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-sm font-bold text-ink dark:text-white">{s.name}</p>
              <p className="text-xs text-fog dark:text-gray-400">{s.kind}</p>
              <p className="mt-1.5 inline-block rounded-full bg-verdant-tint px-2 py-0.5 text-[11px] font-bold text-verdant-deep dark:bg-verdant/25 dark:text-marigold-soft">
                {s.stat}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
