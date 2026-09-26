import { useEffect, useRef, useState } from 'react';

/**
 * Animated number counter: eases from 0 (or the previous value) to `target`
 * over ~1.1s with expo-out. Returns the live value; callers format it.
 * Reduced motion (or `disabled`) jumps straight to the target.
 *
 * Implementation: single rAF loop, cleaned up on unmount or target change.
 * Re-running when `target` changes is what animates chart-range switches.
 */
export function useCountUp(target: number, disabled = false, duration = 1100): number {
  const [value, setValue] = useState<number>(() => (disabled ? target : 0));
  const fromRef = useRef(0);

  // Render-phase adjustment (React-endorsed derived-state pattern): keeps
  // the reduced-motion figure pinned to the target without an effect.
  if (disabled && value !== target) {
    setValue(target);
  }

  useEffect(() => {
    if (disabled) return;
    fromRef.current = 0;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(fromRef.current + (target - fromRef.current) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, disabled, duration]);

  return value;
}
