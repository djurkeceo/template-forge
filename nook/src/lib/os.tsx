import { useMemo, useReducer, type ReactElement, type ReactNode } from 'react';
import { type AppId, type DeskTint } from './apps';
import { OsContext, type OsContextValue } from './os-context';
// ————————————————————————————————————————————————————————————————
// Nook window manager: one reducer owns every window. (App registry lives
// in apps.ts; this file holds state only.)
//
// Model: `order` is the z-stack bottom→top (index = z-index). New windows
// cascade from the top-left; `focused` is the topmost visible window.
// Dragging itself runs uncontrolled inside react-rnd (bounds + handle in
// Window.tsx); the reducer owns open/focus/minimize/close/theme only.
// No backend, no libraries — useReducer + context is the whole OS.
// ————————————————————————————————————————————————————————————————

export interface WinGeometry {
  x: number;
  y: number;
  w: number | string;
  h: number | string;
}

export interface WinState extends WinGeometry {
  app: AppId;
  minimized: boolean;
}

interface OsState {
  order: WinState[];
  top: number;
  accent: 'marigold' | 'lagoon';
  desk: DeskTint;
}

export type { OsState, OsAction };

type OsAction =
  // `x`/`y` is an explicit origin (e.g. beside the app's icon). When
  // omitted, fresh windows fall back to the top-left cascade. Restores
  // (existing windows) always keep their current geometry.
  | { type: 'open'; app: AppId; x?: number; y?: number }
  | { type: 'close'; app: AppId }
  | { type: 'minimize'; app: AppId }
  | { type: 'focus'; app: AppId }
  | { type: 'toggle'; app: AppId; x?: number; y?: number }
  | { type: 'accent'; accent: OsState['accent'] }
  | { type: 'desk'; desk: OsState['desk'] };

const CASCADE = 44;

function cascadeSpot(openCount: number): { x: number; y: number } {
  return { x: 90 + (openCount % 5) * CASCADE, y: 64 + (openCount % 5) * CASCADE };
}

function freshSpot(action: { x?: number; y?: number }, openCount: number): { x: number; y: number } {
  if (action.x !== undefined && action.y !== undefined) return { x: action.x, y: action.y };
  return cascadeSpot(openCount);
}

function bringToFront(order: WinState[], app: AppId): WinState[] {
  const win = order.find((w) => w.app === app);
  if (win === undefined) return order;
  return [...order.filter((w) => w.app !== app), { ...win, minimized: false }];
}

function reducer(state: OsState, action: OsAction): OsState {
  switch (action.type) {
    case 'open': {
      const existing = state.order.find((w) => w.app === action.app);
      if (existing !== undefined) return { ...state, order: bringToFront(state.order, action.app), top: state.top + 1 };
        const spot = freshSpot(action, state.order.length);
      const win: WinState = { app: action.app, minimized: false, x: spot.x, y: spot.y, w: 560, h: 430 };
      return { ...state, order: [...state.order, win], top: state.top + 1 };
    }
    case 'toggle': {
      // Dock behavior: closed → open; minimized → restore+focus;
      // focused → minimize; background → focus.
      const existing = state.order.find((w) => w.app === action.app);
      if (existing === undefined) {
      const spot = freshSpot(action, state.order.length);
        return { ...state, order: [...state.order, { app: action.app, minimized: false, x: spot.x, y: spot.y, w: 560, h: 430 }], top: state.top + 1 };
      }
      const isTop = state.order[state.order.length - 1]?.app === action.app && !existing.minimized;
      if (isTop) return { ...state, order: state.order.map((w) => (w.app === action.app ? { ...w, minimized: true } : w)) };
      return { ...state, order: bringToFront(state.order, action.app), top: state.top + 1 };
    }
    case 'close':
      return { ...state, order: state.order.filter((w) => w.app !== action.app) };
    case 'minimize':
      return { ...state, order: state.order.map((w) => (w.app === action.app ? { ...w, minimized: true } : w)) };
    case 'focus': {
      const existing = state.order.find((w) => w.app === action.app);
      if (existing === undefined || existing.minimized) return state;
      return { ...state, order: bringToFront(state.order, action.app), top: state.top + 1 };
    }
    case 'accent':
      return { ...state, accent: action.accent };
    case 'desk':
      return { ...state, desk: action.desk };
  }
}

export function OsProvider({ children }: { children: ReactNode }): ReactElement {
  const [state, dispatch] = useReducer(reducer, { order: [], top: 0, accent: 'marigold', desk: 'spruce' });

  const value = useMemo<OsContextValue>(() => {
    const visible = state.order.filter((w) => !w.minimized);
    const topWin = visible[visible.length - 1];
    return {
      ...state,
      dispatch,
      focused: topWin?.app,
      isOpen: (app) => state.order.some((w) => w.app === app),
    };
  }, [state]);

  return <OsContext.Provider value={value}>{children}</OsContext.Provider>;
}
