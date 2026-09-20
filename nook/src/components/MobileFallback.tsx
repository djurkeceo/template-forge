import { useState, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';
import { APPS, appMeta, type AppId } from '../lib/apps';
import { useOs } from '../lib/useOs';
import { MenuBar } from './MenuBar';
import { FieldnotesApp } from '../apps/FieldnotesApp';
import { HuesApp } from '../apps/HuesApp';
import { LedgerApp } from '../apps/LedgerApp';
import { PostboxApp } from '../apps/PostboxApp';
import { WaypointsApp } from '../apps/WaypointsApp';

const APP_CONTENT: Record<AppId, () => ReactElement> = {
  fieldnotes: FieldnotesApp,
  waypoints: WaypointsApp,
  ledger: LedgerApp,
  postbox: PostboxApp,
  hues: HuesApp,
};

// Touch fallback: draggable windows don't work without a fine pointer, so
// small screens get a launchpad grid + full-screen sheets reusing the exact
// same app components. No drag library loads meaningfully here — Rnd never
// mounts on this path.
export function MobileFallback(): ReactElement {
  const [open, setOpen] = useState<AppId | null>(null);
  const reduce = useReducedMotion();
  const { desk } = useOs();

  const deskBg = desk === 'pine' ? 'bg-spruce-pine' : desk === 'deep' ? 'bg-spruce-deep' : 'desk-felt';
  const Content = open === null ? null : APP_CONTENT[open];

  return (
    <div className="flex h-full flex-col">
      <MenuBar />
      <div className={`min-h-0 flex-1 overflow-y-auto ${deskBg}`}>
        <div className="mx-auto max-w-md px-5 pb-16 pt-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-paper/60">robin's nook</p>
          <h1 className="font-display mt-1 text-3xl font-bold text-paper">Tap an app to open it</h1>
          <ul className="mt-6 grid grid-cols-2 gap-4">
            {APPS.map((meta) => (
              <li key={meta.id}>
                <button
                  type="button"
                  onClick={() => setOpen(meta.id)}
                  className="flex w-full flex-col items-center gap-2 rounded-card border-2 border-ink bg-paper p-5 shadow-card transition-transform active:scale-95"
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-tile border-2 border-ink ${meta.tile}`}>
                    <meta.icon size={26} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-display text-base font-bold text-ink">{meta.name}</span>
                  <span className="text-xs text-ink/60">{meta.tagline}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && Content !== null && (
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={`${appMeta(open).name} app`}
            initial={reduce ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-0 z-50 flex flex-col bg-paper"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b-2 border-ink bg-paper-dim px-4">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex items-center gap-1.5 rounded-pod border-2 border-ink bg-paper px-3 py-1.5 text-sm font-bold text-ink"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                All apps
              </button>
              <p className="font-mono text-sm font-bold text-ink">{appMeta(open).name.toLowerCase()}.app</p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={`Close ${appMeta(open).name}`}
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-marigold text-ink"
              >
                <X size={15} strokeWidth={3} aria-hidden="true" />
              </button>
            </div>
            <div className="win-scroll min-h-0 flex-1 overflow-y-auto">
              <Content />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
