/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, MessageCircle, ArrowUpRight, Info } from "lucide-react";
import { Reveal, SectionLabel, BurstMark } from "./Reveal";
import { ease, springSnappy, waLink } from "../lib/site";

export interface PackageInfo {
  id: string;
  name: string;
  short: string;
  badge?: string;
  summary: string;
  duration: string;
  price: string | null;
  priceNote: string;
  includes: string[];
  notIncluded: string;
  cta: string;
  message: string;
}

export const PACKAGES: PackageInfo[] = [
  {
    id: "animacion-sonido",
    name: "Animación + Sonido",
    short: "Animación + Sonido",
    badge: "El más pedido",
    summary: "Recreación completa con música propia para que toda la fiesta juegue y baile.",
    duration: "3 horas",
    price: "$200.000",
    priceNote: "Valor de referencia en Bucaramanga. Puede variar según el sector y la cantidad de niños.",
    includes: [
      "1 animador con micrófono",
      "Parlante bluetooth y música toda la fiesta",
      "Bienvenida, juegos, rifas, concursos y torta",
      "Pintucaritas para todos los niños",
      "Globoflexia (figuras con globos)",
      "Integración de papás y familiares",
    ],
    notIncluded: "Los regalos y sorpresas para premiar los concursos los pone el cliente.",
    cta: "Cotizar este plan",
    message: "Hola Sammy Partyboom, me interesa el plan Animación + Sonido (3 horas, $200.000 de referencia). ¿Tienen disponibilidad?",
  },
  {
    id: "animacion-basica",
    name: "Animación sin sonido",
    short: "Sin sonido",
    summary: "Para salones que ya tienen sonido o reuniones pequeñas.",
    duration: "3 horas",
    price: null,
    priceNote: "Se ajusta según el sector o salón y el número de invitados.",
    includes: [
      "1 animador para dinámicas y juegos",
      "Rifas, bailes grupales y concursos",
      "Pintucaritas y globoflexia",
      "Momento de cantar y partir la torta",
    ],
    notIncluded: "No incluye parlante ni música: el salón debe tener audio.",
    cta: "Consultar valor",
    message: "Hola Sammy Partyboom, quiero consultar el valor del plan Animación sin sonido.",
  },
  {
    id: "animacion-decoracion",
    name: "Animación + Decoración",
    short: "+ Decoración",
    summary: "La recreación de siempre, con decoración de globos según la temática.",
    duration: "3 horas de animación",
    price: null,
    priceNote: "Depende de la temática y del tamaño del espacio a decorar.",
    includes: [
      "Todo el programa de animación y juegos",
      "Pintucaritas y globoflexia",
      "Decoración con globos según la temática",
      "Montaje antes y desmontaje al final",
    ],
    notIncluded: "Mobiliario especial y torta no están incluidos, salvo que se pidan con anticipación.",
    cta: "Cotizar con temática",
    message: "Hola Sammy Partyboom, quiero cotizar el plan Animación + Decoración con globos para una fiesta temática.",
  },
  {
    id: "paquete-full",
    name: "Paquete FULL",
    short: "FULL",
    badge: "Todo en uno",
    summary: "Animación, sonido propio y decoración para que no te preocupes por nada.",
    duration: "3 horas de show",
    price: null,
    priceNote: "Cotización según temática, fecha y ubicación.",
    includes: [
      "Animador con micrófono y parlante",
      "Pintucaritas y globoflexia",
      "Decoración temática con globos y fondo",
      "Conducción de la fiesta de principio a fin",
    ],
    notIncluded: "Las sorpresas para repartir se pueden añadir como adicional.",
    cta: "Cotizar paquete FULL",
    message: "Hola Sammy Partyboom, quiero cotizar el Paquete FULL (animación, sonido y decoración) para una fiesta infantil.",
  },
];

const EXTRAS = [
  { title: "Animador disfrazado", desc: "Princesas, héroes o el personaje favorito del cumpleañero." },
  { title: "Sorpresas personalizadas", desc: "Bolsitas y detalles con la temática, listos para entregar." },
  { title: "Camisetas estampadas", desc: "Con el nombre del cumpleañero y el motivo de la fiesta." },
];

