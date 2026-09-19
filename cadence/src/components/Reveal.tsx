import type { ReactElement, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds when several reveals share a viewport. */
  delay?: number;
  /** Travel distance in px for the rise. Keep small — cinema, not bounce. */
  distance?: number;
  className?: string;
  /** Render as <li> when the parent is a list, keeping HTML semantic. */
  as?: 'div' | 'li';
}

// Cinematic scroll reveal: the element rises softly and settles from 98.5%
// scale — the "focus pull" feel, without blur. (Blur was removed deliberately:
// animating filter forces a repaint on every scroll frame and was the main
// source of scroll jank.) Fires once per element.
// Reduced-motion users get the final state with no animation.
export function Reveal({ children, delay = 0, distance = 28, className, as = 'div' }: RevealProps): ReactElement {
  const reduce = useReducedMotion();

  if (reduce === true) {
    if (as === 'li') return <li className={className}>{children}</li>;
    return <div className={className}>{children}</div>;
  }

  const shared = {
    className,
    initial: { opacity: 0, y: distance, scale: 0.985 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-72px' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  if (as === 'li') return <motion.li {...shared}>{children}</motion.li>;
  return <motion.div {...shared}>{children}</motion.div>;
}
