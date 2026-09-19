import type { ReactElement } from 'react';
import { LayoutTemplate } from 'lucide-react';

export type HeroVariant = 'split' | 'centered';
export type FeatureVariant = 'rows' | 'grid';
export type PricingVariant = 'calculator' | 'tiers' | 'both';

interface VariantBarProps {
  hero: HeroVariant;
  features: FeatureVariant;
  pricing: PricingVariant;
  onHero: (v: HeroVariant) => void;
  onFeatures: (v: FeatureVariant) => void;
  onPricing: (v: PricingVariant) => void;
}

function Group<T extends string>(props: {
  label: string;
  options: Array<{ value: T; label: string }>;
  current: T;
  onPick: (v: T) => void;
}): ReactElement {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-full text-[11px] font-bold uppercase tracking-wide text-fog sm:w-auto dark:text-gray-400">
        {props.label}
      </span>
      <div role="group" aria-label={props.label} className="flex gap-1.5 rounded-full border border-line bg-white p-1 dark:border-white/15 dark:bg-white/5">
        {props.options.map((o) => {
          const active = o.value === props.current;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => props.onPick(o.value)}
              className={`rounded-full px-3 py-1 text-[13px] font-semibold transition-colors ${
                active ? 'bg-ink text-white dark:bg-marigold dark:text-ink' : 'text-fog hover:text-ink dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Demo-only switcher: lets a buyer preview alternate layouts live.
// Anchored under the nav so it never covers content; sticky off on mobile.
export function VariantBar({ hero, features, pricing, onHero, onFeatures, onPricing }: VariantBarProps): ReactElement {
  return (
    <div id="variants" className="border-b border-line bg-white/80 backdrop-blur dark:border-white/10 dark:bg-ink-deep/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:gap-8">
        <p className="flex items-center gap-2 text-[13px] font-bold text-ink dark:text-white">
          <LayoutTemplate size={15} aria-hidden="true" className="text-verdant dark:text-marigold" />
          Demo variants — click to swap layouts
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Group<HeroVariant>
            label="Hero"
            current={hero}
            onPick={onHero}
            options={[
              { value: 'split', label: 'Week view' },
              { value: 'centered', label: 'Ticket stub' },
            ]}
          />
          <Group<FeatureVariant>
            label="Features"
            current={features}
            onPick={onFeatures}
            options={[
              { value: 'rows', label: 'Staggered rows' },
              { value: 'grid', label: 'Compact grid' },
            ]}
          />
          <Group<PricingVariant>
            label="Pricing"
            current={pricing}
            onPick={onPricing}
            options={[
              { value: 'calculator', label: 'Calculator' },
              { value: 'tiers', label: 'Tier cards' },
              { value: 'both', label: 'Both' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
