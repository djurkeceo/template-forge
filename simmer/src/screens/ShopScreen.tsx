import { useState, type ReactElement } from 'react';
import { Check } from 'lucide-react';
import { HomeBar, StatusBar } from './chrome';

// Screen 4 — Grocery list: aisle-grouped, tappable checkboxes with a live
// "left to grab" count. Interactive even inside the sticky phone — buyers
// love tapping it in the demo.
export function ShopScreen(): ReactElement {
  const [done, setDone] = useState<string[]>(['Tortillas']);

  const aisles: Array<{ name: string; items: string[] }> = [
    { name: 'Produce', items: ['Limes', 'Cilantro', 'Scallions'] },
    { name: 'Pantry', items: ['Tortillas', 'Chicken broth'] },
    { name: 'Dairy', items: ['Cotija'] },
  ];

  function toggle(item: string): void {
    setDone((d) => (d.includes(item) ? d.filter((x) => x !== item) : [...d, item]));
  }

  const total = aisles.reduce((n, a) => n + a.items.length, 0);
  const left = total - done.length;

  return (
    <div className="flex h-full flex-col bg-cream text-char dark:bg-char-deep dark:text-cream">
      <StatusBar />
      <div className="px-4 pt-1">
        <p className="font-display text-[19px] font-bold leading-tight">One short list</p>
        <p className="text-[11px] font-semibold text-char/55 dark:text-cream/60" aria-live="polite">
          {left === 0 ? 'All grabbed. See you at the stove.' : `${left} of ${total} left to grab`}
        </p>
      </div>
      <div className="mt-2 space-y-2.5 px-4">
        {aisles.map((a) => (
          <div key={a.name}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-char/45 dark:text-cream/50">{a.name}</p>
            <div className="mt-1 space-y-1">
              {a.items.map((item) => {
                const checked = done.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggle(item)}
                    aria-pressed={checked}
                    className="flex w-full items-center gap-2 rounded-xl border border-char/10 bg-white p-1.5 text-left dark:border-white/10 dark:bg-white/5"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${checked ? 'border-basil bg-basil text-white' : 'border-char/25'}`}
                    >
                      {checked && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className={`text-[12px] font-semibold ${checked ? 'text-char/40 line-through dark:text-cream/40' : ''}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
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
