import { forwardRef, type ButtonHTMLAttributes, type ReactElement } from 'react';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
}

// shadcn-style Switch without the Radix dependency: a native button with
// role="switch" + aria-checked, so keyboard and screen readers get it free.
export const Switch = forwardRef<
  HTMLButtonElement,
  SwitchProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>
>(function Switch({ checked, onCheckedChange, label, className, ...props }, ref): ReactElement {
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-ember' : 'bg-ink/15 dark:bg-white/15',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
          checked ? 'left-[22px]' : 'left-0.5',
        )}
      />
    </button>
  );
});
