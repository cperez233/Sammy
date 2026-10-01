/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal, SectionLabel, BurstMark, HeadingWords } from "./Reveal";
import { ease } from "../lib/site";

const STEPS = [
  { title: "Bienvenida", text: "El animador recibe a los niños y rompe el hielo con el micrófono." },
  { title: "Juegos y rondas", text: "Dinámicas según la edad, para que nadie se quede sentado." },
  { title: "Pintucaritas y globos", text: "Cada niño sale con su carita pintada y su figura de globo." },
  { title: "Concursos y rifas", text: "Tú pones los premios; nosotros armamos el concurso." },
  { title: "Torta y cumpleaños", text: "Acompañamos el momento de cantar y partir la torta." },
  { title: "Baile final", text: "Música para niños y grandes hasta cerrar la fiesta." },
];

/**
 * Scroll-driven program (motion-patterns 45 + 51): the brand burst travels
 * along a dashed track and lights each step as it reaches it.
 */
export const HowItGoes: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [reached, setReached] = useState(-1);
  useMotionValueEvent(p, "change", (v) => setReached(Math.floor(v * (STEPS.length - 1) + 0.05)));

  const clipX = useTransform(p, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const clipY = useTransform(p, (v) => `inset(0 0 ${100 - v * 100}% 0)`);
  const left = useTransform(p, (v) => `${v * 100}%`);
  const rotate = useTransform(p, [0, 1], [0, 720]);

  return (
    <section
      id="como-es"
      className="relative -mt-6 rounded-t-[36px] sm:rounded-t-[48px] bg-uva-light shadow-sheet pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <SectionLabel>El programa de la fiesta</SectionLabel>
          <h2 className="font-display font-extrabold text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
            <HeadingWords text="¿Qué pasa en las 3 horas de animación?" />
          </h2>
          <p className="mt-4 text-[17px] text-ink-soft leading-relaxed max-w-2xl">
            De la bienvenida al último baile, nosotros llevamos la fiesta. Tú te encargas
            de los invitados y la torta. El orden se ajusta a la edad de los niños y al espacio.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-12 sm:mt-16">
          {/* Desktop track */}
          <div aria-hidden="true" className="hidden lg:block absolute left-[22px] right-[calc((100%-100px)/6-22px)] top-[22px] h-[3px]">
            <div className="absolute inset-0 border-t-[3px] border-dashed border-ink/15" />
            <motion.div style={{ clipPath: clipX }} className="absolute inset-0 border-t-[3px] border-dashed border-accent" />
            <motion.div style={{ left, rotate }} className="absolute -top-[26px] -ml-[26px] w-[52px] h-[52px] z-10 drop-shadow-[0_6px_8px_rgba(60,20,70,.35)]">
              <BurstMark className="w-full h-full" fill="#E63956" />
            </motion.div>
          </div>
          {/* Phone track */}
          <div aria-hidden="true" className="lg:hidden absolute left-[21px] top-2 bottom-16 w-[3px]">
            <div className="absolute inset-0 border-l-[3px] border-dashed border-ink/15" />
            <motion.div style={{ clipPath: clipY }} className="absolute inset-0 border-l-[3px] border-dashed border-accent" />
            <motion.div style={{ top: left, rotate }} className="absolute -left-[21px] -mt-[22px] w-[44px] h-[44px] z-10">
              <BurstMark className="w-full h-full" fill="#E63956" />
            </motion.div>
          </div>

          <ol className="relative grid gap-9 lg:gap-5 lg:grid-cols-6">
            {STEPS.map((s, i) => {
              const on = reached >= i;
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease }}
                  className="flex lg:flex-col gap-4 lg:gap-5"
                >
                  <motion.span
                    animate={{ scale: on ? 1 : 0.8 }}
                    transition={{ type: "spring", stiffness: 380, damping: 14 }}
                    className="relative shrink-0 grid place-items-center w-11 h-11"
                  >
                    <BurstMark
                      className="absolute inset-0 w-11 h-11 transition-colors"
                      fill={on ? "#FFC93C" : "#FBF6EE"}
                    />
                    <span className="relative font-display font-extrabold text-[15px]">{i + 1}</span>
                  </motion.span>
                  <div className={`pt-1 lg:pt-0 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-60"}`}>
                    <h3 className="font-display font-bold text-[20px] leading-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[16px] text-ink-soft leading-relaxed">{s.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
