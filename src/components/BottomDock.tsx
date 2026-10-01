/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { DEFAULT_WA, springSnappy } from "../lib/site";

const LINKS = [
  { href: "#fiestas", label: "Videos" },
  { href: "#paquetes", label: "Planes" },
  { href: "#cotizar", label: "Cotizar" },
];

/** Phone-only dock: appears after the hero, hides over the footer. */
export const BottomDock: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 40 : false;
      setVisible(window.scrollY > window.innerHeight * 0.6 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex-1 grid place-items-center h-11 rounded-full text-[15px] font-semibold text-ink hover:bg-ink/5 active:bg-ink/10 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <motion.a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
              className="flex-[1.4] inline-flex items-center justify-center gap-1.5 h-11 rounded-full bg-accent text-white font-display font-bold text-[15px]"
            >
              <MessageCircle className="w-4 h-4 fill-white" aria-hidden="true" />
              WhatsApp
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
