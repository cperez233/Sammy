/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from "lucide-react";
import { LoopVideo } from "./LoopVideo";
import { Reveal, SectionLabel, BurstMark, HeadingWords } from "./Reveal";
import { CtaButton } from "./CtaButton";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { INSTAGRAM_URL, ease, waLink } from "../lib/site";

type Item = {
  kind: "video" | "photo";
  src: string;
  poster?: string;
  tag: string;
  title: string;
  ratio: "portrait" | "landscape" | "photo";
};

// Real clips at their native ratio (no crop). Order balances the masonry columns.
const ITEMS: Item[] = [
  { kind: "video", src: "/media/fiesta-mamas.mp4", poster: "/media/fiesta-mamas.jpg", tag: "Salón social", title: "Mamás y niños en la misma pista", ratio: "portrait" },
  { kind: "photo", src: "/images/foto-animadora-princesas.jpeg", tag: "Personajes", title: "Disfraces para las fotos del cumpleaños", ratio: "photo" },
  { kind: "video", src: "/media/fiesta-lazos.mp4", poster: "/media/fiesta-lazos.jpg", tag: "Dinámicas", title: "Juegos con lazos y rondas", ratio: "landscape" },
  { kind: "video", src: "/media/fiesta-pista.mp4", poster: "/media/fiesta-pista.jpg", tag: "Baile", title: "Coreografías que todos se aprenden", ratio: "portrait" },
  { kind: "video", src: "/media/fiesta-masivo.mp4", poster: "/media/fiesta-masivo.jpg", tag: "Eventos grandes", title: "Celebraciones con cientos de niños", ratio: "landscape" },
  { kind: "video", src: "/media/fiesta-salon.mp4", poster: "/media/fiesta-salon.jpg", tag: "Integración", title: "Los papás también entran al juego", ratio: "portrait" },
  { kind: "video", src: "/media/fiesta-cuadra.mp4", poster: "/media/fiesta-cuadra.jpg", tag: "Fiesta de cuadra", title: "De noche y en la calle, también", ratio: "portrait" },
];

const RATIO = { portrait: "aspect-[9/16]", landscape: "aspect-video", photo: "aspect-[3/4]" };
const TAPES = ["bg-festive-yellow/90", "bg-festive-sky/85", "bg-accent/85", "bg-uva-light/90"];
const TILTS = ["-rotate-[2.5deg]", "rotate-[2deg]", "-rotate-[1deg]", "rotate-[3deg]", "-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[3deg]"];
const SPEEDS = [40, -30, 60, -10, 30, -45, 20];

const Media: React.FC<{ item: Item; className?: string; eager?: boolean }> = ({ item, className = "", eager }) =>
  item.kind === "video" ? (
    <LoopVideo src={item.src} poster={item.poster!} label={`Video real: ${item.title}`} eager={eager} className={className} />
  ) : (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={item.src}
        alt={`Foto real: ${item.title}`}
        loading="lazy"
        width={960}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );

/** A polaroid pinned with tape, drifting at its own speed (layered parallax). */
const Polaroid: React.FC<{ item: Item; i: number; onOpen: () => void }> = ({ item, i, onOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [SPEEDS[i % SPEEDS.length], -SPEEDS[i % SPEEDS.length]]);

  return (
    <div ref={ref} className="break-inside-avoid pb-8 sm:pb-10">
      <motion.div style={{ y }}>
        <motion.figure
          initial={{ opacity: 0, y: 80, rotate: i % 2 ? 8 : -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease }}
          className="relative"
        >
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Ver en grande: ${item.title}`}
            className={`group relative block w-full text-left bg-canvas text-ink rounded-[16px] p-2 sm:p-2.5 pb-3.5 shadow-[0_30px_60px_-24px_rgba(0,0,0,.75)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-0 hover:-translate-y-2 hover:scale-[1.03] ${TILTS[i % TILTS.length]}`}
          >
            <span
              aria-hidden="true"
              className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 sm:h-7 ${TAPES[i % TAPES.length]} ${i % 2 ? "rotate-[4deg]" : "-rotate-[5deg]"} shadow-sm [clip-path:polygon(3%_0,97%_4%,100%_50%,96%_100%,2%_96%,0_50%)] z-10`}
            />
            <Media item={item} className={`${RATIO[item.ratio]} rounded-[10px] bg-uva-deep`} />
            <span className="absolute top-4 right-4 sm:top-5 sm:right-5 grid place-items-center w-9 h-9 rounded-full bg-canvas/95 text-ink opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100">
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
            </span>
            <figcaption className="px-1.5 pt-3">
              <span className="block text-[13px] sm:text-[14px] font-semibold text-accent">{item.tag}</span>
              <span className="block font-display font-bold text-[16px] sm:text-[19px] leading-snug mt-0.5">{item.title}</span>
            </figcaption>
          </button>
        </motion.figure>
      </motion.div>
    </div>
  );
};

