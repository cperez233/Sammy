/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { BurstMark } from "./Reveal";

const COLORS = ["#E63956", "#FFC93C", "#7B3FC4", "#5EC8F2", "#FF8A3D", "#22C58B"];

/** The "Globo Boom": tap it, it pops into a comic burst with confetti, then re-inflates. */
export const BalloonBoom: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [popped, setPopped] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pop = () => {
    if (popped) return;
    setPopped(true);
    const r = btn.current?.getBoundingClientRect();
    const origin = r
      ? { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight }
      : { x: 0.5, y: 0.4 };
    confetti({ particleCount: 70, spread: 75, startVelocity: 32, origin, colors: COLORS, scalar: 0.9, disableForReducedMotion: true });
    timer.current = window.setTimeout(() => setPopped(false), 1700);
  };

  return (
    <button
      ref={btn}
      type="button"
      onClick={pop}
      aria-label="Explotar el globo"
      className={`group relative grid place-items-center w-[104px] h-[132px] touch-manipulation cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!popped ? (
          <motion.span
            key="balloon"
            className="block"
            initial={{ scale: 0.3, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.35, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            <span className="block anim-float">
              <motion.svg
                width="92"
                height="124"
                viewBox="0 0 110 148"
                whileHover={{ scale: 1.06, rotate: 4 }}
                whileTap={{ scale: 0.9 }}
                className="drop-shadow-[0_16px_18px_rgba(60,20,70,0.28)]"
              >
                <path d="M55 106c0 12-5 18 2 30s-4 10 0 12" stroke="#4A3A55" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M50 102h10l-2.5 7h-5z" fill="#CC2645" stroke="#22142B" strokeWidth="2" strokeLinejoin="round" />
                <ellipse cx="55" cy="54" rx="44" ry="50" fill="url(#bb-g)" stroke="#22142B" strokeWidth="3" />
                <path d="M31 31c5-9 14-13 23-13" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" fill="none" />
                <circle cx="28" cy="42" r="3" fill="#fff" opacity=".8" />
                <defs>
                  <radialGradient id="bb-g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 34) rotate(55) scale(72)">
                    <stop stopColor="#FF7A93" />
                    <stop offset=".6" stopColor="#E63956" />
                    <stop offset="1" stopColor="#B81E3A" />
                  </radialGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="boom"
            className="relative grid place-items-center"
            initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 12 }}
          >
            <BurstMark className="w-[120px] h-[120px]" />
            <span className="absolute font-display font-extrabold text-[22px] text-accent -rotate-6 tracking-tight">
              ¡BOOM!
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      <span
        className={`absolute -bottom-1 text-[13px] font-semibold text-ink-soft transition-opacity ${
          popped ? "opacity-0" : "opacity-100"
        }`}
      >
        Tócalo
      </span>
    </button>
  );
};
