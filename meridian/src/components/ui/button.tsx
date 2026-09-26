import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// shadcn/ui Button: cva variants + native button semantics.
// Ember is reserved for the primary action only — everything else stays
// neutral so the accent keeps its premium weight.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-ember text-white shadow hover:bg-ember-deep',
        secondary: 'bg-ink/5 text-ink hover:bg-ink/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
        outline: 'border border-line bg-transparent hover:bg-ink/5 dark:border-night-line dark:hover:bg-white/5',
        ghost: 'hover:bg-ink/5 hover:text-ink dark:hover:bg-white/10 dark:hover:text-white',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3 text-[13px]',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, ...props },
  ref,
) {
  return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
