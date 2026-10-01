/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, Clock, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { MotifStar } from './MotifStar';

interface PackageInfo {
  id: string;
  name: string;
  badge?: string;
  summary: string;
  duration: string;
  referencePrice: string;
  priceNote: string;
  includes: string[];
  notIncluded: string;
  ctaText: string;
  whatsappMessage: string;
}

const PACKAGES: PackageInfo[] = [
  {
    id: "animacion-sonido",
    name: "Animación + Sonido",
    badge: "El más elegido",
    summary: "Recreación completa con música para que toda la fiesta se integre y baile.",
    duration: "3 Horas",
    referencePrice: "$200.000",
    priceNote: "Tarifa base de referencia en Bucaramanga. Puede variar según distancia del sector o cantidad de niños.",
    includes: [
      "1 animador profesional con micrófono",
      "Parlante bluetooth y musicalización continua",
      "Todos los momentos: bienvenida, juegos, rifas, concursos y partida de torta",
      "Pintucaritas para todos los niños",
      "Globoflexia (figuras con bombas)",
      "Integración de adultos y familiares que quieran participar",
    ],
    notIncluded: "El cliente debe tener listos los regalos y sorpresas para premiar los concursos.",
    ctaText: "Cotizar este paquete",
    whatsappMessage: "Hola Sammy Partyboom, me interesa cotizar el paquete de Animación + Sonido (3 horas, $200.000 de referencia). ¿Tienen disponibilidad?",
  },
  {
    id: "animacion-basica",
    name: "Animación sin sonido",
    summary: "Ideal para salones que ya cuentan con sonido o reuniones más pequeñas.",
    duration: "3 Horas",
    referencePrice: "Bajo cotización",
    priceNote: "Ajustado según barrio o salón en Bucaramanga y número de invitados.",
    includes: [
      "1 animador enfocado en dinámicas y juegos",
      "Rifas, bailes grupales y concursos guiados",
      "Pintucaritas y globoflexia incluidos",
      "Acompañamiento en el momento de cantar el cumpleaños y partir la torta",
    ],
    notIncluded: "No incluye parlante ni música. Requiere que el salón provea el audio.",
    ctaText: "Consultar tarifa",
    whatsappMessage: "Hola Sammy Partyboom, quiero consultar la tarifa para el paquete de Animación sin sonido.",
  },
  {
    id: "animacion-decoracion",
    name: "Animación + Decoración",
    summary: "Recreación activa combinada con ambientación y arcos temáticos de globos.",
    duration: "3 Horas de animación",
    referencePrice: "Bajo cotización",
    priceNote: "El valor depende del motivo temático y tamaño del espacio a decorar.",
    includes: [
      "Todo el programa de animación y juegos",
      "Pintucaritas y figuras de globoflexia",
      "Decoración con globos según temática elegida",
      "Montaje previo y desmontaje al finalizar",
    ],
    notIncluded: "Mobiliario especial o torta no incluidos salvo que se solicite con anticipación.",
    ctaText: "Cotizar con temática",
    whatsappMessage: "Hola Sammy Partyboom, quiero cotizar el paquete de Animación + Decoración con globos para una fiesta temática.",
  },
  {
    id: "paquete-full",
    name: "Paquete FULL",
    badge: "Solución completa",
    summary: "Animación, sonido propio y decoración para no preocuparte por nada.",
    duration: "3 Horas de show",
    referencePrice: "Bajo cotización",
    priceNote: "Cotización personalizada según temática, fecha y ubicación en Santander.",
    includes: [
      "Animador con micrófono + parlante bluetooth con playlist",
      "Pintucaritas artístico y globoflexia",
      "Decoración temática completa con globos y backing",
      "Conducción integral del evento de principio a fin",
    ],
    notIncluded: "Sorpresas y detalles a repartir se pueden añadir como servicio adicional.",
    ctaText: "Cotizar paquete FULL",
    whatsappMessage: "Hola Sammy Partyboom, quiero cotizar el paquete FULL (Animación, Sonido y Decoración) para un evento infantil.",
  },
];

const ADICIONALES = [
  {
    title: "Animador disfrazado",
    desc: "Personaje temático o disfraz especial para complementar el show (princesas, muñecos, héroes).",
  },
  {
    title: "Sorpresas personalizadas",
    desc: "Empaques y detalles temáticos listos para entregar a los niños.",
  },
  {
    title: "Camisetas personalizadas",
    desc: "Prendas estampadas con el nombre del cumpleañero y motivo del evento.",
  },
];

