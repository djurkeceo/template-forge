import type { ReactElement } from 'react';
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { formatUSD } from '../data/mock';
import { Card } from './ui/card';

interface KpiCardProps {
  label: string;
  value: number;
  format: 'money' | 'number' | 'percent';
  delta: number;
  icon: LucideIcon;
  footnote: string;
}

// KPI card: Plex Mono figure counts up on load (expo-out ~1.1s), delta pill
// shows direction. Reduced motion renders the final figure instantly.
export function KpiCard({ label, value, format, delta, icon: Icon, footnote }: KpiCardProps): ReactElement {
  const reduce = usePrefersReducedMotion();
  const live = useCountUp(value, reduce);
  const up = delta >= 0;

  function text(): string {
    if (format === 'money') return formatUSD(live);
    if (format === 'percent') return `${live.toFixed(1)}%`;
    return Math.round(live).toLocaleString('en-US');
  }

  return (
    <Card className="p-5 transition-all hover:-translate-y-0.5 hover:shadow-level2 dark:hover:shadow-level2-dark">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink-faint dark:text-gray-400">{label}</p>
        <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-md bg-ink/5 text-ink-soft dark:bg-white/10 dark:text-gray-300">
          <Icon size={16} />
        </span>
      </div>
      <p className="tnum mt-2 font-mono text-[28px] font-semibold leading-none tracking-tight" aria-live="off">
        <span className="sr-only">{`${label}: ${text()}`}</span>
        <span aria-hidden="true">{text()}</span>
      </p>
      <p className="mt-2.5 flex items-center gap-1.5 text-[13px]">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-mono text-xs font-semibold ${
            up ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-ember-tint text-ember-deep dark:bg-ember/20 dark:text-red-200'
          }`}
        >
          {up ? <ArrowUpRight size={12} aria-hidden="true" /> : <ArrowDownRight size={12} aria-hidden="true" />}
          {Math.abs(delta).toFixed(1)}%
        </span>
        <span className="text-ink-faint dark:text-gray-400">{footnote}</span>
      </p>
    </Card>
  );
}
