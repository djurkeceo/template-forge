import type { ReactElement } from 'react';
import { BatteryMedium, Signal, Wifi } from 'lucide-react';

// Shared phone chrome bits: status bar + home indicator, so every screen
// file stays focused on its own UI. `tone` flips the chrome for dark
// screens (cook mode) without fighting Tailwind specificity.
export function StatusBar({ tone = 'auto' }: { tone?: 'auto' | 'light' | 'dark' }): ReactElement {
  const cls =
    tone === 'light'
      ? 'text-cream'
      : tone === 'dark'
        ? 'text-char'
        : 'text-char dark:text-cream';
  return (
    <div className={`flex items-center justify-between px-5 pb-1 pt-3 ${cls}`}>
      <p className="font-mono text-[11px] font-semibold">9:41</p>
      <div className="flex items-center gap-1">
        <Signal size={11} aria-hidden="true" />
        <Wifi size={11} aria-hidden="true" />
        <BatteryMedium size={13} aria-hidden="true" />
      </div>
    </div>
  );
}

export function HomeBar({ tone = 'auto' }: { tone?: 'auto' | 'light' | 'dark' }): ReactElement {
  const bar =
    tone === 'light' ? 'bg-cream/30' : tone === 'dark' ? 'bg-char/25' : 'bg-char/25 dark:bg-cream/30';
  return (
    <div className="flex justify-center pb-2 pt-1" aria-hidden="true">
      <span className={`h-1 w-24 rounded-full ${bar}`} />
    </div>
  );
}
