import type { ReactElement } from 'react';
import { OsProvider } from './lib/os';
import { useIsDesktop } from './hooks/useIsDesktop';
import { Desktop } from './components/Desktop';
import { MobileFallback } from './components/MobileFallback';

// Root: OS state above everything, then one of two shells. Fine pointer +
// wide viewport gets the draggable desktop; everything else gets the
// launchpad fallback (defined behavior on mobile, not a broken drag).
export default function App(): ReactElement {
  return (
    <OsProvider>
      <Shell />
    </OsProvider>
  );
}

function Shell(): ReactElement {
  const desktop = useIsDesktop();
  return (
    <div className="h-full">
      <a
        href="#desk-start"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-marigold focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        Skip to desktop
      </a>
      <span id="desk-start" className="sr-only">Desktop start</span>
      {desktop ? <Desktop /> : <MobileFallback />}
    </div>
  );
}
