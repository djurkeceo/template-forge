import type { ReactElement } from 'react';
import { useId } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  hintLeft: string;
  hintRight: string;
}

// Accessible switch for Monthly / Annual billing. A real <button> with
// role="switch" so keyboard and screen-reader users get the state for free.
export function Toggle({ checked, onChange, hintLeft, hintRight }: ToggleProps): ReactElement {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <span id={id} className="text-sm font-medium text-fog dark:text-gray-300">
        {checked ? hintRight : hintLeft}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full border-2 transition-colors ${
          checked ? 'border-verdant bg-verdant' : 'border-line bg-white dark:bg-white/10'
        }`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all ${
            checked ? 'left-[22px] bg-white' : 'left-[4px] bg-ink dark:bg-white'
          }`}
        />
      </button>
    </div>
  );
}
