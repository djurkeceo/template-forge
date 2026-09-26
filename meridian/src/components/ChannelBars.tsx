import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CHANNELS } from '../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Signup channels as animated share bars — CSS width transitions driven by
// Motion so they glide in staggered. Ember leads; the rest stay ink.
export function ChannelBars(): ReactElement {
  const reduce = useReducedMotion();
  const max = Math.max(...CHANNELS.map((c) => c.share));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signups by channel</CardTitle>
        <CardDescription>Where new trials started this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3.5">
          {CHANNELS.map((c, i) => (
            <li key={c.channel}>
              <div className="flex items-baseline justify-between text-[13px]">
                <span className="font-semibold">{c.channel}</span>
                <span className="tnum font-mono font-semibold text-ink-faint dark:text-gray-400">{c.share}%</span>
              </div>
              <div
                className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10"
                role="progressbar"
                aria-valuenow={c.share}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${c.channel} share`}
              >
                <motion.div
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${(c.share / max) * 100}%` }}
                  transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full ${i === 0 ? 'bg-ember' : 'bg-ink/70 dark:bg-white/60'}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
