import type { ReactElement, ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Feature } from '../lib/content';

interface PhoneFrameProps {
  screen: Feature['id'];
  children: ReactNode;
  label: string;
}

// The device: char body, dynamic-island notch, side buttons, cream screen
// well. Screen swaps cross-fade + rise via AnimatePresence; reduced motion
// collapses to an instant swap (content still updates — nothing goes stale).
export function PhoneFrame({ screen, children, label }: PhoneFrameProps): ReactElement {
  const reduce = useReducedMotion();

  return (
    <div role="img" aria-label={label} className="relative mx-auto w-[270px] sm:w-[300px]">
      {/* Side buttons — brightened in dark mode so they read off the body. */}
      <div aria-hidden="true" className="absolute -left-[13px] top-24 h-10 w-[3px] rounded-full bg-char/70 dark:bg-cream/60" />
      <div aria-hidden="true" className="absolute -left-[13px] top-40 h-14 w-[3px] rounded-full bg-char/70 dark:bg-cream/60" />
      <div aria-hidden="true" className="absolute -right-[13px] top-32 h-16 w-[3px] rounded-full bg-char/70 dark:bg-cream/60" />
      {/* Body: near-black in dark mode with a moonlit edge so the frame
          separates from the page even on the darkest backdrop. */}
      <div className="overflow-hidden rounded-[3rem] bg-char shadow-phone dark:bg-black dark:shadow-none dark:ring-2 dark:ring-white/25">
        <div className="relative">
          {/* Notch island — lifted a half-step off the body in dark mode. */}
          <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-char dark:bg-white/10">
            <span className="absolute right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/15" />
          </div>
          <div className="phone-scroll h-[560px] overflow-hidden sm:h-[600px] dark:ring-1 dark:ring-inset dark:ring-white/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screen}
                initial={reduce ? false : { opacity: 0, x: 44 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -32 }}
                transition={reduce ? { duration: 0 } : { duration: 0.32, ease: 'easeOut' }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
