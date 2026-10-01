/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef } from "react";
import { BurstMark } from "./Reveal";

const SERVICES = [
  "Juegos y rondas",
  "Pintucaritas",
  "Globoflexia",
  "Micrófono y parlante",
  "Concursos y rifas",
  "Baile con los papás",
  "Personajes y disfraces",
  "Decoración con globos",
];
const PLACES = ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Cañaveral", "Salones sociales", "Casas", "Colegios"];

const SPEED = 36; // px per second (rule 15)

const Tape: React.FC<{
  items: string[];
  reverse?: boolean;
  className: string;
  star: { fill: string; stroke: string };
  label?: string;
}> = ({ items, reverse, className, star, label }) => {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const set = () => el.style.setProperty("--marquee-duration", `${el.scrollWidth / 2 / SPEED}s`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
          <span className="font-display font-bold text-[24px] sm:text-[32px] tracking-tight whitespace-nowrap">{t}</span>
          <BurstMark className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill={star.fill} stroke={star.stroke} />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-label={label} aria-hidden={label ? undefined : true} className={`overflow-hidden py-4 sm:py-5 border-y-[3px] border-ink ${className}`}>
      <div ref={track} className={`flex w-max anim-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

/** Two party tapes crossing: services one way, places the other. */
export const Marquee: React.FC = () => (
  <section aria-label="Lo que pasa en una fiesta" className="relative h-[170px] sm:h-[210px] overflow-hidden -mt-4">
    <Tape
      items={PLACES}
      reverse
      className="absolute inset-x-[-5%] top-[48%] -translate-y-1/2 rotate-[3deg] bg-accent text-white"
      star={{ fill: "#22142B", stroke: "#FBF6EE" }}
    />
    <Tape
      items={SERVICES}
      label="Servicios incluidos en las fiestas"
      className="absolute inset-x-[-5%] top-[48%] -translate-y-1/2 -rotate-[2.5deg] bg-ink text-canvas shadow-floating"
      star={{ fill: "#FFC93C", stroke: "#FBF6EE" }}
    />
  </section>
);
