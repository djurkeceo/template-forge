import { useState, type ReactElement } from 'react';
import { Rnd } from 'react-rnd';
import { appMeta, type AppId } from '../lib/apps';
import { useOs } from '../lib/useOs';

interface DesktopIconProps {
  app: AppId;
  defaultX: number;
  defaultY: number;
}

// Paper-tile shortcut: chunky ink-outlined tile with an original glyph,
// label stamped beneath. Draggable via react-rnd (resizing off); a small
// move still counts as a click, so opening never fights dragging.
// Tactile press: active:scale-90 with a slight straighten of the tilt.
export function DesktopIcon({ app, defaultX, defaultY }: DesktopIconProps): ReactElement {
  const { dispatch, accent } = useOs();
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const meta = appMeta(app);

  const activeRing = accent === 'marigold' ? 'group-focus-visible:outline-marigold' : 'group-focus-visible:outline-lagoon';

  return (
    <Rnd
      position={pos}
      onDragStop={(_e, d) => setPos({ x: d.x, y: d.y })}
      enableResizing={false}
      bounds="parent"
      style={{ zIndex: 5 }}
      className="touch-none"
    >
      <button
        type="button"
        onClick={() => dispatch({ type: 'open', app })}
        aria-label={`Open ${meta.name}, ${meta.tagline}`}
        className={`group flex w-24 flex-col items-center gap-1.5 ${activeRing}`}
      >
        <span
          className={`grid h-16 w-16 rotate-[-2deg] place-items-center rounded-tile shadow-icon transition-transform group-hover:rotate-2 group-hover:scale-105 group-active:rotate-0 group-active:scale-90 ${meta.tile}`}
        >
          <meta.icon size={30} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="rounded-md border-2 border-ink bg-paper px-2 py-0.5 text-center font-mono text-[11px] font-bold leading-tight text-ink">
          {meta.name}
        </span>
      </button>
    </Rnd>
  );
}
