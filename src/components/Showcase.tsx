/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera } from 'lucide-react';
import { MotifStar } from './MotifStar';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  src: string;
  accentBg: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "dinamicas",
    title: "Juegos con lazos y rondas",
    subtitle: "Dinámicas grupales para todas las edades sin que ningún niño se quede sentado.",
    tag: "Dinámicas",
    src: "/images/recreacion-dinamicas.jpeg",
    accentBg: "#E8DCF8",
  },
  {
    id: "baile",
    title: "Baile e integración familiar",
    subtitle: "Papás, tíos y niños bailando y concursando juntos en la pista.",
    tag: "Música en vivo",
    src: "/images/baile-familiar.jpeg",
    accentBg: "#FFD166",
  },
  {
    id: "personajes",
    title: "Vestuarios y caracterización",
    subtitle: "Personajes cuidados al detalle para sesiones de fotos temáticas.",
    tag: "Temáticas",
    src: "/images/foto-animadora-disfraz.jpeg",
    accentBg: "#FAF0F2",
  },
  {
    id: "princesas",
    title: "Momentos mágicos con los niños",
    subtitle: "Cercanía, risas y animación respetuosa con los protagonistas del día.",
    tag: "Celebración",
    src: "/images/foto-animadora-princesas.jpeg",
    accentBg: "#E2F6F0",
  },
];

export const Showcase: React.FC = () => {
  return (
    <section id="galeria" className="py-14 sm:py-20 px-4 sm:px-6 bg-canvas">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-ink text-sm sm:text-base font-semibold mb-2">
              <span className="w-1.5 h-4 rounded-full bg-accent" />
              <span>Trabajo real en eventos</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-ink tracking-tight">
              Así se viven nuestras fiestas
            </h2>
            <p className="text-base text-ink-muted mt-1 max-w-lg">
              Momentos auténticos capturados en salones, casas y eventos de Bucaramanga y alrededores.
            </p>
          </div>

          <motion.a
            href="https://www.instagram.com/sammypartyboom/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover self-start sm:self-auto touch-target-44"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Ver más en @sammypartyboom</span>
          </motion.a>
        </div>

        {/* Gallery Grid (Layered Peer Cards Pattern 54) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SHOWCASE_ITEMS.map((item) => (
            <motion.article
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 24 }}
              className="group relative rounded-3xl border-2 border-ink bg-white overflow-hidden shadow-raised flex flex-col"
            >
              {/* Image Frame with designed SVG fallback & zoom */}
              <div
                className="aspect-[4/3] w-full overflow-hidden relative"
                style={{ backgroundColor: item.accentBg }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized SVG motif illustration
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Designed Graphic Fallback if image unavailable */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center -z-10">
                  <div className="w-14 h-14 rounded-full bg-white/80 border border-ink/10 flex items-center justify-center mb-3 shadow-sm">
                    <Camera className="w-7 h-7 text-accent" />
                  </div>
                  <span className="font-display font-bold text-base text-ink">
                    {item.title}
                  </span>
                  <span className="text-xs text-ink-muted mt-1">
                    Sammy Partyboom · Bucaramanga
                  </span>
                </div>

                {/* Floating Tag Chip */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-ink/10 text-xs font-bold text-ink shadow-sm">
                    <MotifStar size={12} color="#E63956" />
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Text Body Card Overlapping Bottom */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-ink/10">
                <div>
                  <h3 className="font-display font-bold text-lg text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-xs text-ink-faint font-medium">
                  <span>Bucaramanga, Santander</span>
                  <span className="flex items-center gap-1 text-accent font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    100% Diversión
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
