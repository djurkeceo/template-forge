import { useState } from 'react';
import type { ReactElement } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useLenis } from './hooks/useLenis';
import { WaveDivider } from './components/Morph';
import { Navbar } from './sections/Navbar';
import { VariantBar } from './sections/VariantBar';
import type { FeatureVariant, HeroVariant, PricingVariant } from './sections/VariantBar';
import { HeroSplit } from './sections/HeroSplit';
import { HeroCentered } from './sections/HeroCentered';
import { ProofStrip } from './sections/ProofStrip';
import { FeaturesRows } from './sections/FeaturesRows';
import { FeaturesGrid } from './sections/FeaturesGrid';
import { PricingCalculator } from './sections/PricingCalculator';
import { PricingTiers } from './sections/PricingTiers';
import { Testimonials } from './sections/Testimonials';
import { Faq } from './sections/Faq';
import { CtaCapture } from './sections/CtaCapture';
import { Customise } from './sections/Customise';
import { Footer } from './sections/Footer';

// Demo shell: sticky nav, variant switcher, then every section in rhythm order.
// Variant state lives here so buyers can see each layout swap without reloads.
// Inertial momentum scrolling (Lenis) runs app-wide, disabled for reduced motion.
export default function App(): ReactElement {
  const { dark, toggle } = useDarkMode();
  useLenis();
  const [hero, setHero] = useState<HeroVariant>('split');
  const [features, setFeatures] = useState<FeatureVariant>('rows');
  const [pricing, setPricing] = useState<PricingVariant>('both');

  return (
    <div id="top" className="min-h-screen bg-paper text-ink dark:bg-ink-deep dark:text-white">
      {/* Skip link: first tab stop, visible on focus. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-marigold focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar dark={dark} onToggleDark={toggle} />
      <VariantBar
        hero={hero}
        features={features}
        pricing={pricing}
        onHero={setHero}
        onFeatures={setFeatures}
        onPricing={setPricing}
      />

      <main id="main">
        {hero === 'split' ? <HeroSplit /> : <HeroCentered />}
        <ProofStrip />
        {features === 'rows' ? <FeaturesRows /> : <FeaturesGrid />}
        {(pricing === 'calculator' || pricing === 'both') && (
          <>
            {/* Fluid morphing divider melts the page into the dark pricing band. */}
            <WaveDivider className="bg-paper text-ink dark:bg-ink-deep dark:text-white/5" />
            <PricingCalculator />
          </>
        )}
        {(pricing === 'tiers' || pricing === 'both') && <PricingTiers />}
        <Testimonials />
        <Faq />
        <CtaCapture />
        <Customise />
      </main>

      <Footer />
    </div>
  );
}
