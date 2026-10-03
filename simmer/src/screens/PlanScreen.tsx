import type { ReactElement } from 'react';
import { Repeat2 } from 'lucide-react';
import { HomeBar, StatusBar } from './chrome';

// Screen 3 — Week plan: evening rows with dishes, leftover chains flagged
// so Monday's roast visibly becomes Wednesday's tacos.
export function PlanScreen(): ReactElement {
  const days = [
    { d: 'Mon', dish: 'Herb roast chicken', tag: null },
    { d: 'Tue', dish: 'Crispy rice frittata', tag: null },
    { d: 'Wed', dish: 'Chicken tacos', tag: 'from Monday' },
    { d: 'Thu', dish: 'Parmesan greens soup', tag: null },
    { d: 'Fri', dish: 'Soup dumplings + broth', tag: 'from Thursday' },
  ];

  return (
    <div className="flex h-full flex-col bg-cream text-char dark:bg-char-deep dark:text-cream">
      <StatusBar />
      <p className="font-display px-4 pt-1 text-[19px] font-bold leading-tight">This week, sorted</p>
      <div className="mt-2 space-y-1.5 px-4">
        {days.map((w, i) => (
          <div
            key={w.d}
            className={`flex items-center gap-2.5 rounded-2xl border p-2 ${
              i === 2 ? 'border-paprika bg-white dark:border-transparent dark:bg-white/10' : 'border-char/10 bg-white/60 dark:border-white/10 dark:bg-white/5'
            }`}
          >
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl font-mono text-[10px] font-bold ${i === 2 ? 'bg-paprika text-white' : 'bg-char/10 text-char/70 dark:bg-white/15 dark:text-cream/80'}`}>
              {w.d}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-bold leading-tight">{w.dish}</p>
              {w.tag !== null && (
                <p className="flex items-center gap-1 text-[10px] font-semibold text-basil-deep dark:text-basil-tint">
                  <Repeat2 size={10} aria-hidden="true" />
                  {w.tag}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <HomeBar />
      </div>
    </div>
  );
}
