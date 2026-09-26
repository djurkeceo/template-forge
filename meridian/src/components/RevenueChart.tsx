import { useMemo, useState, type ReactElement } from 'react';
import {
  Area,
  CartesianGrid,
  AreaChart as ReAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { formatCompact, formatUSD, revenueSeries } from '../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '../lib/utils';

type Range = 7 | 30 | 90;

const RANGES: Array<{ days: Range; label: string }> = [
  { days: 7, label: '7D' },
  { days: 30, label: '30D' },
  { days: 90, label: '90D' },
];

// Revenue chart, styled to the UI: ember stroke, tint wash fill, whisper
// grid, tabular ticks (see index.css), custom tooltip card. Switching range
// regenerates the series — Recharts animates the morph (or snaps instantly
// under reduced motion). `key={range}` restarts the draw-in animation.
export function RevenueChart(): ReactElement {
  const [range, setRange] = useState<Range>(30);
  const reduce = usePrefersReducedMotion();
  const data = useMemo(() => revenueSeries(range), [range]);
  const total = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>
            <span className="tnum font-mono text-lg font-semibold text-ink dark:text-white">{formatUSD(total)}</span>
            {' collected in range'}
          </CardDescription>
        </div>
        <div className="flex gap-1 rounded-md border border-line p-1 dark:border-night-line" role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setRange(r.days)}
              aria-pressed={range === r.days}
              className={cn(
                'rounded px-2.5 py-1 font-mono text-xs font-semibold transition-colors',
                range === r.days ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'text-ink-faint hover:text-ink dark:text-gray-400',
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full" role="img" aria-label={`Revenue area chart, ${range} days, total ${formatUSD(total)}`}>
          <ResponsiveContainer width="100%" height="100%">
            <ReAreaChart key={range} data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="rev-wash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BE123C" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#BE123C" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="currentColor" className="text-line dark:text-night-line" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={28} />
              <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={(v: number) => `$${formatCompact(v)}`} />
              <Tooltip
                cursor={{ stroke: '#BE123C', strokeDasharray: '3 3', strokeOpacity: 0.5 }}
                content={<RevenueTooltip />}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#BE123C"
                strokeWidth={2.5}
                fill="url(#rev-wash)"
                isAnimationActive={!reduce}
                animationDuration={900}
                dot={false}
                activeDot={{ r: 4, fill: '#BE123C', strokeWidth: 2, stroke: '#fff' }}
              />
            </ReAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }): ReactElement | null {
  if (active !== true) return null;
  const first = payload?.[0];
  if (first === undefined) return null;
  return (
    <div className="rounded-md border border-line bg-white px-3 py-2 shadow-level2 dark:border-night-line dark:bg-night-raised">
      <p className="text-xs font-semibold text-ink-faint dark:text-gray-400">{label}</p>
      <p className="tnum font-mono text-base font-semibold">{formatUSD(first.value)}</p>
    </div>
  );
}