export const Packages: React.FC = () => {
  const [activeId, setActiveId] = useState(PACKAGES[0].id);
  const [dir, setDir] = useState(1);
  const idx = PACKAGES.findIndex((p) => p.id === activeId);
  const pkg = PACKAGES[idx];

  const select = (id: string) => {
    const next = PACKAGES.findIndex((p) => p.id === id);
    setDir(next > idx ? 1 : -1);
    setActiveId(id);
  };

  return (
    <section
      id="paquetes"
      className="relative -mt-8 rounded-t-[36px] bg-canvas shadow-sheet pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 grain"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <SectionLabel>Planes y precios</SectionLabel>
          <h2 className="font-display font-extrabold text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.03em]">
            Planes claros, sin letra pequeña
          </h2>
          <p className="mt-4 text-[17px] text-ink-soft leading-relaxed">
            El valor final depende de la duración, la cantidad de niños y el
            sector. Te lo confirmamos por WhatsApp antes de reservar.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-6 lg:gap-10 lg:grid-cols-[330px_1fr] items-start">
          {/* Selector: chips on phones, vertical list on desktop */}
          <div
            role="tablist"
            aria-label="Planes"
            className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:sticky lg:top-28"
          >
            {PACKAGES.map((p) => {
              const on = p.id === activeId;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="plan-panel"
                  onClick={() => select(p.id)}
                  className={`relative shrink-0 text-left rounded-2xl px-4 h-12 lg:h-auto lg:py-4 transition-colors ${
                    on ? "text-canvas" : "text-ink hover:bg-ink/5"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="plan-pill"
                      transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                      className="absolute inset-0 rounded-2xl bg-ink"
                    />
                  )}
                  <span className="relative flex items-center justify-between gap-3 h-full">
                    <span className="font-display font-bold text-[16px] lg:text-[18px] whitespace-nowrap">
                      <span className="lg:hidden">{p.short}</span>
                      <span className="hidden lg:inline">{p.name}</span>
                    </span>
                    <span className={`hidden lg:inline whitespace-nowrap text-[14px] font-semibold ${on ? "text-festive-yellow" : "text-ink-muted"}`}>
                      {p.price ?? "A cotizar"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ticket */}
          <div id="plan-panel" role="tabpanel" className="relative">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.article
                key={pkg.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.38, ease }}
                className="relative rounded-[30px] border-[3px] border-ink bg-white shadow-pop-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-[1fr_auto]">
                  <div className="p-6 sm:p-9">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display font-extrabold text-[28px] sm:text-[34px] leading-tight tracking-tight">
                        {pkg.name}
                      </h3>
                      {pkg.badge && (
                        <span className="inline-flex items-center h-7 px-2.5 rounded-full bg-festive-yellow border-2 border-ink text-[13px] font-bold">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[17px] text-ink-soft max-w-[32rem]">{pkg.summary}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold">
                      <Clock className="w-4 h-4 text-accent" aria-hidden="true" />
                      {pkg.duration}
                    </p>

                    <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                      {pkg.includes.map((inc, i) => (
                        <motion.li
                          key={inc}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease }}
                          className="flex items-start gap-3 text-[16px] text-ink"
                        >
                          <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-festive-teal/20 shrink-0">
                            <Check className="w-4 h-4 text-[#0F7A52] stroke-[3]" aria-hidden="true" />
                          </span>
                          {inc}
                        </motion.li>
                      ))}
                    </ul>

                    <p className="mt-7 flex items-start gap-2.5 text-[15px] text-ink-soft border-t border-ink/10 pt-5">
                      <Info className="w-[18px] h-[18px] mt-0.5 text-accent shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="text-ink font-semibold">No incluye: </strong>
                        {pkg.notIncluded}
                      </span>
                    </p>
                  </div>

                  {/* Price stub, perforated like a ticket */}
                  <div className="relative md:w-[270px] bg-festive-yellow border-t-[3px] md:border-t-0 md:border-l-[3px] border-dashed border-ink p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <span aria-hidden="true" className="hidden md:block absolute -left-[15px] -top-[15px] w-7 h-7 rounded-full bg-canvas border-[3px] border-ink" />
                    <span aria-hidden="true" className="hidden md:block absolute -left-[15px] -bottom-[15px] w-7 h-7 rounded-full bg-canvas border-[3px] border-ink" />
                    <div>
                      <p className="text-[14px] font-semibold text-ink/80">{pkg.price ? "Desde" : "Valor"}</p>
                      <p className="font-display font-extrabold text-[40px] leading-none tracking-tight mt-1">
                        {pkg.price ?? "A cotizar"}
                      </p>
                      <p className="mt-3 text-[14px] leading-snug text-ink/80">{pkg.priceNote}</p>
                    </div>
                    <motion.a
                      href={waLink(pkg.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={springSnappy}
                      className="inline-flex items-center justify-center gap-2 h-13 min-h-[52px] px-5 rounded-full bg-ink text-canvas font-display font-bold text-[16px] hover:bg-uva-deep transition-colors"
                    >
                      <MessageCircle className="w-[18px] h-[18px] text-wa fill-wa" aria-hidden="true" />
                      {pkg.cta}
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Extras as a hairline list + the open door */}
        <div className="mt-16 sm:mt-20 grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-10">
          <Reveal>
            <h3 className="font-display font-extrabold text-[26px] sm:text-[30px] leading-tight tracking-tight">
              Súmale a tu fiesta
            </h3>
            <p className="mt-2 text-[16px] text-ink-soft">Adicionales para cualquier plan, bajo cotización.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="border-t-2 border-ink">
              {EXTRAS.map((x) => (
                <li key={x.title} className="group flex items-center gap-4 sm:gap-6 py-5 border-b border-ink/15">
                  <BurstMark className="w-8 h-8 shrink-0 transition-transform duration-500 group-hover:rotate-[72deg]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[19px] sm:text-[21px] leading-tight">{x.title}</p>
                    <p className="text-[15px] sm:text-[16px] text-ink-soft mt-0.5">{x.desc}</p>
                  </div>
                </li>
              ))}
              <li>
                <a
                  href={waLink("Hola Sammy Partyboom, tengo una idea para una fiesta y quiero saber si la pueden hacer.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 sm:gap-6 py-5 border-b-2 border-ink hover:bg-accent-light transition-colors -mx-3 px-3 rounded-xl"
                >
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-white shrink-0">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display font-bold text-[19px] sm:text-[21px] leading-tight text-accent">¿Otra cosa? Cuéntanos</p>
                    <p className="text-[15px] sm:text-[16px] text-ink-soft mt-0.5">
                      Desde una fiesta en el apartamento hasta un evento de colegio.
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
