import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';
import { StoreBadges } from '../components/StoreBadges';
import { PhoneFrame } from '../components/PhoneFrame';
import { MatchesScreen } from '../screens/MatchesScreen';

// Hero: argument left, live phone right (tonight's matches on screen).
// One short load stagger; the scroll-sync showcase below owns the motion.
export function Hero(): ReactElement {
  const reduce = useReducedMotion();
  const instant = reduce === true;
  const rise = (delay: number) => ({
    initial: instant ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: instant ? { duration: 0 } : { duration: 0.55, delay, ease: 'easeOut' as const },
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-16 h-96 w-96 rounded-full bg-paprika-tint blur-3xl dark:bg-paprika/15" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-basil-tint blur-3xl dark:bg-basil/15" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.p {...rise(0)} className="inline-flex items-center gap-1.5 rounded-full bg-char px-3.5 py-1.5 text-[13px] font-bold text-cream dark:bg-butter dark:text-char">
            <Star size={13} aria-hidden="true" fill="currentColor" />
            4.9 · 32k ratings · Editors’ Choice
          </motion.p>
          <motion.h1 {...rise(0.08)} id="hero-title" className="font-display mt-5 text-4xl font-bold leading-[1.03] text-char sm:text-5xl lg:text-[3.5rem] dark:text-cream">
            Cook what’s already home.
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-5 max-w-lg text-lg leading-relaxed text-char/65 dark:text-cream/70">
            Simmer looks at your fridge and plans the dinners — matching recipes,
            a week that reuses leftovers, and one short grocery list. Less waste,
            zero 6pm panic.
          </motion.p>
          <motion.div {...rise(0.24)}>
            <div className="mt-8">
              <StoreBadges />
            </div>
            <p className="mt-3 text-[13px] font-medium text-char/50 dark:text-cream/50">
              Free forever · No account needed to match tonight’s dinner
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={instant ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.65, delay: 0.2, ease: 'easeOut' }}
        >
          <PhoneFrame screen="matches" label="Simmer app showing tonight's dinner matches">
            <MatchesScreen />
          </PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
