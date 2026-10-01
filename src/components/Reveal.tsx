/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from "react";
import { motion } from "framer-motion";
import { ease } from "../lib/site";

/** Fade + rise on scroll. Children stagger when `stagger` is set. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
}> = ({ children, className, delay = 0, y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    transition={{ duration: 0.8, delay, ease }}
  >
    {children}
  </motion.div>
);

/** Section label: text font, sentence case, readable size, with the burst motif. */
export const SectionLabel: React.FC<{ children: React.ReactNode; tone?: "ink" | "light" }> = ({
  children,
  tone = "ink",
}) => (
  <p
    className={`inline-flex items-center gap-2 text-[15px] sm:text-base font-semibold mb-3 ${
      tone === "light" ? "text-canvas/85" : "text-ink/85"
    }`}
  >
    <BurstMark className="w-5 h-5" />
    {children}
  </p>
);

/** The brand motif: the comic "BOOM" burst from the logo. */
export const BurstMark: React.FC<{
  className?: string;
  fill?: string;
  stroke?: string;
}> = ({ className = "w-5 h-5", fill = "#FFC93C", stroke = "#22142B" }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <path
      d="M20 2.5l3.6 9.2 8.6-4.6-2.4 9.5 8.7 3.4-8.7 3.4 2.4 9.5-8.6-4.6L20 37.5l-3.6-9.2-8.6 4.6 2.4-9.5L1.5 20l8.7-3.4-2.4-9.5 8.6 4.6z"
      fill={fill}
      stroke={stroke}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);
