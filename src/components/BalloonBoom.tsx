/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface BalloonBoomProps {
  className?: string;
}

export const BalloonBoom: React.FC<BalloonBoomProps> = ({ className = "" }) => {
  const [popped, setPopped] = useState(false);
  const [boomCount, setBoomCount] = useState(0);

  const handlePop = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const nextCount = boomCount + 1;
    setBoomCount(nextCount);
    setPopped(true);

    // Fire canvas-confetti with brand palette colors: Magenta, Sun Yellow, Lavender, Sky Blue, Teal
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#E63956', '#FFD166', '#B388EB', '#06D6A0', '#FF9F1C'],
      disableForReducedMotion: true,
    });

    // Re-inflate balloon smoothly after 1.8s so it stays reusable
    setTimeout(() => {
      setPopped(false);
    }, 1800);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <motion.button
        type="button"
        onClick={handlePop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="Tocar el globo para hacer BOOM"
        className="group relative cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-accent/30 rounded-full p-2 touch-manipulation"
      >
        {!popped ? (
          <motion.div
            key="balloon"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative flex items-center justify-center anim-float"
          >
            {/* Balloon SVG */}
            <svg
              width="110"
              height="140"
              viewBox="0 0 110 140"
              fill="none"
              className="drop-shadow-lg"
            >
              {/* Balloon String */}
              <path
                d="M55 106C55 118 51 124 57 136"
                stroke="#685970"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Balloon Knot */}
              <path
                d="M51 103L59 103L57 108L53 108Z"
                fill="#D12745"
                stroke="#211526"
                strokeWidth="1.5"
              />
              {/* Main Balloon Body (Glossy Magenta) */}
              <ellipse
                cx="55"
                cy="54"
                rx="44"
                ry="50"
                fill="url(#balloonGradient)"
                stroke="#211526"
                strokeWidth="2.5"
              />
              {/* Gloss Highlight */}
              <path
                d="M32 30C36 22 45 18 53 18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.75"
              />
              <circle cx="30" cy="38" r="2.5" fill="white" fillOpacity="0.75" />
              <defs>
                <radialGradient
                  id="balloonGradient"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(42 36) rotate(52) scale(65)"
                >
                  <stop stopColor="#FF6584" />
                  <stop offset="0.65" stopColor="#E63956" />
                  <stop offset="1" stopColor="#C41D3B" />
                </radialGradient>
              </defs>
            </svg>

            {/* Micro Badge Hint */}
            <span className="absolute -bottom-2 bg-ink text-canvas font-display text-[13px] font-bold px-3 py-1 rounded-full shadow-sm whitespace-nowrap group-hover:bg-accent transition-colors">
              ¡Tócame! 🎈
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="boom-state"
            initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
            animate={{ scale: [1, 1.25, 1], rotate: [0, 8, 0], opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center h-[140px] w-[140px]"
          >
            <div className="relative flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 4L59 30L85 16L73 42L99 50L73 58L85 84L59 70L50 96L41 70L15 84L27 58L1 50L27 42L15 16L41 30Z"
                  fill="#FFD166"
                  stroke="#211526"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute font-display font-extrabold text-2xl text-accent tracking-tighter drop-shadow-sm">
                ¡BOOM!
              </span>
            </div>
            <span className="text-[12px] font-semibold text-ink-muted mt-1">
              ¡Diversión activada! 💥
            </span>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
