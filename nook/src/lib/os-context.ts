import { createContext } from 'react';
import type { AppId } from './apps';
import type { OsAction, OsState } from './os';

// Isolated on purpose: fast-refresh lint requires context to live in its
// own file, away from the provider component (os.tsx) and the hook (useOs).
export interface OsContextValue extends OsState {
  dispatch: React.Dispatch<OsAction>;
  /** App on top of the stack (undefined when the desk is empty). */
  focused: AppId | undefined;
  isOpen: (app: AppId) => boolean;
}

export const OsContext = createContext<OsContextValue | null>(null);
