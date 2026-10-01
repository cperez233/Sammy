/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { Showcase } from './components/Showcase';
import { WhatsAppComposer } from './components/WhatsAppComposer';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BottomDock } from './components/BottomDock';
import { initConsoleSignature } from './utils/signature';

export const App: React.FC = () => {
  useEffect(() => {
    initConsoleSignature();

    // Rule 16: Pause infinite CSS loops when off-screen
    const elementsToWatch = document.querySelectorAll('section, footer, [class*="anim-"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-offscreen');
          } else {
            entry.target.classList.add('is-offscreen');
          }
        });
      },
      { rootMargin: '100px 0px' }
    );

    elementsToWatch.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans selection:bg-accent/15 selection:text-accent">
        <Header />
        <main className="flex-1">
          <Hero />
          <Packages />
          <Showcase />
          <WhatsAppComposer />
          <FaqSection />
        </main>
        <Footer />
        <BottomDock />
      </div>
    </MotionConfig>
  );
};

export default App;
