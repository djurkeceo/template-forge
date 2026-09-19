import type { ReactElement } from 'react';
// Pure-CSS booking board — no photos, no external assets.
// Abstract day-columns with booked / waitlisted / open seats communicate
// the product better than a stock photo and keep the license clean.

const COLUMNS: Array<{ day: string; slots: Array<{ label: string; state: 'booked' | 'waitlist' | 'open' }> }> = [
  {
    day: 'Tue',
    slots: [
      { label: '6a Strength', state: 'booked' },
      { label: '12p Swim', state: 'open' },
      { label: '6p Climb', state: 'waitlist' },
    ],
  },
  {
    day: 'Wed',
    slots: [
      { label: '7a Pilates', state: 'open' },
      { label: '5p Physio', state: 'booked' },
      { label: '7p Choir', state: 'open' },
    ],
  },
  {
    day: 'Thu',
    slots: [
      { label: '6a Strength', state: 'waitlist' },
      { label: '12p Swim', state: 'booked' },
      { label: '6p Salon', state: 'open' },
    ],
  },
];

const STATE_CLS: Record<string, string> = {
  booked: 'bg-ink text-white dark:bg-white dark:text-ink',
  waitlist: 'bg-marigold text-ink',
  open: 'bg-white text-ink border border-line dark:bg-white/10 dark:text-white dark:border-white/15',
};

export function ScheduleMock(): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-panel border border-line bg-white shadow-card dark:border-white/10 dark:bg-ink-surface"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 dark:border-white/10">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-verdant" />
          <span className="h-2.5 w-2.5 rounded-full bg-marigold" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <p className="font-display text-xs font-semibold text-ink dark:text-white">This week · Fern &amp; Form</p>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {COLUMNS.map((col) => (
          <div key={col.day} className="flex flex-col gap-2">
            <p className="text-[11px] font-bold uppercase tracking-wide text-fog">{col.day}</p>
            {col.slots.map((slot) => (
              <div
                key={slot.label}
                className={`rounded-ticket px-2 py-2 text-[11px] font-semibold leading-tight ${STATE_CLS[slot.state]}`}
              >
                {slot.label}
                <span className="mt-1 block text-[10px] font-medium opacity-80">
                  {slot.state === 'booked' ? 'Full' : slot.state === 'waitlist' ? 'Waitlist ×4' : '6 seats left'}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-verdant-tint px-4 py-2.5 dark:bg-white/5">
        <p className="text-[11px] font-semibold text-verdant-deep dark:text-marigold-soft">
          9:14am — cancellation auto-filled from waitlist
        </p>
        <span className="rounded-full bg-verdant px-2 py-0.5 text-[10px] font-bold text-white">Auto</span>
      </div>
    </div>
  );
}
