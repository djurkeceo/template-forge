import type { ReactElement } from 'react';
import { AnimatePresence } from 'motion/react';
import { APPS, DESK_TINTS, type AppId } from '../lib/apps';
import { useOs } from '../lib/useOs';
import { DesktopIcon } from './DesktopIcon';
import { Dock } from './Dock';
import { MenuBar } from './MenuBar';
import { Window } from './Window';
import { FieldnotesApp } from '../apps/FieldnotesApp';
import { HuesApp } from '../apps/HuesApp';
import { LedgerApp } from '../apps/LedgerApp';
import { PostboxApp } from '../apps/PostboxApp';
import { WaypointsApp } from '../apps/WaypointsApp';

// The desk: icon field + window layer + dock under the menu bar.
// z-index = position in `order` (bottom→top); AnimatePresence lets closing
// windows play their exit before unmounting. Each app renders its own
// content component inside the shared Window chrome.
const APP_CONTENT: Record<AppId, () => ReactElement> = {
  fieldnotes: FieldnotesApp,
  waypoints: WaypointsApp,
  ledger: LedgerApp,
  postbox: PostboxApp,
  hues: HuesApp,
};

export function Desktop(): ReactElement {
  const { order, focused, desk } = useOs();

  return (
    <div className="flex h-full flex-col">
      <MenuBar />
      <div className={`relative min-h-0 flex-1 overflow-hidden ${DESK_TINTS[desk]}`}>
        {/* Icon field: one draggable tile per app, left column. */}
        {APPS.map((meta, i) => (
          <DesktopIcon key={meta.id} app={meta.id} defaultX={28} defaultY={24 + i * 116} />
        ))}

        {/* First-run hint card pinned bottom-left of the desk. */}
        {order.length === 0 && <WelcomeNote />}

        {/* Window layer. Minimized windows stay mounted but hidden so
            react-rnd keeps their drag position for restore. */}
        <AnimatePresence>
          {order.map((win, i) => {
            const Content = APP_CONTENT[win.app];
            return (
              win.minimized === false && (
                <Window key={win.app} app={win.app} z={i} active={focused === win.app} defaultX={win.x} defaultY={win.y}>
                  <Content />
                </Window>
              )
            );
          })}
        </AnimatePresence>

        <Dock />
      </div>
    </div>
  );
}

function WelcomeNote(): ReactElement {
  const { dispatch } = useOs();
  return (
    <aside aria-label="Getting started" className="absolute bottom-24 left-5 z-[5] max-w-60 rounded-card border-2 border-ink bg-paper p-4 shadow-card">
      <p className="font-display text-base font-bold text-ink">Pull up a chair.</p>
      <p className="mt-1 text-[13px] leading-snug text-ink/70">
        Drag the tiles, double-tap nothing — one click opens an app. Start with{' '}
        <button
          type="button"
          onClick={() => dispatch({ type: 'open', app: 'waypoints' })}
          className="font-bold text-lagoon underline underline-offset-2"
        >
          Waypoints
        </button>{' '}
        for the work.
      </p>
    </aside>
  );
}
