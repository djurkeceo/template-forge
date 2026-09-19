import type { ReactElement } from 'react';
import { BellRing, CalendarClock, CreditCard, Repeat, Split, Wallet } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

const ROWS = [
  {
    icon: CalendarClock,
    title: 'A timetable your staff can read at a glance',
    body: 'Drag a class to a new room and every conflict surfaces before you drop it: instructor overlap, room capacity, equipment. The printed week sheet generates itself for the front desk.',
    accent: 'border-l-verdant',
    stat: ['12 hrs', 'saved weekly on rota fixes'],
  },
  {
    icon: BellRing,
    title: 'Waitlists that fill seats while you sleep',
    body: 'Set how long each offer lasts and Cadence walks down the list automatically. No-shows get a strike under your policy, regulars get first refusal, and the 7am gap is gone by 7:09.',
    accent: 'border-l-marigold',
    stat: ['9 min', 'median time to refill a seat'],
  },
  {
    icon: Wallet,
    title: 'Memberships, drop-ins and retail on one payout',
    body: 'Credits, class packs, sibling discounts and late-cancel fees reconcile into a single Friday statement. Refunds return to the original card in one click, with the reason logged.',
    accent: 'border-l-ink',
    stat: ['68%', 'fewer late payments in month one'],
  },
] as const;

const SECONDARY = [
  { icon: Repeat, title: 'Self rescheduling', body: 'Members move themselves inside your rules.' },
  { icon: Split, title: 'Multi-room rotas', body: 'Share staff across sites without double-booking.' },
  { icon: CreditCard, title: 'Card on file', body: 'No-show fees collect without awkward chats.' },
] as const;

// Variant A — staggered editorial rows. Each row is offset (odd rows
// indented) with a thick left accent in a rotating color, so the rhythm
// breaks away from a uniform card grid.
export function FeaturesRows(): ReactElement {
  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:py-20">
      <SectionHeading
        kicker="How the week runs"
        title="Everything after “book now” is handled"
        lede="Three jobs eat a studio manager's week. Cadence takes all three, and leaves the teaching to you."
      />
      <div className="mt-10 flex flex-col gap-6">
        {ROWS.map((row, i) => (
          <article
            key={row.title}
            className={`grid gap-5 rounded-panel border border-line bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center dark:border-white/10 dark:bg-ink-surface ${
              i % 2 === 1 ? 'lg:ml-16 border-l-8' : 'lg:mr-16 border-l-8'
            } ${row.accent}`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-ticket bg-ink text-marigold dark:bg-marigold dark:text-ink">
              <row.icon size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-ink dark:text-white">{row.title}</h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fog dark:text-gray-300">{row.body}</p>
            </div>
            <div className="lg:w-36 lg:text-right">
              <p className="font-display text-3xl font-bold text-verdant-deep dark:text-marigold">{row.stat[0]}</p>
              <p className="text-xs font-medium text-fog dark:text-gray-400">{row.stat[1]}</p>
            </div>
          </article>
        ))}
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {SECONDARY.map((s) => (
          <li
            key={s.title}
            className="rounded-ticket bg-ink px-5 py-4 text-white transition-transform hover:-translate-y-0.5 dark:bg-white/5 dark:ring-1 dark:ring-white/10"
          >
            <s.icon size={20} className="text-marigold" aria-hidden="true" />
            <p className="mt-2 text-sm font-bold">{s.title}</p>
            <p className="text-[13px] text-white/70 dark:text-gray-300">{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
