/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Showcase } from "./components/Showcase";
import { HowItGoes } from "./components/HowItGoes";
import { Packages } from "./components/Packages";
import { WhatsAppComposer } from "./components/WhatsAppComposer";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { BottomDock } from "./components/BottomDock";
import { initConsoleSignature } from "./utils/signature";

declare global {
  interface Window {
    __hydrated?: boolean;
  }
}

export const App: React.FC = () => {
  useEffect(() => {
    window.__hydrated = true;
    initConsoleSignature();

    // Rule 16: pause CSS loops in sections that are off-screen
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting)),
      { rootMargin: "100px 0px" }
    );
    document.querySelectorAll("main > section, footer").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip">
        <a
          href="#paquetes"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-canvas focus:px-4 focus:py-3 focus:rounded-xl"
        >
          Saltar a planes y precios
        </a>
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Showcase />
          <HowItGoes />
          <Packages />
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
