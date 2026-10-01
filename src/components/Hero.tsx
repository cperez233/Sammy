/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { BalloonBoom } from "./BalloonBoom";
import { LoopVideo } from "./LoopVideo";
import { BurstMark } from "./Reveal";
import { CtaButton } from "./CtaButton";
import { DEFAULT_WA, ease } from "../lib/site";

function Words({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((w, i, arr) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
            <motion.span
              className={`inline-block ${className}`}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: delay + i * 0.055, ease }}
            >
              {w}
            </motion.span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </>
  );
}

/** "BOOM." pops, a comic burst explodes behind it and lines fly out. */
const BoomWord: React.FC<{ delay: number }> = ({ delay }) => {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span aria-hidden="true" className="absolute left-[46%] top-[60%] -z-10 w-[1.45em] h-[1.45em] -translate-x-1/2 -translate-y-1/2">
        <motion.span
          className="block w-full h-full"
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 13, delay: delay + 0.35 }}
        >
          <span className="block w-full h-full anim-wiggle">
            <BurstMark className="w-full h-full" stroke="#22142B" />
          </span>
        </motion.span>
        <svg viewBox="-60 -60 120 120" className="absolute inset-[-35%] w-[170%] h-[170%] overflow-visible">
          {rays.map((r, i) => (
            <motion.line
              key={r}
              x1="0"
              y1="-40"
              x2="0"
              y2="-56"
              transform={`rotate(${r + (i % 2 ? 10 : 0)})`}
              stroke={i % 3 === 0 ? "#7B3FC4" : i % 3 === 1 ? "#E63956" : "#22142B"}
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 0.9, times: [0, 0.4, 1], delay: delay + 0.4 }}
            />
          ))}
        </svg>
      </span>
      <motion.span
        className="inline-block text-accent [-webkit-text-stroke:2px_#22142B] sm:[-webkit-text-stroke:3px_#22142B] [paint-order:stroke_fill]"
        initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
        animate={{ scale: [0.4, 1.18, 1], rotate: [-10, 4, -3], opacity: 1 }}
        transition={{ duration: 0.7, delay, times: [0, 0.6, 1], ease }}
      >
        BOOM.
      </motion.span>
    </span>
  );
};

/** Pointer parallax layer (motion-patterns 49): depth in px. */
const Depth: React.FC<{
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}> = ({ mx, my, depth, className = "", children }) => {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth * 0.6);
  return (
    <motion.div aria-hidden="true" style={{ x, y }} className={`absolute pointer-events-none ${className}`}>
      {children}
    </motion.div>
  );
};

