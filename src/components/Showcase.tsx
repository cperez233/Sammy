/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { LoopVideo } from "./LoopVideo";
import { Reveal, SectionLabel, BurstMark } from "./Reveal";
import { INSTAGRAM_URL, ease, springSnappy } from "../lib/site";

type Item =
  | { kind: "video"; src: string; poster: string; tag: string; title: string }
  | { kind: "photo"; src: string; tag: string; title: string; position?: string };

const ITEMS: Item[] = [
  { kind: "video", src: "/media/reel-mamas.mp4", poster: "/media/reel-mamas.jpg", tag: "Salón social", title: "Mamás y niños en la misma pista" },
  { kind: "video", src: "/media/reel-pista.mp4", poster: "/media/reel-pista.jpg", tag: "Baile", title: "Coreografías que todos se aprenden" },
  { kind: "photo", src: "/images/foto-animadora-princesas.jpeg", tag: "Personajes", title: "Disfraces para las fotos del cumpleaños", position: "50% 40%" },
  { kind: "video", src: "/media/reel-salon.mp4", poster: "/media/reel-salon.jpg", tag: "Integración", title: "Los papás también entran al juego" },
  { kind: "video", src: "/media/reel-lazos.mp4", poster: "/media/reel-lazos.jpg", tag: "Dinámicas", title: "Juegos con lazos y rondas" },
  { kind: "video", src: "/media/reel-cuadra.mp4", poster: "/media/reel-cuadra.jpg", tag: "Fiesta de cuadra", title: "De noche y en la calle, también" },
  { kind: "video", src: "/media/reel-masivo.mp4", poster: "/media/reel-masivo.jpg", tag: "Eventos grandes", title: "Celebraciones con cientos de niños" },
];

export const Showcase: React.FC = () => {
  const row = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const onScroll = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20) * 2, behavior: "smooth" });
  };

  return (
    <section id="fiestas" className="pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-x-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-9 sm:mb-12">
        <Reveal>
          <SectionLabel>Fiestas reales, sin filtros</SectionLabel>
          <h2 className="font-display font-extrabold text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.03em] max-w-[16ch]">
            Así se ve una fiesta con Sammy
          </h2>
          <p className="mt-4 text-[17px] text-ink-soft max-w-[36rem] leading-relaxed">
            Videos grabados en salones, casas y calles de Bucaramanga. Nada de
            fotos de banco: esto es lo que pasa cuando llegamos.
          </p>
        </Reveal>

        <div className="hidden sm:flex gap-2 shrink-0">
          {([-1, 1] as const).map((d) => (
            <motion.button
              key={d}
              type="button"
              onClick={() => step(d)}
              disabled={d === -1 ? edge.start : edge.end}
              whileTap={{ scale: 0.92 }}
              transition={springSnappy}
              aria-label={d === -1 ? "Ver anteriores" : "Ver siguientes"}
              className="grid place-items-center w-12 h-12 rounded-full border-[3px] border-ink bg-canvas shadow-pop hover:bg-festive-yellow disabled:opacity-35 disabled:shadow-none disabled:hover:bg-canvas transition-colors"
            >
              {d === -1 ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </motion.button>
          ))}
        </div>
      </div>

      <div
        ref={row}
        className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 px-4 sm:px-6 pb-6 [overscroll-behavior-x:contain] lg:[padding-inline:max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:[scroll-padding-inline:max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {ITEMS.map((item, i) => (
          <motion.article
            data-card
            key={item.title}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: Math.min(i, 3) * 0.08, ease }}
            className="group relative snap-start shrink-0 w-[78vw] max-w-[320px] sm:w-[300px]"
          >
            <div className={`relative rounded-[26px] border-[3px] border-ink overflow-hidden shadow-raised bg-uva-light ${i % 2 ? "sm:rotate-[1deg]" : "sm:-rotate-[1deg]"} transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1.5`}>
              {item.kind === "video" ? (
                <LoopVideo
                  src={item.src}
                  poster={item.poster}
                  label={`Video real: ${item.title}`}
                  className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={`Foto real: ${item.title}`}
                    loading="lazy"
                    style={{ objectPosition: item.position }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              )}

              <span className="absolute top-3 left-3 inline-flex items-center h-8 px-3 rounded-full bg-canvas/95 text-[13px] font-semibold text-ink shadow-resting">
                {item.tag}
              </span>

              {/* Caption: tight shadow + local scrim, no pill around the sentence */}
              <div className="absolute inset-x-0 bottom-0 p-4 pt-14 isolate">
                <span aria-hidden="true" className="absolute -z-10 inset-x-0 bottom-0 h-full bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />
                <h3 className="font-display font-bold text-[20px] leading-tight text-canvas [text-shadow:0_1px_2px_rgba(34,20,43,.95),0_0_14px_rgba(34,20,43,.7)]">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.article>
        ))}

        {/* Door to Instagram */}
        <motion.a
          data-card
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="group snap-start shrink-0 w-[78vw] max-w-[320px] sm:w-[300px] aspect-[4/5] rounded-[26px] border-[3px] border-ink bg-accent text-white p-6 flex flex-col justify-between shadow-raised hover:-translate-y-1.5 transition-transform"
        >
          <BurstMark className="w-16 h-16 transition-transform duration-500 group-hover:rotate-[72deg] group-hover:scale-110" />
          <div>
            <p className="text-[15px] font-semibold text-white/85">Síguenos para ver más</p>
            <p className="font-display font-extrabold text-[30px] leading-[1.05] tracking-tight mt-1">
              @sammypartyboom
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-[16px]">
              Ver en Instagram
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
};
