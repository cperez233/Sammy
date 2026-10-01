/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BurstMark } from "./Reveal";
import { DEFAULT_WA, springSnappy } from "../lib/site";

const LINKS = [
  { href: "#fiestas", label: "Videos" },
  { href: "#paquetes", label: "Planes" },
  { href: "#cotizar", label: "Cotizar" },
];

/** Phone-only dock: appears after the hero, hides over the footer, marks where you are. */
export const BottomDock: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 40 : false;
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = `#${e.target.id}`;
          setActive(LINKS.some((l) => l.href === id) ? id : null);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main > section[id]").forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Accesos rápidos"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.45 }}
          className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-md flex items-center gap-1 p-1.5 rounded-full bg-canvas/95 backdrop-blur-md border-[3px] border-ink shadow-floating">
            {LINKS.map((l) => {
              const on = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={on ? "true" : undefined}
                  className={`relative flex-1 grid place-items-center h-11 rounded-full text-[15px] font-semibold transition-colors ${
                    on ? "text-canvas" : "text-ink active:bg-ink/10"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="dock-active"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    >
                      <BurstMark className="absolute -top-2 -right-1 w-4 h-4" />
                    </motion.span>
                  )}
                  <motion.span
                    key={on ? "on" : "off"}
                    initial={on ? { y: -4 } : false}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 12 }}
                    className="relative"
                  >
                    {l.label}
                  </motion.span>
                </a>
              );
            })}
            <motion.a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
              className="flex-[1.4] inline-flex items-center justify-center gap-1.5 h-11 rounded-full bg-accent text-white font-display font-bold text-[15px]"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
