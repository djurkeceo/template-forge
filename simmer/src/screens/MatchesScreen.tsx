import type { ReactElement } from 'react';
import { Flame } from 'lucide-react';
import { HomeBar, StatusBar } from './chrome';

// Screen 1 — Tonight's matches: pantry chips on top, ranked recipe cards
// with match bars below. The screen the hero phone shows.
export function MatchesScreen(): ReactElement {
  const pantry = ['Onion ½', 'Spinach', 'Parmesan', 'Eggs', 'Rice'];
  const dishes = [
    { name: 'Crispy rice frittata', time: '25 min', match: 92 },
    { name: 'Parmesan greens soup', time: '30 min', match: 87 },
    { name: 'Spinach fried rice', time: '15 min', match: 81 },
  ];

  return (
    <div className="flex h-full flex-col bg-cream text-char dark:bg-char-deep dark:text-cream">
      <StatusBar />
      <div className="px-4 pt-1">
        <p className="font-display text-[19px] font-bold leading-tight">Tonight, from your fridge</p>
        <div className="mt-2 flex flex-wrap gap-1" aria-label="Your pantry">
          {pantry.map((p) => (
            <span key={p} className="rounded-full bg-basil-tint px-2 py-0.5 text-[10px] font-bold text-basil-deep dark:bg-basil-deep dark:text-cream">
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2.5 space-y-2 px-4">
        {dishes.map((d, i) => (
          <div
            key={d.name}
            className={`rounded-2xl border p-2.5 ${
              i === 0
                ? 'border-paprika bg-white shadow-card dark:border-transparent dark:bg-white/10'
                : 'border-char/10 bg-white/70 dark:border-white/10 dark:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12px] font-bold leading-tight">{d.name}</p>
              <span className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold ${i === 0 ? 'bg-paprika text-white' : 'bg-basil-tint text-basil-deep dark:bg-basil-deep dark:text-cream'}`}>
                {d.match}%
              </span>
            </div>
            {/* Dynamic width set inline: it varies per dish. */}
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-char/10 dark:bg-white/15" aria-hidden="true">
              <div className={`h-full rounded-full ${i === 0 ? 'bg-paprika' : 'bg-basil'}`} style={{ width: `${d.match}%` }} />
            </div>
            <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-char/55 dark:text-cream/60">
              <Flame size={10} aria-hidden="true" />
              {d.time} · one pan
            </p>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <HomeBar />
      </div>
    </div>
  );
}
