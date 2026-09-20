import type { ReactElement } from 'react';
import { BatteryMedium, Sun, Wifi } from 'lucide-react';
import { useClock, formatClock, formatDate } from '../hooks/useClock';
import { appMeta } from '../lib/apps';
import { useOs } from '../lib/useOs';

// Top menu bar: nook mark + focused app name on the left, invented status
// icons + live mono clock on the right. Purely presentational.
export function MenuBar(): ReactElement {
  const now = useClock();
  const focused = useOs().focused;
  const activeMeta = focused === undefined ? undefined : appMeta(focused);

  return (
    <header className="relative z-40 flex h-10 items-center justify-between border-b-2 border-ink bg-paper px-4">
      <div className="flex items-center gap-2.5">
        <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full border-2 border-ink bg-marigold">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
        </span>
        <p className="font-display text-sm font-bold text-ink">nook</p>
        {activeMeta === undefined ? (
          <span className="hidden text-[13px] text-ink/50 sm:inline">click an icon to begin</span>
        ) : (
          <span className="hidden items-center gap-1.5 text-[13px] font-semibold text-ink/70 sm:flex" aria-live="polite">
            <activeMeta.icon size={14} aria-hidden="true" />
            {activeMeta.name}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3.5 text-ink">
        <Wifi size={15} aria-label="Signal: strong" role="img" />
        <Sun size={15} aria-label="Daylight savings: on" role="img" />
        <BatteryMedium size={17} aria-label="Battery: 82 percent" role="img" />
        <p className="hidden font-mono text-[13px] font-semibold tabular-nums sm:block" aria-label={`Today is ${formatDate(now)}`}>
          {formatDate(now)}
        </p>
        <p className="font-mono text-[13px] font-bold tabular-nums" aria-label={`Current time ${formatClock(now)}`}>
          {formatClock(now)}
        </p>
      </div>
    </header>
  );
}
