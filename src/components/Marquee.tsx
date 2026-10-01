/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useRef } from "react";
import { BurstMark } from "./Reveal";

const ITEMS = [
  "Juegos y rondas",
  "Pintucaritas",
  "Globoflexia",
  "Micrófono y parlante",
  "Concursos y rifas",
  "Baile con los papás",
  "Personajes y disfraces",
  "Decoración con globos",
];

const SPEED = 38; // px per second (rule 15)

export const Marquee: React.FC = () => {
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
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
          <span className="font-display font-bold text-[26px] sm:text-[34px] tracking-tight whitespace-nowrap">
            {t}
          </span>
          <BurstMark className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" stroke="#FBF6EE" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Lo que pasa en una fiesta" className="relative bg-ink text-canvas py-5 sm:py-6 overflow-hidden -rotate-[1.2deg] scale-[1.03] border-y-[3px] border-ink">
      <div ref={track} className="flex w-max anim-marquee">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
};
