import type { HTMLAttributes, ReactElement } from 'react';
import { cn } from '../../lib/utils';

// shadcn/ui Skeleton: pulsing placeholder block. Shown briefly on load to
// sell the "real app" feeling (see App.tsx simulated fetch).
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-ink/10 dark:bg-white/10', className)} {...props} />;
}
