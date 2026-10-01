/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotifStar } from './MotifStar';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "anticipacion",
    question: "¿Con cuánta anticipación se debe reservar la fecha?",
    answer: "Recomendamos apartar con 1 a 2 semanas de anticipación, especialmente para sábados y domingos en la tarde, que son los horarios más solicitados en Bucaramanga.",
  },
  {
    id: "cobertura",
    question: "¿Qué zonas de Santander cubren con sus eventos?",
    answer: "Atendemos Bucaramanga y toda su área metropolitana: Floridablanca (Cañaveral), Girón y Piedecuesta. Vamos a salones sociales de conjuntos cerrados, casas particulares, colegios y sedes campestres.",
  },
  {
    id: "premios",
    question: "¿Quién aporta los premios para los concursos y rifas?",
    answer: "El animador se encarga de dirigir todos los concursos y dinámicas. El cliente debe tener listos los regalos o sorpresas que desee entregar a los niños durante las actividades.",
  },
  {
    id: "espacio",
    question: "¿Qué pasa si el espacio de la fiesta es reducido?",
    answer: "El animador ajusta las actividades al tamaño del lugar. Si es una sala o garaje, se priorizan juegos en ronda, trivias, concursos de baile en el puesto y globoflexia.",
  },
  {
    id: "pago",
    question: "¿Cómo se confirma la reserva del evento?",
    answer: "Nos escribes por WhatsApp al [316 8674729], validamos disponibilidad de día y hora, y se agenda el cupo con el abono inicial acordado.",
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("anticipacion");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 bg-canvas border-t border-ink/5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-2 text-ink text-sm sm:text-base font-semibold mb-2">
            <span className="w-1.5 h-4 rounded-full bg-accent" />
            <span>Preguntas frecuentes</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-ink tracking-tight">
            Respuestas claras antes de contratar
          </h2>
          <p className="text-base text-ink-muted mt-1">
            Lo que los papás suelen consultar antes de celebrar con nosotros.
          </p>
        </div>

        {/* Accordion list with Brand object as control glyph (Pattern 53) */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-ink/10 bg-white overflow-hidden transition-shadow shadow-sm hover:shadow-resting"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 touch-target-44 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-ink">
                    {faq.question}
                  </span>

                  {/* Brand Glyph (Pattern 53): Comic star rotates 45deg on open */}
                  <span className="shrink-0 p-1 rounded-full bg-festive-yellow/30 border border-ink/10 flex items-center justify-center">
                    <MotifStar size={18} color="#FFD166" rotate={isOpen} />
                  </span>
                </button>

                {/* Animated accordion (Pattern 21: keeps answers in HTML) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-ink-soft leading-relaxed border-t border-ink/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
