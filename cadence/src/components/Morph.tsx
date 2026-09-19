import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MorphBlobProps {
  className?: string;
}

// Fluid morphing backdrop blob: border-radius keyframes flow through organic
// shapes on an 18s loop while the whole form slowly rotates. Pure CSS-kit
// geometry — no images, no libraries beyond Motion.
export function MorphBlob({ className }: MorphBlobProps): ReactElement {
  const reduce = useReducedMotion();

  if (reduce === true) {
    return <div aria-hidden="true" className={`rounded-full ${className ?? ''}`} />;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{
        borderRadius: [
          '42% 58% 61% 39% / 45% 43% 57% 55%',
          '61% 39% 42% 58% / 55% 61% 39% 45%',
          '39% 61% 55% 45% / 61% 39% 55% 45%',
          '42% 58% 61% 39% / 45% 43% 57% 55%',
        ],
        rotate: [0, 90, 180, 360],
        scale: [1, 1.08, 0.96, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

interface WaveDividerProps {
  /** Fill color class source — uses currentColor so themes just set text color. */
  className?: string;
}

// Fluid SVG morphing divider: the wave path breathes between two shapes
// (identical command structure, so Motion can interpolate `d`) on a slow
// mirror loop. Place between two contrasting bands.
export function WaveDivider({ className }: WaveDividerProps): ReactElement {
  const reduce = useReducedMotion();
  const from = 'M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,121 L0,121 Z';
  const to = 'M0,64 C240,40 480,96 720,56 C960,32 1200,88 1440,48 L1440,121 L0,121 Z';

  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-14 w-full sm:h-20">
        {reduce === true ? (
          <path d={from} fill="currentColor" />
        ) : (
          <motion.path
            fill="currentColor"
            initial={{ d: from }}
            animate={{ d: [from, to, from] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>
    </div>
  );
}
