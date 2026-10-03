import type { ReactElement } from 'react';
import { Apple, Play } from 'lucide-react';

// Store badges: real clickable anchors (href="#" placeholders buyers swap
// for their App Store / Play Console URLs), built from lucide glyphs + type
// — never badge images, which would be someone else's trademark art.
export function StoreBadges({ compact = false }: { compact?: boolean }): ReactElement {
  const cls = compact
    ? 'px-4 py-2 text-[13px]'
    : 'px-5 py-3 text-sm';
  const base = `flex items-center gap-2.5 rounded-xl border-2 border-char bg-char text-cream transition-transform hover:-translate-y-0.5 active:translate-y-0 dark:border-cream dark:bg-cream dark:text-char ${cls}`;

  return (
    <div className="flex flex-wrap gap-3">
      <a href="#download" className={base} aria-label="Download Simmer on the App Store">
        <Apple size={compact ? 20 : 24} aria-hidden="true" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium opacity-70">Download on the</span>
          <span className="block font-bold">App Store</span>
        </span>
      </a>
      <a href="#download" className={base} aria-label="Get Simmer on Google Play">
        <Play size={compact ? 20 : 24} aria-hidden="true" fill="currentColor" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium opacity-70">Get it on</span>
          <span className="block font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
