import type { ReactElement } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { TileArt } from './TileArt';

// Slim editorial hero: argument on the left, three-tile collage on the
// right, trust row beneath. One short load stagger — motion budget stays
// reserved for shopping actions (drawer, confirmations, hover zoom).
export function Hero({ onShopNow }: { onShopNow: () => void }): ReactElement {
  const reduce = useReducedMotion();
  const instant = reduce === true;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-fern-tint blur-3xl dark:bg-fern/20" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-10 pt-10 sm:pt-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            initial={instant ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={instant ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-fern/30 bg-fern-tint px-3.5 py-1.5 text-[13px] font-bold text-fern-deep dark:border-white/15 dark:bg-white/5 dark:text-sunbeam"
          >
            Nursery-grown · shipped in moss
          </motion.p>
          <motion.h1
            initial={instant ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={instant ? { duration: 0 } : { duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            id="hero-title"
            className="font-display mt-4 text-4xl font-bold leading-[1.04] text-forest sm:text-5xl dark:text-white"
          >
            Plants that survive your schedule.
          </motion.h1>
          <motion.p
            initial={instant ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={instant ? { duration: 0 } : { duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="mt-4 max-w-lg text-lg leading-relaxed text-forest/70 dark:text-gray-300"
          >
            Honest plants, clay planters and care goods that actually work —
            picked for real windowsills, with a 30-day root guarantee on every leaf.
          </motion.p>
          <motion.div
            initial={instant ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={instant ? { duration: 0 } : { duration: 0.55, delay: 0.24, ease: 'easeOut' }}
            className="mt-7"
          >
            <button
              type="button"
              onClick={onShopNow}
              className="inline-flex items-center gap-2 rounded-pod bg-forest px-7 py-3.5 font-bold text-white shadow-tag transition-transform hover:-translate-y-0.5 dark:bg-sunbeam dark:text-forest dark:shadow-none"
            >
              Shop bestsellers
              <ArrowDown size={18} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={instant ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={instant ? { duration: 0 } : { duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          aria-hidden="true"
          className="grid grid-cols-3 items-end gap-3"
        >
          <TileArt tile={1} icon="leaf" label="" className="aspect-[3/4] rounded-shelf" />
          <TileArt tile={3} icon="amphora" label="" className="aspect-[3/4] rounded-shelf sm:-translate-y-4" />
          <TileArt tile={2} icon="droplets" label="" className="aspect-[3/4] rounded-shelf" />
        </motion.div>
      </div>

      <dl className="relative mx-auto grid max-w-6xl gap-3 px-5 pb-12 sm:grid-cols-3">
        {[
          { icon: Truck, title: 'Free shipping over $75', body: 'Packed in moss, never in plastic peanuts.' },
          { icon: ShieldCheck, title: '30-day root guarantee', body: 'Arrives sad? We replace or refund.' },
          { icon: RotateCcw, title: 'Easy returns', body: 'Unused goods back within 30 days.' },
        ].map((t) => (
          <div key={t.title} className="flex items-start gap-3 rounded-pod border border-stone bg-white px-4 py-3 dark:border-white/10 dark:bg-forest-deep">
            <t.icon size={20} className="mt-0.5 shrink-0 text-fern-deep dark:text-sunbeam" aria-hidden="true" />
            <div>
              <dt className="text-sm font-bold text-forest dark:text-white">{t.title}</dt>
              <dd className="text-[13px] text-forest/60 dark:text-gray-400">{t.body}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
