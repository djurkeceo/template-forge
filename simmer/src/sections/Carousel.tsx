import { useState, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FEATURES } from '../lib/content';
import { PhoneFrame } from '../components/PhoneFrame';
import { MatchesScreen } from '../screens/MatchesScreen';
import { CookScreen } from '../screens/CookScreen';
import { PlanScreen } from '../screens/PlanScreen';
import { ShopScreen } from '../screens/ShopScreen';

const SCREENS = [MatchesScreen, CookScreen, PlanScreen, ShopScreen];
const CAPTIONS = [
  'Tonight’s matches, ranked by your fridge',
  'Hands-free cook mode with multi-timer',
  'A week that reuses leftovers on purpose',
  'One grouped list for the whole plan',
];

// Swipeable screenshot carousel: drag with touch/mouse, arrow buttons and
// dots all drive the same index. Direction-aware slide; reduced motion
// collapses to fades. Full carousel ARIA: roledescription, live region,
// labelled controls.
export function Carousel(): ReactElement {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const total = SCREENS.length;

  function go(next: number, dir: number): void {
    setIndex([((next % total) + total) % total, dir]);
  }

  const Screen = SCREENS[index] ?? MatchesScreen;
  const feature = FEATURES[index];

  return (
    <section id="screens" aria-label="App screenshots" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-bold text-char sm:text-4xl dark:text-cream">Four screens, zero learning curve</h2>
        <p className="mt-3 text-[15px] text-char/60 dark:text-cream/60">Drag through the whole app — every screen, no signup.</p>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Simmer screenshots"
        className="relative mx-auto mt-10 max-w-md"
      >
        <div className="overflow-visible" aria-live="polite">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction >= 0 ? 120 : -120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -120 : 120 }}
              transition={reduce ? { duration: 0 } : { duration: 0.32, ease: 'easeOut' }}
              drag={reduce ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -60) go(index + 1, 1);
                else if (info.offset.x > 60) go(index - 1, -1);
              }}
            >
              <PhoneFrame compact screen={feature?.id ?? 'matches'} label={`Simmer screenshot ${index + 1} of ${total}: ${CAPTIONS[index] ?? ''}`}>
                <Screen />
              </PhoneFrame>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-5 min-h-6 text-center text-sm font-semibold text-char/70 dark:text-cream/70" aria-live="polite">
          {index + 1} / {total} — {CAPTIONS[index]}
        </p>

        <div className="mt-3 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Previous screenshot"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-char text-char transition-transform hover:-translate-y-0.5 dark:border-cream dark:text-cream"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Choose screenshot">
            {SCREENS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show screenshot ${i + 1}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-7 bg-paprika' : 'w-2.5 bg-char/20 hover:bg-char/40 dark:bg-cream/25'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Next screenshot"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-char text-char transition-transform hover:-translate-y-0.5 dark:border-cream dark:text-cream"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
