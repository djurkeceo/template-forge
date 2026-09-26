import type { HTMLAttributes, ReactElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-ink text-white dark:bg-white dark:text-ink',
        ember: 'border-transparent bg-ember-tint text-ember-deep dark:bg-ember/20 dark:text-red-200',
        outline: 'border-line text-ink-faint dark:border-night-line dark:text-gray-300',
        success: 'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
        warning: 'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
        muted: 'border-transparent bg-ink/5 text-ink-faint dark:bg-white/10 dark:text-gray-300',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps): ReactElement {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
