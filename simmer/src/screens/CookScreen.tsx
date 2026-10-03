import type { ReactElement } from 'react';
import { ChevronLeft, ChevronRight, Mic, Timer } from 'lucide-react';
import { HomeBar, StatusBar } from './chrome';

// Screen 2 — Cook mode: oversized step type, thumb-sized timer, prev/next
// and a mic button for flour-covered hands-free advance. Cook mode stays
// lights-out in both themes — night cooking is the whole point.
export function CookScreen(): ReactElement {
  return (
    <div className="flex h-full flex-col bg-char text-cream">
      <StatusBar tone="light" />
      <div className="px-4 pt-1">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Step 3 of 8 · frittata</p>
        <p className="font-display mt-1 text-[21px] font-bold leading-snug">
          Pour in the eggs. Tilt the pan so rice crisps at the edges.
        </p>
      </div>
      <div className="mx-4 mt-3 flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-2.5">
        <Timer size={14} aria-hidden="true" className="text-butter" />
        <p className="font-mono text-[15px] font-semibold tabular-nums">12:40 left</p>
      </div>
      <div className="mt-auto flex items-center justify-between px-6 pb-1">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-current opacity-70" aria-hidden="true">
          <ChevronLeft size={18} />
        </span>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-paprika text-white" aria-hidden="true">
          <Mic size={20} />
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-char" aria-hidden="true">
          <ChevronRight size={18} />
        </span>
      </div>
      <HomeBar tone="light" />
    </div>
  );
}
