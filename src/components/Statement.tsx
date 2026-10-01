/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowDown } from "lucide-react";
import { BurstMark } from "./Reveal";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

const Char: React.FC<{ c: string; p: MotionValue<number>; range: [number, number] }> = ({ c, p, range }) => {
  const opacity = useTransform(p, range, [0.12, 1]);
  const y = useTransform(p, range, ["0.25em", "0em"]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {c}
    </motion.span>
  );
};

/** Characters of a phrase that light up between p0 and p1. */
const LitWords: React.FC<{ text: string; p: MotionValue<number>; from: number; to: number }> = ({ text, p, from, to }) => {
  const chars = [...text];
  const span = (to - from) / chars.length;
  let i = 0;
  return (
    <>
      {text.split(" ").map((w, wi, arr) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {[...w].map((c) => {
              const k = i++;
              const s = from + k * span;
              return <Char key={k} c={c} p={p} range={[s, s + span * 4]} />;
            })}
          </span>
          {wi < arr.length - 1 ? (i++, " ") : null}
        </React.Fragment>
      ))}
    </>
  );
};

const RAYS = [0, 40, 80, 120, 160, 200, 240, 280, 320];

/**
 * The brand manifesto as a pinned scroll scene (storytelling bridge between
 * the promise and the proof): "fiestas" gets crossed out, the page turns to
 * night and BOOM explodes. Under reduced motion it renders the final frame.
 */
