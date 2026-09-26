import type { HTMLAttributes, ReactElement } from 'react';
import { cn } from '../../lib/utils';

// shadcn/ui Card family on the two-level elevation system:
// resting cards use level 1, raised/hover states use level 2. Never ad hoc.
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <div
      className={cn(
        'rounded-lg bg-white text-ink shadow-level1 dark:bg-night-raised dark:text-white dark:shadow-level1-dark',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cn('flex flex-col gap-1.5 p-5 pb-3', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return <h3 className={cn('text-[15px] font-bold leading-none tracking-tight', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): ReactElement {
  return <p className={cn('text-[13px] text-ink-faint dark:text-gray-400', className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cn('p-5 pt-0', className)} {...props} />;
}
