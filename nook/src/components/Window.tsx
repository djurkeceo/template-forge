import type { ReactElement, ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { motion, useReducedMotion } from 'motion/react';
import { Minus, X } from 'lucide-react';
import { appMeta, type AppId } from '../lib/apps';
import { useOs } from '../lib/useOs';

interface WindowProps {
  app: AppId;
  /** Stack position: index in `order` drives z-index (bottom→top). */
  z: number;
  active: boolean;
  defaultX: number;
  defaultY: number;
  children: ReactNode;
}

// Paper-card window: ink-bordered card with a mono title bar. Dragging runs
// through react-rnd (bounds="parent" keeps windows on the desk,
// dragHandleClassName restricts grabs to the title strip). Open/close play
// a spring pop; reduced motion collapses to appear/disappear.
// Keyboard: Escape closes the focused window; title buttons are native.
export function Window({ app, z, active, defaultX, defaultY, children }: WindowProps): ReactElement {
  const { dispatch } = useOs();
  const reduce = useReducedMotion();

  const meta = appMeta(app);

  function onKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Escape') dispatch({ type: 'close', app });
  }

  return (
    <Rnd
      default={{ x: defaultX, y: defaultY, width: 560, height: 430 }}
      minWidth={320}
      minHeight={260}
      bounds="parent"
      dragHandleClassName="nook-handle"
      onMouseDown={() => dispatch({ type: 'focus', app })}
      style={{ zIndex: 10 + z }}
      enableResizing={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      resizeHandleStyles={{
        right: { width: '12px', right: '-6px' },
        bottom: { height: '12px', bottom: '-6px' },
        bottomRight: { width: '18px', height: '18px' },
      }}
    >
      <motion.section
        role="dialog"
        aria-label={`${meta.name} window`}
        onKeyDown={onKeyDown}
        initial={reduce ? false : { opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 10 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
        className={`flex h-full w-full flex-col overflow-hidden rounded-card bg-paper ${
          active ? 'shadow-card' : 'shadow-card-soft'
        }`}
      >
        {/* Title strip: the ONLY drag handle (class nook-handle). */}
        <div className="nook-handle flex h-11 shrink-0 cursor-grab items-center justify-between border-b-2 border-ink bg-paper-dim px-3 active:cursor-grabbing">
          <div className="flex items-center gap-1.5" role="group" aria-label="Window controls">
            <button
              type="button"
              onClick={() => dispatch({ type: 'close', app })}
              aria-label={`Close ${meta.name}`}
              className="grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-marigold text-ink transition-transform hover:scale-110 active:scale-95"
            >
              <X size={12} strokeWidth={3} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'minimize', app })}
              aria-label={`Minimize ${meta.name}`}
              className="grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-lagoon-tint text-ink transition-transform hover:scale-110 active:scale-95"
            >
              <Minus size={12} strokeWidth={3} aria-hidden="true" />
            </button>
          </div>
          <p className="flex items-center gap-2 font-mono text-[13px] font-bold text-ink">
            <meta.icon size={14} aria-hidden="true" />
            {meta.name.toLowerCase()}.app
          </p>
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-lagoon' : 'bg-ink/25'}`} />
        </div>
        <div className="win-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>
      </motion.section>
    </Rnd>
  );
}
