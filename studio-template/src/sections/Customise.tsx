import type { ReactElement } from 'react';
import { Palette } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

// Buyer-facing customisation cheat-sheet rendered as a real page section,
// so the demo itself documents the tokens buyers will edit.
const SWATCHES: Array<{ hex: string; name: string; use: string }> = [
  { hex: '#EFF2EB', name: 'Paper', use: 'Light page base' },
  { hex: '#102542', name: 'Ink', use: 'Text + dark base' },
  { hex: '#0E7C5A', name: 'Verdant', use: 'Primary actions' },
  { hex: '#E8B44A', name: 'Marigold', use: 'Highlights only' },
  { hex: '#5C6B7A', name: 'Fog', use: 'Secondary text' },
  { hex: '#D8E0D6', name: 'Line', use: 'Borders + dividers' },
];

export function Customise(): ReactElement {
  return (
    <section id="customise" aria-labelledby="customise-title" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20">
      <div className="grid gap-8 rounded-panel border border-line bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1fr] dark:border-white/10 dark:bg-ink-surface">
        <div>
          <SectionHeading
            kicker="For template buyers"
            title="Recolour the whole demo in six hex values"
          />
          <p className="mt-4 text-[15px] leading-relaxed text-fog dark:text-gray-300">
            Edit <code className="rounded bg-paper px-1.5 py-0.5 text-[13px] font-semibold text-ink dark:bg-white/10 dark:text-white">tailwind.config.js</code> —{' '}
            <code className="rounded bg-paper px-1.5 py-0.5 text-[13px] font-semibold text-ink dark:bg-white/10 dark:text-white">paper, ink, verdant, marigold, fog, line</code> —
            and every section follows. Type is Space Grotesk for display, Inter for
            interface text, loaded once in <code className="rounded bg-paper px-1.5 py-0.5 text-[13px] font-semibold text-ink dark:bg-white/10 dark:text-white">index.html</code>.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-fog dark:text-gray-300">
            <li>Copy lives in <strong className="text-ink dark:text-white">src/lib/content.ts</strong> — swap studio names in one file.</li>
            <li>Prices live in <strong className="text-ink dark:text-white">src/lib/pricing.ts</strong> — the calculator and tier cards share one model.</li>
            <li>Dark mode is class-based — the moon button toggles <strong className="text-ink dark:text-white">.dark</strong> on <strong className="text-ink dark:text-white">&lt;html&gt;</strong>.</li>
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-ink dark:text-white">
            <Palette size={16} aria-hidden="true" className="text-verdant dark:text-marigold" />
            Base palette
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SWATCHES.map((s) => (
              <li key={s.hex} className="overflow-hidden rounded-ticket border border-line dark:border-white/10">
                <span className="block h-14" style={{ backgroundColor: s.hex }} aria-hidden="true" />
                <span className="block bg-white px-2.5 py-2 dark:bg-ink-deep">
                  <span className="block text-xs font-bold text-ink dark:text-white">{s.name} · {s.hex}</span>
                  <span className="block text-[11px] text-fog dark:text-gray-400">{s.use}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
