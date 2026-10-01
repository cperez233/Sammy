/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Reveal, SectionLabel, BurstMark, HeadingWords } from "./Reveal";
import { PHONE_DISPLAY, ease, waLink } from "../lib/site";

const FAQS = [
  {
    id: "anticipacion",
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos apartar la fecha con 1 a 2 semanas de anticipación, sobre todo para sábados y domingos en la tarde, que son los horarios más pedidos.",
  },
  {
    id: "cobertura",
    q: "¿A qué zonas van?",
    a: "Bucaramanga y su área metropolitana: Floridablanca (incluido Cañaveral), Girón y Piedecuesta. Vamos a salones sociales de conjuntos, casas, colegios y fincas cercanas.",
  },
  {
    id: "premios",
    q: "¿Quién pone los premios de los concursos y rifas?",
    a: "El animador dirige todos los concursos y dinámicas. Los regalos o sorpresas que quieras entregar a los niños los pones tú.",
  },
  {
    id: "espacio",
    q: "¿Y si el espacio es pequeño?",
    a: "El animador adapta las actividades al lugar. En una sala o un garaje se priorizan rondas, trivias, concursos de baile en el puesto y globoflexia.",
  },
  {
    id: "reserva",
    q: "¿Cómo se confirma la reserva?",
    a: `Nos escribes por WhatsApp al ${PHONE_DISPLAY}, confirmamos disponibilidad de día y hora, y la fecha queda apartada con el abono que acordemos.`,
  },
];

export const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<string | null>(FAQS[0].id);

  return (
    <section
      id="preguntas"
      className="relative -mt-8 rounded-t-[36px] sm:rounded-t-[48px] bg-canvas shadow-sheet pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 self-start">
          <SectionLabel>Preguntas frecuentes</SectionLabel>
          <h2 className="font-display font-extrabold text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
            <HeadingWords text="Lo que los papás preguntan antes de reservar" />
          </h2>
          <a
            href={waLink("Hola Sammy Partyboom, tengo una pregunta sobre una fiesta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 h-11 text-[16px] font-semibold text-accent"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span className="underline decoration-2 underline-offset-4 decoration-accent/30 group-hover:decoration-accent transition-colors">
              ¿Otra pregunta? Escríbenos
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="border-t-2 border-ink">
            {FAQS.map((f) => {
              const isOpen = open === f.id;
              return (
                <li key={f.id} className="relative border-b border-ink/15">
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute -left-4 sm:-left-6 top-5 bottom-5 w-[4px] rounded-full bg-accent origin-top"
                  />
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${f.id}`}
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      className="group w-full flex items-center justify-between gap-5 py-5 sm:py-6 text-left"
                    >
                      <span className={`font-display font-bold text-[19px] sm:text-[22px] leading-snug group-hover:text-accent transition-colors ${isOpen ? "text-accent" : ""}`}>
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 72 : 0, scale: isOpen ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="shrink-0"
                      >
                        <BurstMark className="w-8 h-8" fill={isOpen ? "#FFC93C" : "#FBF6EE"} />
                      </motion.span>
                    </button>
                  </h3>
                  {/* Answer stays in the DOM; grid rows animate the height */}
                  <div
                    id={`faq-${f.id}`}
                    className={`grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <motion.p
                        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -6 }}
                        transition={{ duration: 0.3, ease }}
                        className="pb-6 pr-12 text-[17px] text-ink-soft leading-relaxed"
                      >
                        {f.a}
                      </motion.p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
