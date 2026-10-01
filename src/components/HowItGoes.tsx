/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionLabel, BurstMark } from "./Reveal";
import { ease } from "../lib/site";

const STEPS = [
  { title: "Bienvenida", text: "El animador recibe a los niños y rompe el hielo con el micrófono." },
  { title: "Juegos y rondas", text: "Dinámicas según la edad, para que nadie se quede sentado." },
  { title: "Pintucaritas y globos", text: "Cada niño sale con su carita pintada y su figura de globo." },
  { title: "Concursos y rifas", text: "Tú pones los premios; nosotros armamos el concurso." },
  { title: "Torta y cumpleaños", text: "Acompañamos el momento de cantar y partir la torta." },
  { title: "Baile final", text: "Música para niños y grandes hasta cerrar la fiesta." },
];

export const HowItGoes: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  // Reveal the dashed path with clip-path, never with scale (rule 13)
  const clipX = useTransform(scrollYProgress, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const clipY = useTransform(scrollYProgress, (v) => `inset(0 0 ${100 - v * 100}% 0)`);

  return (
    <section
      id="como-es"
      className="relative -mt-6 rounded-t-[36px] bg-uva-light shadow-sheet pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <SectionLabel>Cómo son las 3 horas</SectionLabel>
          <h2 className="font-display font-extrabold text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.03em]">
            De la bienvenida al último baile, nosotros llevamos la fiesta
          </h2>
          <p className="mt-4 text-[17px] text-ink-soft leading-relaxed">
            Tú te encargas de los invitados y la torta. El orden se ajusta a la
            edad de los niños y al espacio.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-12 sm:mt-16">
          {/* Desktop path (horizontal) */}
          <div aria-hidden="true" className="hidden lg:block absolute left-[4%] right-[4%] top-[22px] h-[3px]">
            <div className="absolute inset-0 border-t-[3px] border-dashed border-ink/15" />
            <motion.div style={{ clipPath: clipX }} className="absolute inset-0 border-t-[3px] border-dashed border-accent" />
          </div>
          {/* Mobile path (vertical) */}
          <div aria-hidden="true" className="lg:hidden absolute left-[21px] top-4 bottom-4 w-[3px]">
            <div className="absolute inset-0 border-l-[3px] border-dashed border-ink/15" />
            <motion.div style={{ clipPath: clipY }} className="absolute inset-0 border-l-[3px] border-dashed border-accent" />
          </div>

          <ol className="relative grid gap-8 lg:gap-5 lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease }}
                className="group flex lg:flex-col gap-4 lg:gap-5"
              >
                <span className="relative shrink-0 grid place-items-center w-11 h-11">
                  <BurstMark
                    className="absolute inset-0 w-11 h-11 transition-transform duration-500 group-hover:rotate-[36deg]"
                    fill={i % 2 ? "#FFC93C" : "#FBF6EE"}
                  />
                  <span className="relative font-display font-extrabold text-[15px]">{i + 1}</span>
                </span>
                <div className="pt-1 lg:pt-0">
                  <h3 className="font-display font-bold text-[20px] leading-tight">{s.title}</h3>
                  <p className="mt-1.5 text-[16px] text-ink-soft leading-relaxed">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
