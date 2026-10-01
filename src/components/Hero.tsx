/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowDown, Sparkles } from 'lucide-react';
import { BalloonBoom } from './BalloonBoom';

const ease = [0.22, 1, 0.36, 1] as const;

function SplitWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease,
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow badge: Section label in text font, sentence case (SKILL.md rule 46 & step 2) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-festive-lavender/60 border border-ink/5 text-ink text-sm sm:text-base font-semibold mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>Fiestas y eventos infantiles en Bucaramanga</span>
        </motion.div>

        {/* Selected Headline: Opción 1 with Word-by-word reveal */}
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.15] max-w-3xl mb-5">
          <SplitWords text="Menos fiestas aburridas," />
          <br className="hidden xs:inline" />
          <SplitWords
            text="más momentos que hacen BOOM."
            className="text-accent"
            delay={0.15}
          />
        </h1>

        {/* Clear subtitle with concrete offer */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-base sm:text-lg md:text-xl text-ink-soft max-w-xl leading-relaxed mb-8"
        >
          Recreación dinámica, sonido bluetooth, pintucaritas y globoflexia.
          Los niños juegan de principio a fin y los papás disfrutan la fiesta sin estrés.
        </motion.p>

        {/* Brand Motif Interaction: Opción A (El Globo Boom) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mb-8"
        >
          <BalloonBoom />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <motion.a
            href="https://wa.me/573168674729?text=Hola%20Sammy%20Partyboom,%20quiero%20cotizar%20una%20fiesta%20infantil%20en%20Bucaramanga"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-white font-display font-bold text-base shadow-raised hover:bg-accent-hover transition-colors touch-target-44"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Cotizar fecha por WhatsApp</span>
          </motion.a>

          <motion.a
            href="#paquetes"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-canvas border border-ink/15 text-ink font-semibold text-base hover:bg-ink/5 transition-colors touch-target-44"
          >
            <span>Ver paquetes y precios</span>
            <ArrowDown className="w-4 h-4 text-ink-muted" />
          </motion.a>
        </motion.div>

        {/* Layered Hero Image Card (Pattern 54 & 6: Overlap depth) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative w-full max-w-lg mt-10"
        >
          {/* Ambient colored backdrop layer */}
          <div className="absolute inset-0 bg-festive-yellow/40 rounded-3xl transform rotate-1 scale-[1.02] -z-10" />
          <div className="absolute inset-0 bg-festive-lavender/50 rounded-3xl transform -rotate-1 scale-[1.01] -z-10" />

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-floating">
            <div className="aspect-[4/3] w-full overflow-hidden bg-festive-lavender/30 relative">
              <img
                src="/images/foto-animadora-princesas.jpeg"
                alt="Animadora de Sammy Partyboom con niñas disfrazadas en evento de Bucaramanga"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Designed fallback in case photo is missing or still loading */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center -z-10">
                <Sparkles className="w-12 h-12 text-accent mb-2 animate-bounce" />
                <span className="font-display font-bold text-lg text-ink">
                  ¡Animación temática en vivo!
                </span>
                <span className="text-sm text-ink-muted">
                  Bucaramanga, Santander
                </span>
              </div>
            </div>

            {/* Overlapping Info Strip */}
            <div className="p-4 sm:p-5 bg-white border-t border-ink/10 flex items-center justify-between gap-3 text-left">
              <div>
                <p className="font-display font-bold text-sm sm:text-base text-ink">
                  Animación infantil y recreación temática
                </p>
                <p className="text-[13px] sm:text-sm text-ink-muted">
                  Juegos, pintucaritas, globoflexia y concursos
                </p>
              </div>
              <span className="shrink-0 text-[13px] font-bold px-3 py-1.5 rounded-full bg-festive-yellow text-ink border border-ink/10">
                100% Real
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
