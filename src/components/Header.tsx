/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ArrowUpRight } from "lucide-react";
import { BurstMark } from "./Reveal";
import { CtaButton } from "./CtaButton";
import {
  DEFAULT_WA,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  easeInOut,
  ease,
} from "../lib/site";

export const NAV_LINKS = [
  { href: "#fiestas", label: "Videos" },
  { href: "#como-es", label: "La fiesta" },
  { href: "#paquetes", label: "Planes" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#preguntas", label: "Preguntas" },
];

/** Wordmark whose letters roll on hover (motion-patterns 22). */
const RollWord: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
  <span aria-hidden="true" className={`inline-flex ${className}`}>
    {[...text].map((l, i) => (
      <span key={i} className="relative inline-block overflow-hidden leading-[1.1]">
        <span
          style={{ transitionDelay: `${i * 28}ms` }}
          className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full"
        >
          {l === " " ? " " : l}
        </span>
        <span
          style={{ transitionDelay: `${i * 28}ms` }}
          className="absolute inset-0 translate-y-full text-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
        >
          {l === " " ? " " : l}
        </span>
      </span>
    ))}
  </span>
);

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["#inicio", ...NAV_LINKS.map((l) => l.href)].forEach((h) => {
      const el = document.querySelector(h);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export const Header: React.FC = () => {
  const active = useActiveSection();
  const [hover, setHover] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const last = useRef(0);
  useMotionValueEvent(scrollY, "change", (v) => {
    setCompact(v > 40);
    // links hide while reading down, come back on any scroll up
    if (v > 600 && v > last.current + 4) setHidden(true);
    else if (v < last.current - 4 || v < 600) setHidden(false);
    last.current = v;
  });

  // Page progress line, revealed with a clip (rule 13)
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const clip = useTransform(progress, (p) => `inset(0 ${100 - p * 100}% 0 0)`);

  // Mobile overlay: lock scroll, Esc closes, focus in and back
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLink.current?.focus(), 350);
    const btn = menuBtn.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ clipPath: clip }}
        className="fixed top-0 inset-x-0 z-[80] h-[3px] bg-[repeating-linear-gradient(90deg,#E63956_0_18px,#FFC93C_18px_36px,#7B3FC4_36px_54px)]"
      />

      <header className="fixed top-0 inset-x-0 z-[70] pointer-events-none">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className={`max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-4 transition-[padding] duration-500 ${
            compact ? "pt-2.5" : "pt-3 sm:pt-5"
          }`}
        >
          {/* Brand */}
          <a
            href="#inicio"
            aria-label="Sammy Partyboom, volver al inicio"
            className={`group pointer-events-auto flex items-center gap-2.5 h-14 pl-1.5 pr-4 rounded-full transition-[background-color,box-shadow,border-color] duration-500 border-2 ${
              compact ? "bg-canvas/90 backdrop-blur-md border-ink shadow-raised" : "border-transparent"
            }`}
          >
            <span className="relative grid place-items-center w-11 h-11 shrink-0">
              <span className="absolute inset-[-5px] anim-spin-slow [animation-play-state:paused] group-hover:[animation-play-state:running] opacity-0 group-hover:opacity-100 transition-opacity">
                <BurstMark className="w-full h-full" />
              </span>
              <img
                src="/images/logo-sammy.webp"
                alt=""
                width={44}
                height={44}
                className="relative w-11 h-11 rounded-full ring-2 ring-white shadow-resting transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-95"
              />
            </span>
            <span className="leading-none font-display font-extrabold text-[17px] sm:text-[18px] tracking-tight whitespace-nowrap">
              <span className="sr-only">Sammy Partyboom</span>
              <RollWord text="Sammy" />{" "}
              <RollWord text="Partyboom" className="text-accent" />
            </span>
          </a>

          {/* Desktop: floating pill with a living indicator */}
          <AnimatePresence initial={false}>
            {!hidden && (
              <motion.nav
                key="pill"
                aria-label="Secciones"
                initial={{ y: -24, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -24, opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                onMouseLeave={() => setHover(null)}
                className="hidden lg:flex pointer-events-auto items-center gap-0.5 p-1.5 rounded-full bg-canvas/90 backdrop-blur-md border-2 border-ink shadow-pop"
              >
                {NAV_LINKS.map((l) => {
                  const isActive = active === l.href;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onMouseEnter={() => setHover(l.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative h-11 px-4 grid place-items-center rounded-full text-[15px] font-semibold transition-colors duration-300 ${
                        isActive ? "text-canvas" : "text-ink"
                      }`}
                    >
                      {hover === l.href && !isActive && (
                        <motion.span
                          layoutId="nav-hover"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                          className="absolute inset-0 rounded-full bg-festive-yellow/60"
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                          className="absolute inset-0 rounded-full bg-ink shadow-[0_6px_14px_-6px_rgba(34,20,43,.6)]"
                        >
                          <BurstMark className="absolute -top-2 -right-1.5 w-4 h-4" />
                        </motion.span>
                      )}
                      <span className="relative">{l.label}</span>
                    </a>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>

          <div className="pointer-events-auto flex items-center gap-2">
            <CtaButton href={DEFAULT_WA} external size="md" className="hidden sm:inline-flex">
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              Cotizar
            </CtaButton>

            {/* Phone: menu button that morphs into a close */}
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className={`lg:hidden relative inline-flex items-center gap-2.5 h-12 pl-4 pr-3.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-colors duration-300 ${
                open ? "bg-festive-yellow text-ink" : "bg-ink text-canvas shadow-raised ring-2 ring-canvas/25"
              }`}
            >
              {open ? "Cerrar" : "Menú"}
              <span aria-hidden="true" className="relative w-5 h-3.5">
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="absolute left-0 top-0 h-[2.5px] w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="absolute left-0 bottom-0 h-[2.5px] w-5 rounded-full bg-current"
                />
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Phone overlay: opens like a burst from the menu button */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Menú"
            initial={{ clipPath: "circle(0% at calc(100% - 52px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 52px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 52px) 40px)" }}
            transition={{ duration: 0.7, ease: easeInOut }}
            className="lg:hidden fixed inset-0 z-[65] bg-uva-deep text-canvas confetti-field flex flex-col px-6 pt-28 pb-8 overflow-y-auto"
          >
            <ul className="flex-1">
              {[{ href: "#inicio", label: "Inicio" }, ...NAV_LINKS].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.6, delay: 0.18 + i * 0.055, ease }}
                  className="border-b border-canvas/15"
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-3.5 font-display font-extrabold text-[40px] leading-none tracking-tight"
                  >
                    <span className={active === l.href ? "text-festive-yellow" : ""}>{l.label}</span>
                    <BurstMark
                      className="w-8 h-8 transition-transform duration-500 group-active:rotate-90"
                      fill={active === l.href ? "#FFC93C" : "transparent"}
                      stroke="#FBF6EE"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease }}
              className="mt-8 space-y-3"
            >
              <CtaButton href={DEFAULT_WA} external size="lg" className="w-full">
                <WhatsAppIcon className="w-5 h-5" />
                Cotizar por WhatsApp
              </CtaButton>
              <div className="flex gap-3 text-[15px]">
                <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full border-2 border-canvas/25">
                  <WhatsAppIcon className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 rounded-full border-2 border-canvas/25">
                  Instagram <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
