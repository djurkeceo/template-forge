import { useRef, useState, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  /** Fraction of the cursor offset applied to the element (0.3 = subtle). */
  strength?: number;
  className?: string;
}

// Magnetic cursor interaction: the wrapped element leans toward the pointer
// and springs back on leave. Pointer-fine devices only; touch and
// reduced-motion users get a static element with zero listeners attached.
export function Magnetic({ children, strength = 0.3, className }: MagneticProps): ReactElement {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Evaluated once — render-safe state, no matchMedia cost on mousemove.
  const [finePointer] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  function onMove(event: MouseEvent<HTMLDivElement>): void {
    const rect = ref.current?.getBoundingClientRect();
    if (rect === undefined) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave(): void {
    x.set(0);
    y.set(0);
  }

  if (reduce === true || finePointer === false) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </motion.div>
  );
}