/** Full-size viewer: uncropped media, swipe/arrows/keys, and a way to book. */
const Lightbox: React.FC<{ index: number; dir: number; onClose: () => void; onGo: (d: 1 | -1) => void }> = ({
  index,
  dir,
  onClose,
  onGo,
}) => {
  const item = ITEMS[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onGo(1);
      if (e.key === "ArrowLeft") onGo(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose, onGo]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6 text-canvas" onClick={(e) => e.stopPropagation()}>
        <span className="text-[15px] font-semibold text-canvas/70 tabular-nums">
          {index + 1} / {ITEMS.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 h-11 pl-4 pr-3 rounded-full bg-canvas text-ink font-semibold text-[15px]"
        >
          Cerrar <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 grid place-items-center px-4 sm:px-20 py-4">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 120, rotate: d * 6, scale: 0.92 }),
              center: { opacity: 1, x: 0, rotate: -1.5, scale: 1 },
              exit: (d: number) => ({ opacity: 0, x: d * -120, rotate: d * -6, scale: 0.92 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) onGo(1);
              else if (info.offset.x > 70) onGo(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-canvas rounded-[18px] p-2.5 pb-4 shadow-[0_40px_90px_-30px_rgba(0,0,0,.9)] touch-pan-y max-h-full flex flex-col"
          >
            <div
              className={`min-h-0 ${
                item.ratio === "landscape"
                  ? "w-[min(86vw,1000px)] aspect-video"
                  : `${item.ratio === "photo" ? "aspect-[3/4]" : "aspect-[9/16]"} h-[min(62svh,760px)]`
              }`}
            >
              <Media item={item} eager className="w-full h-full rounded-[12px] bg-uva-deep" />
            </div>
            <figcaption className="px-1.5 pt-3 text-ink max-w-[min(86vw,1000px)]">
              <span className="block text-[14px] font-semibold text-accent">{item.tag}</span>
              <span className="block font-display font-bold text-[19px] sm:text-[22px] leading-snug">{item.title}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onGo(d);
            }}
            aria-label={d === -1 ? "Anterior" : "Siguiente"}
            className={`hidden sm:grid absolute top-1/2 -translate-y-1/2 ${d === -1 ? "left-5" : "right-5"} place-items-center w-14 h-14 rounded-full bg-canvas text-ink border-[3px] border-ink shadow-[4px_4px_0_0_#FFC93C] hover:bg-festive-yellow transition-colors`}
          >
            {d === -1 ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
          </button>
        ))}
      </div>

      <div className="px-4 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
        <span className="sm:hidden text-[14px] text-canvas/60">Desliza para ver la siguiente</span>
        <CtaButton href={waLink(`Hola Sammy Partyboom, vi el video "${item.title}" y quiero una fiesta así.`)} external tone="light">
          <WhatsAppIcon className="w-5 h-5" />
          Quiero una fiesta así
        </CtaButton>
      </div>
    </motion.div>
  );
};

export const Showcase: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setOpen((o) => (o === null ? o : (o + d + ITEMS.length) % ITEMS.length));
  }, []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="fiestas" className="relative bg-ink text-canvas pt-10 sm:pt-16 pb-24 sm:pb-36 px-4 sm:px-6 overflow-x-clip">
      <div aria-hidden="true" className="absolute inset-0 confetti-field opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-end mb-14 sm:mb-20">
          <Reveal>
            <SectionLabel tone="light">Fiestas reales, sin filtros</SectionLabel>
            <h2 className="font-display font-extrabold text-[clamp(2.4rem,7vw,4.6rem)] leading-[0.98] tracking-[-0.035em]">
              <HeadingWords text="Así se ve una fiesta con" />{" "}
              <HeadingWords text="Sammy" className="text-festive-yellow" delay={0.25} />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] sm:text-[18px] text-canvas/75 leading-relaxed max-w-[30rem]">
              Videos grabados por nosotros en salones, casas y calles de Bucaramanga. Nada de
              fotos de banco. Toca cualquiera para verla en grande.
            </p>
          </Reveal>
        </div>

        <div className="columns-2 lg:columns-3 gap-4 sm:gap-8">
          {ITEMS.map((item, i) => (
            <Polaroid
              key={item.src}
              item={item}
              i={i}
              onOpen={() => {
                setDir(1);
                setOpen(i);
              }}
            />
          ))}

          {/* Door to Instagram, pinned like one more card */}
          <div className="break-inside-avoid pb-8">
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 60, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              whileHover={{ rotate: 0, y: -6 }}
              className="group relative block rounded-[16px] bg-accent text-white p-5 sm:p-7 border-[3px] border-canvas shadow-[0_30px_60px_-24px_rgba(0,0,0,.75)]"
            >
              <BurstMark className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-500 group-hover:rotate-[72deg] group-hover:scale-110" />
              <p className="mt-6 text-[14px] sm:text-[15px] font-semibold text-white/85">Síguenos para ver más</p>
              <p className="font-display font-extrabold text-[15px] xs:text-[17px] sm:text-[30px] leading-[1.05] tracking-tight mt-1">
                @sammypartyboom
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-[15px] sm:text-[16px]">
                Ver en Instagram
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox key="lightbox" index={open} dir={dir} onClose={close} onGo={go} />}
      </AnimatePresence>
    </section>
  );
};