/** Round sticker with text running around a burst. */
const RoundSticker: React.FC = () => (
  <div className="relative w-[118px] h-[118px] sm:w-[132px] sm:h-[132px]">
    <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full anim-spin-slow">
      <defs>
        <path id="sticker-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="#22142B" />
      <text fill="#FBF6EE" fontSize="11" fontWeight="700" letterSpacing="1.6" fontFamily="Figtree, sans-serif">
        <textPath href="#sticker-circle">HACEMOS BOOM • BUCARAMANGA • </textPath>
      </text>
    </svg>
    <div className="absolute inset-[30%]">
      <BurstMark className="w-full h-full" stroke="#FFC93C" />
    </div>
  </div>
);

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const recedeScale = useTransform(scrollYProgress, [0.3, 1], [1, 0.94]);
  const recedeOpacity = useTransform(scrollYProgress, [0.3, 1], [1, 0.4]);

  // Pointer parallax + price card tilt, fine pointers only
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches), []);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 60, damping: 18 });
  const my = useSpring(py, { stiffness: 60, damping: 18 });
  const tiltX = useTransform(my, (v) => v * -10);
  const tiltY = useTransform(mx, (v) => v * 12);

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="grain relative overflow-x-clip pt-24 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 px-4 sm:px-6"
    >
      {/* Ambient halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 right-[-25%] top-[16%] w-[90vw] max-w-[820px] aspect-square rounded-full bg-uva-light blur-3xl opacity-90 lg:right-[-8%] lg:top-[2%]"
      />

      <motion.div
        style={{ scale: recedeScale, opacity: recedeOpacity }}
        className="origin-top max-w-6xl mx-auto grid gap-y-10 lg:gap-x-14 lg:grid-cols-[1.35fr_1fr] [grid-template-areas:'text''media''actions'] lg:[grid-template-areas:'text_media''actions_media']"
      >
        {/* Text */}
        <div className="[grid-area:text] lg:self-end">
          <h1 className="font-display">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-2 font-sans font-semibold text-[16px] sm:text-[17px] text-ink/85 mb-4 sm:mb-6"
            >
              <span className="inline-block w-6 h-[3px] rounded-full bg-accent" aria-hidden="true" />
              Animación y recreación de fiestas infantiles en Bucaramanga
            </motion.span>{" "}
            <span className="block font-extrabold tracking-[-0.035em] leading-[1.0] text-[clamp(2.7rem,9.8vw,4.9rem)]">
              <Words text="Menos fiestas aburridas," /> <Words text="más momentos que hacen" delay={0.22} />{" "}
              <BoomWord delay={0.7} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-7 sm:mt-8 text-[17px] sm:text-lg lg:text-[20px] leading-relaxed text-ink-soft max-w-[35rem]"
          >
            Llevamos un animador con micrófono y parlante, juegos de principio a fin,
            pintucaritas y globoflexia a tu fiesta en Bucaramanga, Floridablanca, Girón
            o Piedecuesta. Son <strong className="text-ink font-semibold">3 horas desde $200.000</strong>,
            y los niños no se quedan sentados.
          </motion.p>
        </div>

        {/* Media: real party video, layered, with stickers */}
        <div className="[grid-area:media] relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] lg:self-center pt-6 pb-12 lg:py-0">
          <Depth mx={mx} my={my} depth={10} className="inset-x-6 top-6 bottom-12 lg:inset-y-0">
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 7, opacity: 1 }}
              transition={{ duration: 1, delay: 0.45, ease }}
              className="w-full h-full rounded-[32px] bg-festive-yellow border-[3px] border-ink translate-x-2"
            />
          </Depth>
          <Depth mx={mx} my={my} depth={18} className="inset-x-3 top-6 bottom-12 lg:inset-y-0">
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: -6, opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="w-full h-full rounded-[32px] bg-uva border-[3px] border-ink -translate-x-2"
            />
          </Depth>

          <motion.div style={{ y: frameY }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -6, clipPath: "inset(40% 10% 40% 10% round 28px)" }}
              animate={{ opacity: 1, y: 0, rotate: -1.5, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
              transition={{ duration: 1.2, delay: 0.25, ease }}
              className="relative"
            >
              <LoopVideo
                eager
                src="/media/hero-baile.mp4"
                poster="/media/hero-baile.jpg"
                label="Video real: la animadora de Sammy Partyboom dirige un baile con los niños"
                className="aspect-[4/5] rounded-[28px] border-[3px] border-ink bg-uva-light shadow-floating"
              />
              <span className="absolute top-4 left-4 inline-flex items-center h-8 px-3 rounded-full bg-canvas/95 text-[13px] font-semibold text-ink shadow-resting">
                Video real de una fiesta
              </span>
            </motion.div>

            {/* Price card riding the bottom edge, tilts toward the pointer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              style={{ transformPerspective: 800 }}
              className="absolute -bottom-9 left-3 right-12 sm:right-20 lg:-left-12 lg:right-auto lg:w-[300px]"
            >
              <motion.div
                style={{ rotateX: fine ? tiltX : 0, rotateY: fine ? tiltY : 0 }}
                className="rounded-2xl bg-canvas border-[3px] border-ink shadow-pop-lg p-4"
              >
                <p className="text-[13px] font-semibold text-ink-muted">Animación + Sonido · 3 horas</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-[14px] text-ink-soft font-medium">desde</span>
                  <span className="font-display font-extrabold text-[2.1rem] leading-none tracking-tight">$200.000</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stickers */}
          <Depth mx={mx} my={my} depth={-26} className="hidden sm:block -left-12 top-[38%] lg:-left-20 lg:top-[30%] z-10">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1.3 }}
            >
              <RoundSticker />
            </motion.div>
          </Depth>
          <Depth mx={mx} my={my} depth={30} className="-right-3 bottom-[18%] lg:-right-12 z-10">
            <svg viewBox="0 0 90 60" className="w-20 h-14 overflow-visible">
              <motion.path
                d="M4 40 C 18 6, 30 58, 44 26 S 70 4, 86 30"
                fill="none"
                stroke="#E63956"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.5, ease }}
              />
            </svg>
          </Depth>
          <Depth mx={mx} my={my} depth={22} className="left-[42%] -top-2 lg:-top-8 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 1.6 }}
            >
              <BurstMark className="w-9 h-9 anim-wiggle" fill="#5EC8F2" />
            </motion.div>
          </Depth>

          {/* The brand toy: tap to pop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 1.2 }}
            className="absolute -top-8 -right-3 sm:-right-8 lg:-top-14 lg:-right-14 z-20"
          >
            <BalloonBoom />
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="[grid-area:actions] lg:self-start"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <CtaButton href={DEFAULT_WA} external>
              <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
              Cotizar mi fecha por WhatsApp
            </CtaButton>
            <a
              href="#paquetes"
              className="group inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full text-ink font-semibold text-[16px] hover:bg-ink/5 transition-colors"
            >
              <span className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                Ver planes y precios
              </span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-9 grid grid-cols-3 max-w-[35rem] divide-x divide-ink/15 border-y-2 border-ink">
            {[
              ["3 h", "de juegos y música"],
              ["4", "municipios del área"],
              ["1–2", "semanas para reservar"],
            ].map(([n, t], i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.08, ease }}
                className="py-3.5 px-3 first:pl-0"
              >
                <span className="block font-display font-extrabold text-2xl sm:text-[30px] leading-none">{n}</span>
                <span className="block text-[13px] sm:text-[14px] text-ink-muted mt-1 leading-snug">{t}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};
