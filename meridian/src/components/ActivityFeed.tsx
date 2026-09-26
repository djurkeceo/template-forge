import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ACTIVITY } from '../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Latest-events feed with staggered entrance — each row lands just after
// the last. Purely presentational; time strings are mock-relative.
export function ActivityFeed(): ReactElement {
  const reduce = useReducedMotion();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>The last few things that happened</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {ACTIVITY.map((a, i) => (
            <motion.li
              key={a.id}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-ink/[0.03] dark:hover:bg-white/[0.04]"
            >
              <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-snug">{a.text}</p>
                <p className="text-xs text-ink-faint dark:text-gray-500">{a.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
