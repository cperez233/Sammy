/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from 'react';
import { motion } from 'framer-motion';

interface MotifStarProps {
  className?: string;
  size?: number;
  color?: string;
  rotate?: boolean;
}

export const MotifStar: React.FC<MotifStarProps> = ({
  className = "w-5 h-5",
  size = 20,
  color = "currentColor",
  rotate = false,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      animate={rotate ? { rotate: 45 } : { rotate: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      aria-hidden="true"
    >
      <path
        d="M12 2L14.4 8.6L21.5 9.2L16.2 13.8L17.8 20.8L12 17.2L6.2 20.8L7.8 13.8L2.5 9.2L9.6 8.6L12 2Z"
        fill={color}
        stroke="#211526"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

export const BoomBurstIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2L18.8 9.6L26.5 6.5L24.2 14.2L31.5 17.5L24.2 20.8L26.5 28.5L18.8 25.4L16 33L13.2 25.4L5.5 28.5L7.8 20.8L0.5 17.5L7.8 14.2L5.5 6.5L13.2 9.6L16 2Z"
        fill="#FFD166"
        stroke="#211526"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="17.5" r="4" fill="#E63956" />
    </svg>
  );
};
