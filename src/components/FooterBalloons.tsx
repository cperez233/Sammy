/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BALLOONS = [
  { left: "12%", color: "#FF5A36", delay: "0s", dur: "11s" },
  { left: "42%", color: "#FFC93C", delay: "-4s", dur: "13s" },
  { left: "70%", color: "#F4EFE6", delay: "-8s", dur: "12s" },
  { left: "88%", color: "#FF5A36", delay: "-2s", dur: "14s" },
];

const CONFETTI = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  return { x: Math.cos(a) * (46 + (i % 3) * 14), y: Math.sin(a) * (46 + (i % 3) * 14), c: ["#FF5A36", "#FFC93C", "#F4EFE6"][i % 3], r: i * 47 };
});

/** Balloons drift up the footer; tap one and it goes BOOM (the brand line). */
export const FooterBalloons: React.FC = () => {
  const [popped, setPopped] = useState<Record<number, number>>({});
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pop = (i: number) => {
    if (popped[i]) return;
    setPopped((p) => ({ ...p, [i]: Date.now() }));
    timers.current.push(
      window.setTimeout(() => setPopped((p) => { const n = { ...p }; delete n[i]; return n; }), 2600)
    );
  };

  return (
    <div className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none z-10">
      {BALLOONS.map((b, i) => (
        <div key={i} className="absolute bottom-0" style={{ left: b.left }}>
          <div className="anim-balloon" style={{ animationDelay: b.delay, animationDuration: b.dur }}>
            {popped[i] ? (
              <div className="relative w-14 h-16">
                <motion.span
                  initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
                  animate={{ scale: 1, opacity: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 14 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-extrabold text-xl text-festive-yellow whitespace-nowrap"
                >
                  ¡BOOM!
                </motion.span>
                {CONFETTI.map((c, k) => (
                  <motion.i
                    key={k}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    animate={{ x: c.x, y: c.y + 24, opacity: 0, rotate: c.r }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-1/2 w-2 h-3 rounded-[2px]"
                    style={{ background: c.c }}
                  />
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => pop(i)}
                aria-label="Reventar globo"
                className="pointer-events-auto relative block w-14 h-[4.6rem] touch-manipulation active:scale-95 transition-transform"
              >
                <span className="absolute inset-x-0 top-0 h-14 rounded-[50%_50%_48%_48%] shadow-[inset_-6px_-6px_0_rgba(0,0,0,.14)]" style={{ background: b.color }}>
                  <span className="absolute top-2.5 left-3 w-2.5 h-4 rounded-full bg-white/40 rotate-[20deg]" />
                </span>
                <span className="absolute left-1/2 top-14 w-0 h-0 -translate-x-1/2 border-x-[4px] border-x-transparent border-b-[6px]" style={{ borderBottomColor: b.color }} />
                <span className="absolute left-1/2 top-[3.8rem] h-3 w-px bg-canvas/40 origin-top anim-sway" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
