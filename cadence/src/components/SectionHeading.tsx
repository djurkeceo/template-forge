import type { ReactElement, ReactNode } from 'react';

interface SectionHeadingProps {
  /** Short sentence-case tag, e.g. "How the week runs". Never all-caps. */
  kicker: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

// Deliberately NOT an all-caps tracked eyebrow: a small rounded tag in
// sentence case keeps the voice friendly and avoids the generic-template tell.
export function SectionHeading({
  kicker,
  title,
  lede,
  align = 'left',
  children,
}: SectionHeadingProps): ReactElement {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <span className="inline-flex w-fit items-center rounded-full border border-line bg-white px-3 py-1 text-[13px] font-semibold text-verdant-deep dark:border-white/15 dark:bg-white/5 dark:text-marigold-soft">
        {kicker}
      </span>
      <h2 className="font-display max-w-2xl text-3xl font-bold leading-[1.05] text-ink dark:text-white sm:text-4xl">
        {title}
      </h2>
      {lede != null && lede !== '' && (
        <p className="max-w-xl text-base leading-relaxed text-fog dark:text-gray-300">{lede}</p>
      )}
      {children}
    </div>
  );
}
