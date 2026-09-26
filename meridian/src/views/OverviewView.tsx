import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Activity, CircleDollarSign, UserPlus, Users } from 'lucide-react';
import { ActivityFeed } from '../components/ActivityFeed';
import { ChannelBars } from '../components/ChannelBars';
import { KpiCard } from '../components/KpiCard';
import { RevenueChart } from '../components/RevenueChart';
import { Skeleton } from '../components/ui/skeleton';

interface OverviewViewProps {
  loading: boolean;
}

// Overview: KPI counters → revenue chart + channel bars → activity feed.
// Generous whitespace, one accent, staggered entrances. Loading swaps the
// whole view for skeletons (simulated fetch in App.tsx).
export function OverviewView({ loading }: OverviewViewProps): ReactElement {
  const reduce = useReducedMotion();

  if (loading) return <OverviewSkeleton />;

  return (
    <div className="space-y-5">
      <motion.ul
        initial={reduce ? false : 'hidden'}
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.07 } } }}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Key metrics"
      >
        {[
          { label: 'Monthly recurring revenue', value: 48210, format: 'money', delta: 8.2, icon: CircleDollarSign, footnote: 'vs last month' },
          { label: 'Active customers', value: 1243, format: 'number', delta: 4.6, icon: Users, footnote: '161 trialing' },
          { label: 'New signups', value: 186, format: 'number', delta: 12.4, icon: UserPlus, footnote: 'last 30 days' },
          { label: 'Activation rate', value: 68.4, format: 'percent', delta: -1.2, icon: Activity, footnote: 'trial to paid' },
        ].map((kpi) => (
          <motion.li
            key={kpi.label}
            variants={{ hidden: reduce ? {} : { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' }}
          >
            <KpiCard
              label={kpi.label}
              value={kpi.value}
              format={kpi.format as 'money' | 'number' | 'percent'}
              delta={kpi.delta}
              icon={kpi.icon}
              footnote={kpi.footnote}
            />
          </motion.li>
        ))}
      </motion.ul>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <RevenueChart />
        <ChannelBars />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.6fr]">
        <ActivityFeed />
        <PayoutNote />
      </div>
    </div>
  );
}

function PayoutNote(): ReactElement {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg bg-ink p-6 text-white shadow-level1 dark:bg-night-raised dark:shadow-level1-dark">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/50">Next payout</p>
        <p className="tnum mt-1 font-mono text-4xl font-semibold">$18,204</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
          Lands Friday in the connected account. Memberships, seats and overages
          are already reconciled — nothing to review unless you want to.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {['All reconciled', '2-day rolling', 'No action needed'].map((t) => (
          <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function OverviewSkeleton(): ReactElement {
  return (
    <div className="space-y-5" aria-label="Loading overview" role="status">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-white p-5 shadow-level1 dark:bg-night-raised">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-32" />
            <Skeleton className="mt-3 h-4 w-40" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
