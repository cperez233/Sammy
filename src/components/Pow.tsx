/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from "react";
import { motion } from "framer-motion";

const RAYS = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2 + 0.2);
const COLORS = ["#D42F4B", "#FFC93C", "#22142B", "#5EC8F2", "#7B3FC4"];

/**
 * Comic "¡pum!" rays around whatever it sits in (the brand verb for
 * landing: the nav indicator lands and the burst goes off). Mount it with a
 * new `key` to replay it (rule 18). Under reduced motion the rays only fade.
 */
export const Pow: React.FC<{ tone?: "dark" | "light" }> = ({ tone = "dark" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
  >
    {RAYS.map((a, i) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return (
        <motion.line
          key={i}
          x1={50 + c * 56}
          y1={50 + s * 64}
          x2={50 + c * 76}
          y2={50 + s * 96}
          stroke={tone === "light" && i % 5 === 2 ? "#FBF6EE" : COLORS[i % COLORS.length]}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.55, times: [0, 0.45, 1], ease: "easeOut" }}
        />
      );
    })}
  </svg>
);
