import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

// shadcn/ui Input: ring on focus, ember reserved for validation-free states.
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-line bg-white px-3 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-faint/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/40 disabled:cursor-not-allowed disabled:opacity-50 dark:border-night-line dark:bg-night-raised dark:text-white dark:placeholder:text-gray-500',
        className,
      )}
      {...props}
    />
  );
});
