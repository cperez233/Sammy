/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BurstMark } from "./Reveal";
import { Pow } from "./Pow";
import { DEFAULT_WA, celebrateFrom, springSnappy, scrollToSection } from "../lib/site";

const LINKS = [
  { href: "#fiestas", label: "Videos" },
  { href: "#paquetes", label: "Planes" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#preguntas", label: "FAQ" },
];

/** Phone-only dock: appears after the hero, hides over the footer, marks where you are. */
export const BottomDock: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const locked = useRef(false);
  const idle = useRef(0);

  /** Tap: jump the pill straight to the target and ignore the sections scrolled past on the way. */
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    locked.current = true;
    setActive(href);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => (locked.current = false), 400);
    scrollToSection(href);
  };

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight * 0.35 : false;
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearFooter);

      if (locked.current) return;
      // Active link = the last section whose top has passed the viewport midline.
      const mid = window.innerHeight * 0.5;
      let current: string | null = null;
      document.querySelectorAll<HTMLElement>("main > section[id]").forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid) current = `#${s.id}`;
      });
      setActive(LINKS.some((l) => l.href === current) ? current : null);
    };
    const onScroll = () => {
      if (locked.current) {
        window.clearTimeout(idle.current);
        idle.current = window.setTimeout(() => {
          locked.current = false;
          update();
        }, 160);
      }
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(idle.current);
    };
  }, []);

  const idx = LINKS.findIndex((l) => l.href === active);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Accesos rápidos"
          initial={{ y: 90, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.94 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.55 }}
          className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-md flex items-center gap-1.5 p-1.5 rounded-full bg-canvas border-[3px] border-ink shadow-floating">
            <div className="relative flex flex-1 min-w-0 items-center">
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{ x: `${Math.max(idx, 0) * 100}%`, opacity: idx >= 0 ? 1 : 0 }}
                transition={{ x: { type: "spring", bounce: 0, duration: 0.4 }, opacity: { duration: 0.15 } }}
                style={{ width: `${100 / LINKS.length}%` }}
                className="absolute left-0 inset-y-0 will-change-transform"
              >
                {/* Lands with a "¡pum!": the pill squashes in, the rays go off, the burst spins (brand verb: land) */}
                {idx >= 0 && (
                  <motion.span
                    key={idx}
                    initial={{ scaleX: 0.7, scaleY: 1.15 }}
                    animate={{ scaleX: 1, scaleY: 1 }}
                    transition={{ type: "spring", stiffness: 520, damping: 14 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  >
                    <Pow />
                    <motion.span
                      initial={{ rotate: -140, scale: 0.3 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.05 }}
                      className="absolute -top-2.5 -right-1.5 w-5 h-5"
                    >
                      <BurstMark className="w-full h-full" />
                    </motion.span>
                  </motion.span>
                )}
              </motion.span>
              {LINKS.map((l) => {
                const on = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    aria-current={on ? "true" : undefined}
                    className={`relative flex-1 min-w-0 grid place-items-center h-11 rounded-full text-[14px] sm:text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                      on ? "text-canvas" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
            <motion.a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
              onClick={(e) => celebrateFrom(e.currentTarget)}
              aria-label="Escribir por WhatsApp"
              className="relative isolate overflow-hidden shrink-0 inline-flex items-center justify-center gap-1.5 h-11 w-11 min-[380px]:w-auto min-[380px]:px-3.5 rounded-full bg-accent text-white font-display font-bold text-[15px] whitespace-nowrap"
            >
              {/* A light sweep each time the dock arrives: the touch twin of the CTA hover */}
              <motion.span
                aria-hidden="true"
                initial={{ x: "-160%" }}
                animate={{ x: "260%" }}
                transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-white/35"
              />
              <WhatsAppIcon className="w-[18px] h-[18px] shrink-0" />
              <span aria-hidden="true" className="hidden min-[380px]:inline">WhatsApp</span>
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
