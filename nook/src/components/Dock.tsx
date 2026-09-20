import type { ReactElement } from 'react';
import { APPS, type AppId } from '../lib/apps';
import { useOs } from '../lib/useOs';

// Floating tray: quick-launch for every app + running indicators.
// Click behavior (via `toggle`): closed→open, minimized→restore, focused→
// minimize, background→focus. State is announced via aria-pressed/current.
export function Dock(): ReactElement {
  const { order, focused, dispatch } = useOs();

  const stateOf = (app: AppId): 'closed' | 'open' | 'minimized' | 'focused' => {
    const win = order.find((w) => w.app === app);
    if (win === undefined) return 'closed';
    if (win.minimized) return 'minimized';
    return focused === app ? 'focused' : 'open';
  };

  return (
    <nav aria-label="Dock" className="pointer-events-none absolute inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <ul className="pointer-events-auto flex items-end gap-2 rounded-2xl border-2 border-ink bg-paper px-3 py-2 shadow-dock">
        {APPS.map((meta) => {
          const st = stateOf(meta.id);
          const running = st !== 'closed';
          return (
            <li key={meta.id} className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => dispatch({ type: 'toggle', app: meta.id })}
                aria-label={
                  st === 'closed'
                    ? `Open ${meta.name}`
                    : st === 'minimized'
                      ? `Restore ${meta.name}`
                      : st === 'focused'
                        ? `Minimize ${meta.name}`
                        : `Focus ${meta.name}`
                }
                aria-current={st === 'focused' ? true : undefined}
                className={`grid h-12 w-12 place-items-center rounded-tile border-2 border-ink transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 ${
                  st === 'focused' ? '-translate-y-1 shadow-icon' : ''
                } ${meta.tile} ${st === 'minimized' ? 'opacity-60 saturate-50' : ''}`}
              >
                <meta.icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full transition-colors ${running ? 'bg-ink' : 'bg-transparent'}`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
