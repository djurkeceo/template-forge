import type { ReactElement } from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  qty: number;
  onChange: (qty: number) => void;
  small?: boolean;
  label: string;
}

// Accessible stepper: minus/plus buttons flank a live output. Min 1, max 99;
// in cart rows a qty of 0 removes the line (handled by the store).
export function QuantityStepper({ qty, onChange, small = false, label }: QuantityStepperProps): ReactElement {
  const btn = small ? 'h-8 w-8' : 'h-10 w-10';
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
        className={`${btn} grid place-items-center rounded-pod border border-stone text-forest transition-colors hover:border-fern hover:text-fern-deep disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/15 dark:text-white`}
      >
        <Minus size={15} aria-hidden="true" />
      </button>
      <output aria-live="polite" aria-label="Quantity" className={`text-center font-bold tabular-nums ${small ? 'w-7 text-sm' : 'w-9 text-base'}`}>
        {qty}
      </output>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 99}
        aria-label="Increase quantity"
        className={`${btn} grid place-items-center rounded-pod border border-stone text-forest transition-colors hover:border-fern hover:text-fern-deep disabled:cursor-not-allowed disabled:opacity-30 dark:border-white/15 dark:text-white`}
      >
        <Plus size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
