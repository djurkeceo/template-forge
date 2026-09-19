import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before the first character, in seconds. */
  delay?: number;
  /** Gap between characters, in seconds. */
  stagger?: number;
}

// Split-text character stagger for display headlines.
// Accessibility: the full string renders in a screen-reader-only span while
// the animated characters are aria-hidden, so nothing is spelled out letter
// by letter. Words are kept intact (inline-block) to preserve wrapping.
export function SplitText({ text, className, delay = 0, stagger = 0.022 }: SplitTextProps): ReactElement {
  const reduce = useReducedMotion();

  if (reduce === true) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');
  let charIndex = 0;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${w}-${word}`} className="inline-block whitespace-nowrap">
            {word.split('').map((ch, c) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={c}
                  className="inline-block will-change-transform"
                  initial={{ opacity: 0, y: '0.55em', rotate: 5 }}
                  animate={{ opacity: 1, y: '0em', rotate: 0 }}
                  transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              );
            })}
            {/* Inter-word space for every word except the last. */}
            {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  );
}
