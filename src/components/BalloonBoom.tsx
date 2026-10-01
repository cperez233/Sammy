/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { BurstMark } from "./Reveal";

const CONFETTI = ["#E63956", "#FFC93C", "#7B3FC4", "#5EC8F2", "#FF8A3D", "#22C58B"];

type B = { id: string; name: string; light: string; mid: string; dark: string; x: number; y: number; size: number; sway: string };

// Colours from the logo: magenta BOOM, yellow PARTY, purple background.
const BALLOONS: B[] = [
  { id: "uva", name: "morado", light: "#B98AF0", mid: "#7B3FC4", dark: "#4F2390", x: 4, y: 18, size: 58, sway: "anim-sway-a" },
  { id: "sol", name: "amarillo", light: "#FFE38A", mid: "#FFC93C", dark: "#E0A10E", x: 60, y: 10, size: 56, sway: "anim-sway-b" },
  { id: "boom", name: "magenta", light: "#FF7A93", mid: "#E63956", dark: "#B81E3A", x: 28, y: 0, size: 66, sway: "anim-sway-c" },
];

const KNOT = { x: 62, y: 150 };

const Balloon: React.FC<{ b: B }> = ({ b }) => {
  const [popped, setPopped] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const t = useRef<number>();
  useEffect(() => () => window.clearTimeout(t.current), []);

  const pop = () => {
    if (popped) return;
    setPopped(true);
    const r = ref.current?.getBoundingClientRect();
    if (r)
      confetti({
        particleCount: 60,
        spread: 80,
        startVelocity: 30,
        scalar: 0.85,
        colors: CONFETTI,
        origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight },
        disableForReducedMotion: true,
      });
    t.current = window.setTimeout(() => setPopped(false), 2200);
  };

  const h = b.size * 1.2;
  return (
    <button
      ref={ref}
      type="button"
      onClick={pop}
      aria-label={`Explotar el globo ${b.name}`}
      style={{ left: b.x, top: b.y, width: b.size, height: h }}
      className="absolute grid place-items-center cursor-pointer touch-manipulation"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!popped ? (
          <motion.span
            key="b"
            className={`block w-full h-full origin-bottom ${b.sway}`}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0, transition: { duration: 0.1 } }}
            transition={{ type: "spring", stiffness: 260, damping: 12 }}
          >
            <motion.svg
              viewBox="0 0 60 72"
              className="w-full h-full overflow-visible drop-shadow-[0_10px_10px_rgba(60,20,70,0.25)]"
              whileHover={{ scale: 1.08, rotate: -4 }}
              whileTap={{ scale: 0.88 }}
            >
              <defs>
                <radialGradient id={`g-${b.id}`} cx="0.35" cy="0.3" r="0.75">
                  <stop offset="0" stopColor={b.light} />
                  <stop offset="0.55" stopColor={b.mid} />
                  <stop offset="1" stopColor={b.dark} />
                </radialGradient>
              </defs>
              <path
                d="M30 2C14 2 4 15 4 30c0 17 13 30 24 34h4c11-4 24-17 24-34C56 15 46 2 30 2Z"
                fill={`url(#g-${b.id})`}
                stroke="#22142B"
                strokeWidth="2.5"
              />
              <path d="M27 64h6l-1.5 5h-3z" fill={b.dark} stroke="#22142B" strokeWidth="2" strokeLinejoin="round" />
              <path d="M15 20c3-6 8-9 14-10" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".75" fill="none" />
              <circle cx="13" cy="28" r="2.4" fill="#fff" opacity=".75" />
            </motion.svg>
          </motion.span>
        ) : (
          <motion.span
            key="p"
            className="relative grid place-items-center"
            initial={{ scale: 0.3, rotate: -25, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 11 }}
          >
            <BurstMark className="w-[84px] h-[84px]" fill={b.mid} />
            <span className="absolute font-display font-extrabold text-[17px] text-canvas -rotate-6 [text-shadow:0_1px_0_#22142B,0_0_6px_#22142B]">
              ¡POP!
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

/** The brand toy: a cluster of three logo-coloured balloons, each one pops. */
export const BalloonBoom: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative w-[128px] h-[190px] ${className}`}>
    <svg aria-hidden="true" viewBox="0 0 128 190" className="absolute inset-0 w-full h-full overflow-visible">
      {BALLOONS.map((b) => (
        <path
          key={b.id}
          d={`M${b.x + b.size / 2} ${b.y + b.size * 1.2 - 2} Q ${(b.x + b.size / 2 + KNOT.x) / 2 + 6} ${(b.y + b.size * 1.2 + KNOT.y) / 2} ${KNOT.x} ${KNOT.y}`}
          fill="none"
          stroke="#4A3A55"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
      <path d={`M${KNOT.x} ${KNOT.y} c -6 12 8 18 -2 34`} fill="none" stroke="#4A3A55" strokeWidth="2" strokeLinecap="round" />
      <circle cx={KNOT.x} cy={KNOT.y} r="3.5" fill="#E63956" stroke="#22142B" strokeWidth="1.5" />
    </svg>
    {BALLOONS.map((b) => (
      <Balloon key={b.id} b={b} />
    ))}
  </div>
);
