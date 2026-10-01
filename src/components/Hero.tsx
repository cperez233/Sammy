/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { BalloonBoom } from "./BalloonBoom";
import { LoopVideo } from "./LoopVideo";
import { DEFAULT_WA, ease, springSnappy } from "../lib/site";

function Words({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.055, ease }}
          >
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="grain relative overflow-x-clip pt-6 pb-16 sm:pt-10 lg:pt-14 lg:pb-24 px-4 sm:px-6"
    >
      {/* Ambient: one soft lavender halo behind the media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 right-[-20%] top-[18%] w-[80vw] max-w-[760px] aspect-square rounded-full bg-uva-light blur-3xl opacity-80 lg:right-[-6%] lg:top-[4%]"
      />

      <div className="max-w-6xl mx-auto grid gap-y-8 lg:gap-x-14 lg:grid-cols-[1.35fr_1fr] [grid-template-areas:'text''media''actions'] lg:[grid-template-areas:'text_media''actions_media']">
        {/* Text */}
        <div className="[grid-area:text] lg:self-end">
          <motion.p {...fade(0)} className="text-[15px] sm:text-base font-semibold text-ink/85 mb-4 sm:mb-5">
            Animación y recreación infantil en Bucaramanga
          </motion.p>

          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.98] text-[clamp(2.65rem,9.6vw,4.6rem)]">
            <Words text="Menos fiestas aburridas," />{" "}
            <Words text="más momentos que hacen" delay={0.2} />{" "}
            <span className="relative inline-block whitespace-nowrap">
              <Words text="BOOM." className="text-accent" delay={0.5} />
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                className="absolute left-0 -bottom-1 sm:-bottom-2 w-[92%] h-3 sm:h-4"
              >
                <motion.path
                  d="M4 16C60 6 140 4 296 12"
                  fill="none"
                  stroke="#FFC93C"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.0, ease }}
                />
              </motion.svg>
            </span>
          </h1>

          <motion.p
            {...fade(0.45)}
            className="mt-6 sm:mt-7 text-[17px] sm:text-lg lg:text-xl leading-relaxed text-ink-soft max-w-[34rem]"
          >
            Un animador con micrófono y parlante, juegos de principio a fin,
            pintucaritas y globoflexia. Los niños no se quedan sentados y tú
            disfrutas la fiesta.
          </motion.p>
        </div>

        {/* Media: real party video, layered */}
        <div className="[grid-area:media] relative mx-auto w-full max-w-[420px] lg:max-w-[440px] lg:self-center pt-4 pb-10 lg:py-0">
          <motion.div
            style={{ y: backY }}
            aria-hidden="true"
            className="absolute inset-x-6 top-4 bottom-10 lg:inset-y-0 rounded-[32px] bg-festive-yellow rotate-[7deg] translate-x-2 border-[3px] border-ink"
          />
          <motion.div
            style={{ y: backY }}
            aria-hidden="true"
            className="absolute inset-x-3 top-4 bottom-10 lg:inset-y-0 rounded-[32px] bg-uva -rotate-[6deg] -translate-x-2 border-[3px] border-ink"
          />

          <motion.div style={{ y: frameY }} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="relative"
          >
            <LoopVideo
              eager
              src="/media/hero-baile.mp4"
              poster="/media/hero-baile.jpg"
              label="Video real: la animadora de Sammy Partyboom dirige un baile con los niños"
              className="aspect-[4/5] rounded-[28px] border-[3px] border-ink bg-uva-light shadow-floating"
            />

            {/* Floating chip over the photo */}
            <span className="absolute top-4 left-4 inline-flex items-center h-8 px-3 rounded-full bg-canvas/95 text-[13px] font-semibold text-ink shadow-resting">
              Video real de una fiesta
            </span>

            {/* Price card riding over the bottom edge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="absolute -bottom-8 left-4 right-10 sm:right-16 lg:-left-10 lg:right-auto lg:w-[290px] rounded-2xl bg-canvas border-[3px] border-ink shadow-pop-lg p-4"
            >
              <p className="text-[13px] font-semibold text-ink-muted">Paquete más pedido · 3 horas</p>
              <p className="mt-0.5 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[2rem] leading-none tracking-tight">
                  $200.000
                </span>
                <span className="text-[14px] text-ink-soft font-medium">con sonido</span>
              </p>
            </motion.div>
          </motion.div>
          </motion.div>

          {/* The brand motif, tappable */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springSnappy, delay: 1.1 }}
            className="absolute -top-6 -right-2 sm:-right-6 lg:-top-10 lg:-right-10 z-10"
          >
            <BalloonBoom />
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div {...fade(0.6)} className="[grid-area:actions] lg:self-start">
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href={DEFAULT_WA}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97, y: 0 }}
              transition={springSnappy}
              className="group inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full bg-accent text-white font-display font-bold text-[17px] border-[3px] border-ink shadow-pop hover:shadow-pop-lg hover:bg-accent-hover transition-[background-color,box-shadow]"
            >
              <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
              Cotizar mi fecha por WhatsApp
            </motion.a>
            <a
              href="#paquetes"
              className="group inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full text-ink font-semibold text-[16px] hover:bg-ink/5 transition-colors"
            >
              Ver planes y precios
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-3 max-w-[34rem] divide-x divide-ink/15 border-y border-ink/15 text-left">
            {[
              ["3 h", "de juegos y música"],
              ["4", "municipios del área"],
              ["1–2", "semanas para reservar"],
            ].map(([n, t]) => (
              <li key={t} className="py-3.5 px-3 first:pl-0">
                <span className="block font-display font-extrabold text-2xl sm:text-[28px] leading-none">{n}</span>
                <span className="block text-[13px] sm:text-[14px] text-ink-muted mt-1 leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
