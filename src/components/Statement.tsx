/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BurstMark } from "./Reveal";

const Char: React.FC<{ c: string; p: MotionValue<number>; range: [number, number]; accent?: boolean }> = ({
  c,
  p,
  range,
  accent,
}) => {
  const opacity = useTransform(p, range, [0.14, 1]);
  const y = useTransform(p, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${accent ? "text-accent" : ""}`}>
      {c}
    </motion.span>
  );
};

const LINES = ["No hacemos fiestas.", "Hacemos BOOM."];

/** The brand line from Instagram, lighting up while you read it (motion-patterns 27). */
export const Statement: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const burstScale = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const burstRotate = useTransform(scrollYProgress, [0.75, 1], [-90, 0]);

  const total = LINES.join("").length;
  let idx = 0;

  return (
    <section aria-label="Nuestra forma de hacer fiestas" className="relative px-4 sm:px-6 py-16 sm:py-24">
      <div ref={ref} className="relative max-w-6xl mx-auto">
        <p
          aria-label={LINES.join(" ")}
          className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,11vw,8.5rem)]"
        >
          {LINES.map((line, li) => (
            <span key={li} aria-hidden="true" className={`block ${li === 1 ? "sm:pl-[12%]" : ""}`}>
              {line.split(" ").map((word, wi, arr) => (
                <React.Fragment key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {[...word].map((c) => {
                      const i = idx++;
                      const start = (i / total) * 0.85;
                      return (
                        <Char
                          key={i}
                          c={c}
                          p={scrollYProgress}
                          range={[start, start + 0.15]}
                          accent={word.startsWith("BOOM")}
                        />
                      );
                    })}
                  </span>
                  {wi < arr.length - 1 ? (idx++, " ") : null}
                </React.Fragment>
              ))}
            </span>
          ))}
        </p>
        <motion.div
          aria-hidden="true"
          style={{ scale: burstScale, rotate: burstRotate }}
          className="absolute right-0 bottom-[-6%] sm:right-[4%] w-20 h-20 sm:w-32 sm:h-32"
        >
          <BurstMark className="w-full h-full anim-wiggle" />
        </motion.div>
        <p className="mt-6 text-[16px] font-semibold text-ink-muted sm:pl-[12%]">
          Así lo dice nuestro Instagram, @sammypartyboom
        </p>
      </div>
    </section>
  );
};
