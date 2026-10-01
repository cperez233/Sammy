/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Check, Clock, ArrowUpRight, Info } from "lucide-react";
import { Reveal, SectionLabel, BurstMark, HeadingWords } from "./Reveal";
import { CtaButton } from "./CtaButton";
import { ease, waLink } from "../lib/site";

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

/** Rubber-stamp sticker riding the ticket corner; spins a little on every change. */
const PriceStamp: React.FC<{ idx: number }> = ({ idx }) => (
  <motion.div
    aria-hidden="true"
    initial={{ scale: 0, rotate: -60 }}
    whileInView={{ scale: 1, rotate: -12 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
    className="pointer-events-none absolute -top-16 -right-1 sm:-top-12 sm:-right-8 z-20 w-[84px] h-[84px] sm:w-[118px] sm:h-[118px]"
  >
    <motion.div key={idx} initial={{ rotate: -40, scale: 0.85 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 12 }} className="w-full h-full">
      <svg viewBox="0 0 120 120" className="w-full h-full anim-spin-slow">
        <defs>
          <path id="stamp-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#FFC93C" stroke="#22142B" strokeWidth="3" />
        <circle cx="60" cy="60" r="33" fill="#22142B" />
        <text fill="#22142B" fontSize="10.5" fontWeight="800" letterSpacing="1" fontFamily="Figtree, sans-serif">
          <textPath href="#stamp-circle">PRECIOS CLAROS • SIN LETRA PEQUEÑA •</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display font-extrabold text-[22px] sm:text-[26px] text-festive-yellow leading-none">3h</span>
    </motion.div>
  </motion.div>
);

const Ticket: React.FC<{ pkg: PackageInfo; on: boolean; dir: number; onSwipe: (d: 1 | -1) => void }> = ({
  pkg,
  on,
  dir,
  onSwipe,
}) => (
  <motion.article
    id={`plan-${pkg.id}`}
    role="tabpanel"
    aria-labelledby={`tab-${pkg.id}`}
    aria-hidden={!on}
    initial={false}
    animate={
      on
        ? { opacity: 1, x: 0, rotate: 0, visibility: "visible" as const }
        : { opacity: 0, x: dir * -60, rotate: dir * -2, transitionEnd: { visibility: "hidden" as const } }
    }
    transition={{ duration: 0.45, ease }}
    drag={on ? "x" : false}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.22}
    onDragEnd={(_, info) => {
      if (info.offset.x < -60) onSwipe(1);
      else if (info.offset.x > 60) onSwipe(-1);
    }}
    className={`col-start-1 row-start-1 relative rounded-[30px] border-[3px] border-ink bg-white shadow-pop-lg overflow-hidden touch-pan-y ${
      on ? "z-10" : "pointer-events-none"
    }`}
  >
    <div className="grid md:grid-cols-[1fr_auto] h-full">
      <div className="p-6 sm:p-9">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="font-display font-extrabold text-[28px] sm:text-[34px] leading-tight tracking-tight">
            {pkg.name}
          </h3>
          {pkg.badge && (
            <motion.span
              animate={on ? { rotate: [0, -8, 6, 0], scale: [1, 1.12, 1] } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center h-7 px-2.5 rounded-full bg-festive-yellow border-2 border-ink text-[13px] font-bold"
            >
              {pkg.badge}
            </motion.span>
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
              initial={false}
              animate={on ? { opacity: [0, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: on ? 0.15 + i * 0.05 : 0, ease }}
              className="flex items-start gap-3 text-[16px] text-ink"
            >
              <motion.span
                initial={false}
                animate={on ? { scale: [0, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.45, delay: on ? 0.2 + i * 0.05 : 0 }}
                className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-festive-teal/20 shrink-0"
              >
                <Check className="w-4 h-4 text-[#0F7A52] stroke-[3]" aria-hidden="true" />
              </motion.span>
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
      <div className="relative md:w-[310px] bg-festive-yellow border-t-[3px] md:border-t-0 md:border-l-[3px] border-dashed border-ink p-6 sm:p-8 flex flex-col justify-between gap-6">
        <span aria-hidden="true" className="hidden md:block absolute -left-[15px] -top-[15px] w-7 h-7 rounded-full bg-canvas border-[3px] border-ink" />
        <span aria-hidden="true" className="hidden md:block absolute -left-[15px] -bottom-[15px] w-7 h-7 rounded-full bg-canvas border-[3px] border-ink" />
        <BurstMark className="absolute right-4 top-4 w-10 h-10 opacity-90 anim-wiggle" fill="#FBF6EE" />
        <div>
          <p className="text-[14px] font-semibold text-ink/80">{pkg.price ? "Desde" : "Valor"}</p>
          <motion.p
            initial={false}
            animate={on ? { y: [24, 0], opacity: [0, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="font-display font-extrabold text-[40px] leading-none tracking-tight mt-1"
          >
            {pkg.price ?? "A cotizar"}
          </motion.p>
          <p className="mt-3 text-[14px] leading-snug text-ink/80">{pkg.priceNote}</p>
        </div>
        <CtaButton href={waLink(pkg.message)} external size="md" tone="ink" arrow={false} className="w-full">
          <WhatsAppIcon className="w-[18px] h-[18px] text-wa" />
          {pkg.cta}
        </CtaButton>
      </div>
    </div>
  </motion.article>
);

export const Packages: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    if (next < 0 || next >= PACKAGES.length || next === idx) return;
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  return (
    <section
      id="paquetes"
      className="relative -mt-8 rounded-t-[36px] sm:rounded-t-[48px] bg-canvas shadow-sheet pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 grain"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-3xl">
          <SectionLabel>Planes y precios, sin letra pequeña</SectionLabel>
          <h2 className="font-display font-extrabold text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
            <HeadingWords text="¿Cuánto cuesta animar una fiesta infantil?" />
          </h2>
          <p className="mt-4 text-[17px] text-ink-soft leading-relaxed max-w-2xl">
            El plan más pedido, animación con sonido por 3 horas, vale desde $200.000 en
            Bucaramanga. El valor final depende de la duración, la cantidad de niños y el
            sector; te lo confirmamos por WhatsApp antes de reservar.
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-6 lg:gap-10 lg:grid-cols-[330px_1fr] items-start">
          {/* Selector: chips on phones, vertical list on desktop */}
          <div
            role="tablist"
            aria-label="Planes"
            className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:sticky lg:top-28"
          >
            {PACKAGES.map((p, i) => {
              const on = i === idx;
              return (
                <button
                  key={p.id}
                  id={`tab-${p.id}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`plan-${p.id}`}
                  onClick={() => go(i)}
                  className={`group relative shrink-0 text-left rounded-2xl px-4 h-12 lg:h-auto lg:py-4 transition-colors ${
                    on ? "text-canvas" : "text-ink hover:bg-festive-yellow/40"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="plan-pill"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      className="absolute inset-0 rounded-2xl bg-ink shadow-[0_8px_18px_-8px_rgba(34,20,43,.6)]"
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

          {/* All tickets live in the HTML, stacked in one cell; swipe on phones */}
          <div className="relative">
            {/* Layered deck: tickets waiting behind, peeking from the side they slide to */}
            <motion.div
              aria-hidden="true"
              animate={{ rotate: idx % 2 ? 3.5 : 2.5, x: idx % 2 ? 22 : 16, y: 14 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="absolute inset-0 rounded-[30px] bg-accent border-[3px] border-ink"
            />
            <motion.div
              aria-hidden="true"
              animate={{ rotate: idx % 2 ? -1.5 : 1.5, x: idx % 2 ? 10 : 8, y: 7 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="absolute inset-0 rounded-[30px] bg-uva border-[3px] border-ink"
            />
            <PriceStamp idx={idx} />
            <div className="relative grid">
              {PACKAGES.map((p, i) => (
                <Ticket key={p.id} pkg={p} on={i === idx} dir={dir} onSwipe={(d) => go(idx + d)} />
              ))}
            </div>
            <div className="lg:hidden mt-5 flex items-center justify-center gap-2" aria-hidden="true">
              {PACKAGES.map((p, i) => (
                <motion.span
                  key={p.id}
                  animate={{ width: i === idx ? 28 : 8, backgroundColor: i === idx ? "#E63956" : "rgba(34,20,43,.25)" }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="h-2 rounded-full"
                />
              ))}
              <span className="ml-3 text-[14px] text-ink-muted">Desliza para ver otro plan</span>
            </div>
          </div>
        </div>

        {/* Extras as a hairline list with a sweeping highlight (motion-patterns 44) */}
        <div className="mt-16 sm:mt-24 grid gap-10 lg:grid-cols-[330px_1fr] lg:gap-10">
          <Reveal>
            <h3 className="font-display font-extrabold text-[28px] sm:text-[34px] leading-tight tracking-tight">
              Súmale a tu fiesta
            </h3>
            <p className="mt-2 text-[16px] text-ink-soft">Adicionales para cualquier plan, bajo cotización.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="border-t-2 border-ink">
              {EXTRAS.map((x) => (
                <li key={x.title} className="group relative isolate flex items-center gap-4 sm:gap-6 py-5 px-2 border-b border-ink/15">
                  <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-festive-yellow/45 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                  <BurstMark className="w-8 h-8 shrink-0 transition-transform duration-500 group-hover:rotate-[72deg] group-hover:scale-110" />
                  <div className="flex-1 min-w-0 transition-transform duration-500 group-hover:translate-x-1.5">
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
                  className="group relative isolate flex items-center gap-4 sm:gap-6 py-5 px-2 border-b-2 border-ink"
                >
                  <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent-light transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-white shrink-0">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                  </span>
                  <div className="flex-1 transition-transform duration-500 group-hover:translate-x-1.5">
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
