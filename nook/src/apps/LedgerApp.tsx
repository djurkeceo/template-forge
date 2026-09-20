import type { ReactElement } from 'react';
import { Download } from 'lucide-react';

// Ledger — resume timeline plus a download button that generates a plain-text
// resume on the fly (Blob + object URL). Real functionality, zero backend:
// buyers replace RESUME_TXT with their own history.
const RESUME_TXT = `ROBIN ASH — Creative Developer
Portland, OR · hello@robins-nook.example · robins-nook.example

EXPERIENCE
Senior Frontend Engineer — Fern & Field Studio (2022–now)
- Lead frontend for client dashboards; design-system owner.
- Cut p95 interaction latency 40% across the flagship app.

Product Engineer — Northloop Collective (2019–2022)
- Built scheduling and billing UI used by 1,400 small studios.
- Ran usability rounds that lifted checkout completion 22%.

UI Developer — Side Street Agency (2018–2019)
- Shipped marketing sites and festival pages for local clients.

EDUCATION
B.Sc. Interaction Design — Cascadia State University (2014–2018)

SKILLS
React, TypeScript, Tailwind, Motion, Figma, Node, Postgres, Vite
`;

export function LedgerApp(): ReactElement {
  function download(): void {
    // Blob download: create once per click, revoke right after to free memory.
    const blob = new Blob([RESUME_TXT], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robin-ash-resume.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-ink">Eight years of shipping</h2>
        <button
          type="button"
          onClick={download}
          className="flex items-center gap-2 rounded-pod border-2 border-ink bg-marigold px-4 py-2 text-sm font-bold text-ink shadow-icon transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Download size={15} aria-hidden="true" />
          Resume.txt
        </button>
      </div>

      <ol className="mt-4 space-y-0 border-l-2 border-dashed border-ink/25 pl-0" aria-label="Work history">
        {[
          { when: '2022 — now', what: 'Senior Frontend Engineer · Fern & Field Studio', note: 'Dashboards, design systems, 40% faster interactions.' },
          { when: '2019 — 2022', what: 'Product Engineer · Northloop Collective', note: 'Scheduling + billing UI for 1,400 small studios.' },
          { when: '2018 — 2019', what: 'UI Developer · Side Street Agency', note: 'Festival sites and marketing pages for local clients.' },
          { when: '2014 — 2018', what: 'B.Sc. Interaction Design · Cascadia State', note: 'Thesis on legibility in dense interfaces.' },
        ].map((r) => (
          <li key={r.what} className="relative pb-5 pl-6 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-ink bg-lagoon" />
            <p className="font-mono text-xs font-bold text-ink/50">{r.when}</p>
            <p className="text-[15px] font-bold text-ink">{r.what}</p>
            <p className="text-sm text-ink/70">{r.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
