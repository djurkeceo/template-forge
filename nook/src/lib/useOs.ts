import { useContext } from 'react';
import { OsContext, type OsContextValue } from './os-context';

// Separated from os.tsx so fast-refresh lint stays quiet
// (one component per file, one hook per file).
export function useOs(): OsContextValue {
  const ctx = useContext(OsContext);
  if (ctx === null) throw new Error('useOs must be used inside <OsProvider>');
  return ctx;
}
