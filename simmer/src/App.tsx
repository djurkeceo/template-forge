import type { ReactElement } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Carousel } from './sections/Carousel';
import { Faq } from './sections/Faq';
import { Cta } from './sections/Cta';
import { Footer } from './sections/Footer';

// Demo shell: nav, hero, scroll-synced showcase, carousel, FAQ, capture.
export default function App(): ReactElement {
  const { dark, toggle } = useDarkMode();

  return (
    <div id="top" className="min-h-screen bg-cream text-char dark:bg-char-deep dark:text-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-butter focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-char"
      >
        Skip to content
      </a>
      <Navbar dark={dark} onToggleDark={toggle} />
      <main id="main">
        <Hero />
        <Features />
        <Carousel />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
