/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { DEFAULT_WA, springSnappy } from "../lib/site";

export const NAV_LINKS = [
  { href: "#fiestas", label: "Fiestas reales" },
  { href: "#como-es", label: "Cómo es" },
  { href: "#paquetes", label: "Planes" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#preguntas", label: "Preguntas" },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-canvas/85 backdrop-blur-md shadow-resting" : "bg-canvas"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group min-h-[44px] rounded-full"
          aria-label="Sammy Partyboom, ir al inicio"
        >
          <motion.img
            src="/images/logo-sammy.webp"
            alt=""
            width={44}
            height={44}
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={springSnappy}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-resting ring-2 ring-white"
          />
          <span className="leading-none">
            <span className="block font-display font-extrabold text-[17px] sm:text-lg tracking-tight">
              Sammy <span className="text-accent">Partyboom</span>
            </span>
            <span className="block text-[13px] text-ink-muted font-medium mt-1">
              <span className="hidden sm:inline">Fiestas infantiles · </span>Bucaramanga
            </span>
          </span>
        </a>

        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative inline-flex items-center px-3.5 h-11 text-[15px] font-semibold transition-colors ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                        className="absolute left-3.5 right-3.5 bottom-1.5 h-[3px] rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <motion.a
          href={DEFAULT_WA}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={springSnappy}
          className="inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-full bg-ink text-canvas text-[15px] font-semibold shadow-resting hover:bg-uva-deep transition-colors"
        >
          <MessageCircle className="w-[18px] h-[18px] text-wa fill-wa" aria-hidden="true" />
          <span className="hidden xs:inline">Escríbenos</span>
          <span className="xs:hidden">WhatsApp</span>
        </motion.a>
      </div>
    </header>
  );
};