export const Packages: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PACKAGES[0].id);
  const currentPackage = PACKAGES.find((p) => p.id === activeTab) || PACKAGES[0];

  return (
    <section id="paquetes" className="py-14 sm:py-20 px-4 sm:px-6 bg-canvas border-t border-ink/5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header: Section label in text font, sentence case */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-ink text-sm sm:text-base font-semibold mb-2">
            <span className="w-1.5 h-4 rounded-full bg-accent" />
            <span>Paquetes para tu fiesta</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-ink tracking-tight">
            Planes claros, sin letra pequeña
          </h2>
          <p className="text-base text-ink-muted mt-2 max-w-xl">
            El valor final se adapta a la duración, la cantidad de niños y la ubicación en Bucaramanga o el área metropolitana.
          </p>
        </div>

        {/* Package Selector Tabs (Sliding Pill Pattern 6) */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {PACKAGES.map((pkg) => {
            const isSelected = activeTab === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setActiveTab(pkg.id)}
                className={`relative z-0 shrink-0 snap-start px-4 py-2.5 rounded-full text-sm font-semibold transition-colors touch-target-44 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected ? "text-canvas" : "text-ink-soft bg-white/70 hover:bg-white border border-ink/10"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="packagePill"
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className="absolute inset-0 rounded-full bg-ink shadow-sm -z-10"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{pkg.name}</span>
                  {pkg.badge && (
                    <span className={`text-[12px] px-2 py-0.5 rounded-full font-bold ${
                      isSelected ? "bg-accent text-white" : "bg-festive-yellow text-ink"
                    }`}>
                      {pkg.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Package Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPackage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border-2 border-ink bg-white p-6 sm:p-8 shadow-raised relative overflow-hidden"
          >
            {/* Top row with name & price */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-ink/10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-2xl text-ink">
                    {currentPackage.name}
                  </h3>
                  {currentPackage.badge && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-festive-yellow text-ink border border-ink/10">
                      {currentPackage.badge}
                    </span>
                  )}
                </div>
                <p className="text-base text-ink-soft mt-1.5 max-w-lg">
                  {currentPackage.summary}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-ink-muted">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Duración: <strong className="text-ink">{currentPackage.duration}</strong></span>
                </div>
              </div>

              {/* Price Block */}
              <div className="sm:text-right bg-festive-lavender/30 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-ink/5">
                <span className="text-[13px] text-ink-muted uppercase tracking-wider block font-semibold">
                  Valor estimado
                </span>
                <span className="font-display font-black text-3xl sm:text-4xl text-ink tracking-tight">
                  {currentPackage.referencePrice}
                </span>
                <span className="text-[13.5px] text-ink-muted block mt-1 max-w-[220px] sm:ml-auto">
                  {currentPackage.priceNote}
                </span>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="py-6">
              <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Qué incluye este servicio
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPackage.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-ink-soft">
                    <span className="w-5 h-5 rounded-full bg-festive-teal/20 text-festive-teal flex items-center justify-center shrink-0 mt-0.5 border border-festive-teal/30">
                      <Check className="w-3.5 h-3.5 text-ink stroke-[2.5]" />
                    </span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Honest "What is NOT included" box (Rule 3 in copy-guide) */}
            <div className="p-4 rounded-2xl bg-canvas border border-ink/10 flex items-start gap-3 text-[13.5px] text-ink-soft mb-6">
              <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink">A tener en cuenta: </strong>
                {currentPackage.notIncluded}
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-[13px] text-ink-muted text-center sm:text-left">
                📍 Servicio en Bucaramanga, Floridablanca, Girón y Piedecuesta.
              </div>
              <motion.a
                href={`https://wa.me/573168674729?text=${encodeURIComponent(currentPackage.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white font-display font-bold text-sm sm:text-base shadow-md hover:bg-accent-hover transition-colors touch-target-44"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{currentPackage.ctaText}</span>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Adicionales Disponibles */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <MotifStar size={18} color="#FFD166" />
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink">
              Servicios adicionales para complementar tu fiesta
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ADICIONALES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-ink/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-display font-bold text-base text-ink mb-1.5">
                    <Plus className="w-4 h-4 text-accent" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <span className="text-[12px] font-semibold text-accent mt-3 block">
                  Bajo cotización
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Open-ended door to WhatsApp (Skill step 3: "La oferta queda abierta") */}
        <div className="mt-8 p-6 rounded-3xl bg-festive-lavender/40 border border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-lg text-ink">
              ¿Tienes otra idea o requieres algo a tu medida?
            </h4>
            <p className="text-sm text-ink-muted mt-0.5">
              Desde fiestas en apartamentos hasta eventos escolares masivos. Cuéntanos y lo armamos.
            </p>
          </div>
          <motion.a
            href="https://wa.me/573168674729?text=Hola%20Sammy%20Partyboom,%20tengo%20una%20pregunta%20sobre%20un%20evento%20especial%20en%20Bucaramanga"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-canvas font-semibold text-sm hover:bg-ink-soft transition-colors touch-target-44"
          >
            <MessageCircle className="w-4 h-4 text-festive-teal fill-festive-teal" />
            <span>¿Otra cosa? Cuéntanos</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
