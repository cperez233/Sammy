/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { springSnappy } from "../lib/site";

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const SIZES = {
  md: "h-12 px-5 text-[15px] gap-2",
  lg: "h-14 px-7 text-[17px] gap-2.5",
};
const TONES = {
  accent: "bg-accent text-white border-ink shadow-pop hover:shadow-pop-lg",
  light: "bg-accent text-white border-canvas shadow-[4px_4px_0_0_#FBF6EE] hover:shadow-[6px_6px_0_0_#FBF6EE]",
  ink: "bg-ink text-canvas border-ink shadow-[4px_4px_0_0_#FFC93C] hover:shadow-[6px_6px_0_0_#FFC93C]",
};

/**
 * Primary action (motion-patterns 43): light sweep and arrow swap on hover,
 * slight magnetic pull on fine pointers, press scale everywhere.
 */
export const CtaButton: React.FC<{
  href: string;
  children: React.ReactNode;
  external?: boolean;
  size?: keyof typeof SIZES;
  tone?: keyof typeof TONES;
  arrow?: boolean;
  className?: string;
}> = ({ href, children, external, size = "lg", tone = "accent", arrow = true, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const [magnetic, setMagnetic] = useState(false);
  useEffect(() => setMagnetic(canHover()), []);

  return (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!magnetic) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      transition={springSnappy}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border-[3px] font-display font-bold whitespace-nowrap transition-[box-shadow,background-color] duration-300 ${SIZES[size]} ${TONES[tone]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
      />
      {children}
      {arrow && (
        <span aria-hidden="true" className="relative w-[18px] h-[18px] overflow-hidden">
          <ArrowUpRight className="absolute inset-0 w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
          <ArrowUpRight className="absolute inset-0 w-[18px] h-[18px] -translate-x-full translate-y-full transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </motion.a>
  );
};
