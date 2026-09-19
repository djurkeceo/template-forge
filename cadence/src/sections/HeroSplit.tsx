import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, ShieldCheck, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { SplitText } from '../components/SplitText';
import { MorphBlob } from '../components/Morph';
import { ScheduleMock } from './ScheduleMock';

// Variant A — "Week view": asymmetric editorial split.
// Left column carries the argument with a split-text character stagger;
// right column shows the live-feeling schedule board with a rotated
// marigold note pinned on top.
// This stays the ONE orchestrated page-load moment: everything below the
// fold reveals cinematically on scroll instead.
export function HeroSplit(): ReactElement {
  const reduce = useReducedMotion();
  const instant = reduce === true;

  const rise = (delay: number) => ({
    initial: instant ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: instant ? { duration: 0 } : { duration: 0.55, delay, ease: 'easeOut' as const },
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Abstract backdrop: fluid morphing blob + soft radial washes, no photos. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <MorphBlob className="absolute -left-40 top-0 h-[28rem] w-[28rem] bg-verdant-tint blur-3xl dark:bg-verdant/20" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-marigold-soft blur-3xl dark:bg-marigold/10" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-white dark:bg-marigold dark:text-ink"
          >
            <Star size={14} aria-hidden="true" />
            Loved by 1,400 independent studios
          </motion.p>

          <h1
            id="hero-title"
            className="font-display mt-5 text-4xl font-bold leading-[1.02] text-ink sm:text-5xl lg:text-[3.6rem] dark:text-white"
          >
            <SplitText text="The week runs itself, you teach the class." delay={0.1} />
          </h1>

          <motion.p {...rise(0.5)} className="mt-5 max-w-lg text-lg leading-relaxed text-fog dark:text-gray-300">
            Cadence handles bookings, waitlists, memberships and payouts for swim schools,
            climbing gyms, salons and tutoring rooms — from one timetable your whole
            team can actually read.
          </motion.p>

          <motion.div {...rise(0.58)} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#pricing" size="lg">
              Price your studio
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#features" size="lg" variant="secondary">
              <Play size={17} aria-hidden="true" />
              Watch a week in 2 min
            </Button>
          </motion.div>

          <motion.div {...rise(0.66)} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <p className="flex items-center gap-2 text-sm font-medium text-fog dark:text-gray-300">
              <ShieldCheck size={16} className="text-verdant" aria-hidden="true" />
              Free timetable import
            </p>
            <p className="flex items-center gap-2 text-sm font-medium text-fog dark:text-gray-300">
              <ShieldCheck size={16} className="text-verdant" aria-hidden="true" />
              No card to try for 21 days
            </p>
          </ motion.div>
        </div>

        <motion.div
          initial={instant ? false : { opacity: 0, y: 24, rotate: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={instant ? { duration: 0 } : { duration: 0.65, delay: 0.35, ease: 'easeOut' }}
          className="relative"
        >
          {/* Pinned note: rotated ticket overlapping the board's corner. */}
          <div
            aria-hidden="true"
            className="absolute -top-5 right-6 z-10 rotate-3 rounded-ticket bg-marigold px-3.5 py-2 text-[13px] font-bold text-ink shadow-lift"
          >
            Sat 9am filled from waitlist
          </div>
          <ScheduleMock />
          <dl className="mt-4 grid grid-cols-3 gap-3">
            {[
              ['41%', 'fewer no-shows'],
              ['9 min', 'to fill a seat'],
              ['2 days', 'payout speed'],
            ].map(([v, k]) => (
              <div
                key={k}
                className="rounded-ticket border border-line bg-white px-3 py-2.5 text-center dark:border-white/10 dark:bg-white/5"
              >
                <dt className="sr-only">{k}</dt>
                <dd className="font-display text-lg font-bold text-ink dark:text-white">{v}</dd>
                <dd className="text-[11px] font-medium text-fog dark:text-gray-400">{k}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
