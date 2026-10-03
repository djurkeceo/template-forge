import type { ReactElement } from 'react';
import { Check } from 'lucide-react';
import { FEATURES, type Feature } from '../lib/content';
import { useActiveChapter } from '../hooks/useActiveChapter';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { PhoneFrame } from '../components/PhoneFrame';
import { MatchesScreen } from '../screens/MatchesScreen';
import { CookScreen } from '../screens/CookScreen';
import { PlanScreen } from '../screens/PlanScreen';
import { ShopScreen } from '../screens/ShopScreen';

const SCREENS: Record<Feature['id'], () => ReactElement> = {
  matches: MatchesScreen,
  cook: CookScreen,
  plan: PlanScreen,
  shop: ShopScreen,
};

const SCREEN_LABELS: Record<Feature['id'], string> = {
  matches: 'Simmer app showing tonight’s dinner matches',
  cook: 'Simmer app in hands-free cook mode with timer',
  plan: 'Simmer app showing the planned week of dinners',
  shop: 'Simmer app showing the grouped grocery list',
};

// Centerpiece: sticky phone + scrolling chapters. As each chapter crosses
// the viewport middle (see useActiveChapter), the phone cross-fades to its
// screen. Chapters are tall (min-h) so there's room to scroll between
// switches; dots mirror the active chapter and jump on click.
export function Features(): ReactElement {
  const { active, register } = useActiveChapter(FEATURES.length);
  const reduce = usePrefersReducedMotion();
  const current = FEATURES[active] ?? FEATURES[0]!;
  const Screen = SCREENS[current.id];

  return (
    <section id="how" aria-label="How Simmer works" className="scroll-mt-20 border-y border-crust bg-cream-deep/60 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-start justify-center gap-4">
            <PhoneFrame screen={current.id} label={SCREEN_LABELS[current.id]}>
              <Screen />
            </PhoneFrame>
            {/* Progress dots: mirror + jump target, real buttons. */}
            <div className="flex flex-col gap-2 pt-8" role="group" aria-label="Jump to a step">
              {FEATURES.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    document.getElementById(`simmer-step-${f.id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
                  }}
                  aria-label={`Go to ${f.title}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === active ? 'scale-125 bg-paprika' : 'bg-char/20 hover:bg-char/40 dark:bg-cream/25'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-[13px] font-semibold text-char/50 dark:text-cream/50" aria-live="polite">
            {current.step}: {current.title}
          </p>
        </div>

        <div>
          {FEATURES.map((f, i) => (
            <article
              key={f.id}
              id={`simmer-step-${f.id}`}
              ref={register(i)}
              aria-labelledby={`simmer-title-${f.id}`}
              className="flex min-h-[62vh] scroll-mt-32 flex-col justify-center border-b border-dashed border-char/15 py-10 last:border-0 lg:min-h-[72vh] dark:border-cream/15"
            >
              <p className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[13px] font-bold ${i === active ? 'bg-paprika text-white' : 'bg-char/10 text-char/60 dark:bg-cream/10 dark:text-cream/60'}`}>
                {f.step}
              </p>
              <h2 id={`simmer-title-${f.id}`} className="font-display mt-4 max-w-md text-3xl font-bold leading-tight text-char sm:text-4xl dark:text-cream">
                {f.title}
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-char/65 dark:text-cream/70">{f.body}</p>
              <ul className="mt-5 space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-semibold text-char/80 dark:text-cream/80">
                    <Check size={16} className="mt-0.5 shrink-0 text-basil-deep dark:text-basil-tint" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
