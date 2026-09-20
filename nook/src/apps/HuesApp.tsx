import type { ReactElement } from 'react';
import { Check } from 'lucide-react';
import { useOs } from '../lib/useOs';

// Hues — the desk customizer. Accent recolors icon focus rings, the active
// window dot and dock highlights; desk tint recolors the backdrop. Real,
// instant, persisted-in-session state buyers can extend with their own theme.
const ACCENTS = [
  { id: 'marigold', label: 'Marigold', swatch: 'bg-marigold', hint: 'Warm default' },
  { id: 'lagoon', label: 'Lagoon', swatch: 'bg-lagoon', hint: 'Cool focus' },
] as const;

const DESKS = [
  { id: 'spruce', label: 'Spruce', swatch: 'bg-spruce', hint: 'Classic desk' },
  { id: 'pine', label: 'Pine', swatch: 'bg-spruce-pine', hint: 'A touch lighter' },
  { id: 'deep', label: 'Deep water', swatch: 'bg-spruce-deep', hint: 'Night shift' },
] as const;

export function HuesApp(): ReactElement {
  const { accent, desk, dispatch } = useOs();

  return (
    <div className="space-y-6 p-5">
      <fieldset>
        <legend className="font-display text-base font-bold text-ink">Accent color</legend>
        <p className="text-[13px] text-ink/60">Focus rings, active dots, dock glow.</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {ACCENTS.map((a) => {
            const active = accent === a.id;
            return (
              <label
                key={a.id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-pod border-2 p-2.5 transition-all ${
                  active ? 'border-ink bg-marigold-soft' : 'border-ink/20 hover:border-ink/60'
                }`}
              >
                <input
                  type="radio"
                  name="nook-accent"
                  value={a.id}
                  checked={active}
                  onChange={() => dispatch({ type: 'accent', accent: a.id })}
                  className="sr-only"
                />
                <span aria-hidden="true" className={`grid h-9 w-9 place-items-center rounded-tile border-2 border-ink ${a.swatch} text-ink`}>
                  {active && <Check size={16} strokeWidth={3} />}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{a.label}</span>
                  <span className="block text-xs text-ink/55">{a.hint}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-base font-bold text-ink">Desk tint</legend>
        <p className="text-[13px] text-ink/60">The felt behind everything.</p>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {DESKS.map((d) => {
            const active = desk === d.id;
            return (
              <label
                key={d.id}
                className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-pod border-2 p-2.5 transition-all ${
                  active ? 'border-ink bg-marigold-soft' : 'border-ink/20 hover:border-ink/60'
                }`}
              >
                <input
                  type="radio"
                  name="nook-desk"
                  value={d.id}
                  checked={active}
                  onChange={() => dispatch({ type: 'desk', desk: d.id })}
                  className="sr-only"
                />
                <span aria-hidden="true" className={`h-10 w-full rounded-pod border-2 border-ink ${d.swatch}`} />
                <span className="text-[13px] font-bold text-ink">{d.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="rounded-pod bg-lagoon-tint px-3 py-2 text-[13px] font-semibold text-ink">
        Buyers: add your own swatches in HuesApp.tsx and tokens in tailwind.config.js — the desk recolors itself.
      </p>
    </div>
  );
}
