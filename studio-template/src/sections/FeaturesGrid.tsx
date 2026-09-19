import type { ReactElement } from 'react';
import { BellRing, CalendarClock, CreditCard, Repeat, Split, Users } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const CARDS = [
  { icon: CalendarClock, title: 'Readable timetable', body: 'Conflicts surface before you drop a class.' },
  { icon: BellRing, title: 'Self-filling waitlist', body: 'Offers walk down the list on your timer.' },
  { icon: CreditCard, title: 'One Friday payout', body: 'Memberships and drop-ins reconciled.' },
  { icon: Users, title: 'Family accounts', body: 'Siblings, guardians and credits in one place.' },
  { icon: Repeat, title: 'Self rescheduling', body: 'Members move inside rules you set once.' },
  { icon: Split, title: 'Multi-room rotas', body: 'Share staff across sites, no clashes.' },
] as const;

// Variant B — compact six-tile grid for buyers who want a denser page.
// Same content, tighter rhythm: use one of FeaturesRows / FeaturesGrid.
export function FeaturesGrid(): ReactElement {
  return (
    <section aria-labelledby="features-grid-title" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <SectionHeading
        kicker="At a glance"
        title="One timetable, six jobs done"
        lede="The compact layout for buyers who want the full story above the fold."
        align="center"
      />
      <ul className="mt-10 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10 dark:bg-white/10">
        {CARDS.map((c) => (
          <li
            key={c.title}
            className="bg-white p-6 transition-colors hover:bg-paper dark:bg-ink-surface dark:hover:bg-white/5"
          >
            <c.icon size={22} className="text-verdant dark:text-marigold" aria-hidden="true" />
            <h3 className="font-display mt-3 text-base font-bold text-ink dark:text-white">{c.title}</h3>
            <p className="mt-1 text-sm text-fog dark:text-gray-300">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