export const Statement: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  // Progress computed by hand from scrollY: one plain motion value drives every
  // layer, so nothing gets hardware-accelerated out of sync with the rest.
  const { scrollY } = useScroll();
  const p = useMotionValue(0);
  const update = () => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    p.set(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)));
  };
  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const bg = useTransform(p, [0.4, 0.54], ["#FBF6EE", "#22142B"]);
  const line1Color = useTransform(p, [0.4, 0.54], ["#22142B", "rgba(251,246,238,0.42)"]);
  const line1Scale = useTransform(p, [0.42, 0.6], [1, 0.5]);
  const line1Y = useTransform(p, [0.42, 0.6], ["0vh", "-20vh"]);
  const strike = useTransform(p, [0.28, 0.4], [0, 1]);
  const strikeOpacity = useTransform(p, [0.27, 0.29], [0, 1]);
  const hacemosY = useTransform(p, [0.56, 0.66], ["110%", "0%"]);
  const boomScale = useTransform(p, [0.62, 0.74], [0.15, 1]);
  const boomRotate = useTransform(p, [0.62, 0.74], [-24, -3]);
  const boomOpacity = useTransform(p, [0.62, 0.66], [0, 1]);
  const burstScale = useTransform(p, [0.66, 0.78], [0, 1]);
  const burstRotate = useTransform(p, [0.66, 1], [-120, 30]);
  const rays = useTransform(p, [0.68, 0.8], [0, 1]);
  const raysOpacity = useTransform(p, [0.68, 0.74, 0.9], [0, 1, 0]);
  const captionOpacity = useTransform(p, [0.8, 0.9], [0, 1]);
  const captionY = useTransform(p, [0.8, 0.9], [20, 0]);
  const dots = useTransform(p, [0.5, 0.6], [0, 0.55]);

  const fired = useRef(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.72 && !fired.current) {
      fired.current = true;
      const o = { colors: ["#E63956", "#FFC93C", "#7B3FC4", "#5EC8F2", "#FBF6EE"], disableForReducedMotion: true };
      confetti({ ...o, particleCount: 90, angle: 60, spread: 70, startVelocity: 55, origin: { x: 0, y: 0.75 } });
      confetti({ ...o, particleCount: 90, angle: 120, spread: 70, startVelocity: 55, origin: { x: 1, y: 0.75 } });
    }
    if (v < 0.5) fired.current = false;
  });

  if (reduced) {
    return (
      <section aria-label="Nuestra forma de hacer fiestas" className="bg-ink text-canvas px-4 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto font-display font-extrabold tracking-[-0.04em] leading-[0.95]">
          <p className="text-[clamp(1.8rem,5vw,3.5rem)] text-canvas/45">
            No hacemos <span className="line-through decoration-accent decoration-[6px]">fiestas.</span>
          </p>
          <p className="mt-3 text-[clamp(3.2rem,13vw,10rem)]">
            Hacemos <span className="text-accent">BOOM.</span>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="Nuestra forma de hacer fiestas"
      className="relative h-[200vh]"
    >
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div aria-hidden="true" style={{ opacity: dots }} className="absolute inset-0 confetti-field" />

        <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
          <p className="sr-only">No hacemos fiestas. Hacemos BOOM.</p>

          {/* Line 1: lights up, then gets crossed out and steps back */}
          <motion.p
            aria-hidden="true"
            style={{ color: line1Color, scale: line1Scale, y: line1Y }}
            className="origin-left font-display font-extrabold tracking-[-0.045em] leading-[0.95] text-[clamp(3rem,11.5vw,9rem)]"
          >
            <LitWords text="No hacemos" p={p} from={0.02} to={0.16} />{" "}
            <span className="relative inline-block whitespace-nowrap">
              <LitWords text="fiestas." p={p} from={0.14} to={0.26} />
              <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="absolute left-[-4%] top-[38%] w-[108%] h-[0.42em] overflow-visible">
                <motion.path
                  d="M6 38 C 60 18, 110 50, 160 28 S 250 14, 296 30"
                  fill="none"
                  stroke="#E63956"
                  strokeWidth="14"
                  strokeLinecap="round"
                  style={{ pathLength: strike, opacity: strikeOpacity }}
                />
              </svg>
            </span>
          </motion.p>

          {/* Line 2: the punch */}
          <div aria-hidden="true" className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-[18%] font-display font-extrabold tracking-[-0.05em] leading-[0.9] text-canvas">
            <span className="block overflow-hidden pb-[0.08em] text-[clamp(3rem,11.5vw,9rem)]">
              <motion.span style={{ y: hacemosY }} className="inline-block">
                Hacemos
              </motion.span>
            </span>
            <span className="relative inline-block mt-1 text-[clamp(5rem,23vw,17rem)]">
              <motion.span
                style={{ scale: burstScale, rotate: burstRotate }}
                className="absolute left-1/2 top-1/2 -z-0 w-[1.25em] h-[1.25em] -ml-[0.625em] -mt-[0.625em]"
              >
                <BurstMark className="w-full h-full" stroke="#FBF6EE" />
              </motion.span>
              <motion.svg
                viewBox="-60 -60 120 120"
                style={{ opacity: raysOpacity }}
                className="absolute left-1/2 top-1/2 w-[2em] h-[2em] -ml-[1em] -mt-[1em] overflow-visible"
              >
                {RAYS.map((r, i) => (
                  <motion.line
                    key={r}
                    x1="0"
                    y1="-36"
                    x2="0"
                    y2="-56"
                    transform={`rotate(${r})`}
                    stroke={["#E63956", "#5EC8F2", "#FBF6EE"][i % 3]}
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ pathLength: rays }}
                  />
                ))}
              </motion.svg>
              <motion.span
                style={{ scale: boomScale, rotate: boomRotate, opacity: boomOpacity }}
                className="relative inline-block text-accent [-webkit-text-stroke:4px_#22142B] sm:[-webkit-text-stroke:7px_#22142B] [paint-order:stroke_fill]"
              >
                BOOM.
              </motion.span>
            </span>
          </div>

          <motion.a
            href="#fiestas"
            style={{ opacity: captionOpacity, y: captionY }}
            className="absolute bottom-[15svh] lg:bottom-[6svh] right-4 sm:right-6 inline-flex items-center gap-2.5 h-12 text-[17px] font-semibold text-canvas/85 hover:text-festive-yellow transition-colors"
          >
            Mira lo que pasa cuando llegamos
            <span className="grid place-items-center w-9 h-9 rounded-full border-2 border-canvas/40">
              <ArrowDown className="w-4 h-4 anim-nudge" aria-hidden="true" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};
