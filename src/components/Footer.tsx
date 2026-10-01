/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { MapPin } from "lucide-react";
import { BurstMark, Reveal, HeadingWords } from "./Reveal";
import { CtaButton } from "./CtaButton";
import { invisibleSignature } from "../utils/signature";
import { DEFAULT_WA, INSTAGRAM_URL, PHONE_DISPLAY } from "../lib/site";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/** Footer wordmark rising from the bottom edge (motion-patterns 31). */
const RisingWordmark: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["70%", "0%"]);
  return (
    <div ref={ref} aria-hidden="true" className="relative mt-6 overflow-hidden h-[1.12em] text-[min(9.4vw,9.5rem)] leading-[1.1] select-none">
      <motion.p
        style={{ y }}
        className="font-display font-extrabold tracking-[-0.05em] whitespace-nowrap text-center text-canvas/[0.07]"
      >
        Sammy <span className="text-accent/45">Partyboom</span>
      </motion.p>
    </div>
  );
};

export const Footer: React.FC = () => (
  <footer className="relative -mt-8 rounded-t-[36px] sm:rounded-t-[48px] bg-ink text-canvas pt-16 sm:pt-24 pb-24 lg:pb-0 px-4 sm:px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      {/* Closing call */}
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] items-center pb-14 sm:pb-20 border-b border-canvas/15">
        <Reveal>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em]">
            <HeadingWords text="¿Hacemos" /> <HeadingWords text="BOOM" className="text-accent" delay={0.1} />
            <br />
            <HeadingWords text="en tu fiesta?" delay={0.2} />
          </h2>
          <p className="mt-5 text-[17px] text-canvas/70 max-w-[30rem]">
            Escríbenos con la fecha y el lugar. Te respondemos por WhatsApp con
            disponibilidad y valor.
          </p>
          <div className="mt-8">
            <CtaButton href={DEFAULT_WA} external tone="light">
              <WhatsAppIcon className="w-5 h-5" />
              Escribir al {PHONE_DISPLAY}
            </CtaButton>
          </div>
        </Reveal>

        <div aria-hidden="true" className="relative mx-auto w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] grid place-items-center">
          <span className="absolute inset-0 anim-spin-slow">
            <BurstMark className="w-full h-full" fill="#FFC93C" stroke="#FFC93C" />
          </span>
          <img src="/images/logo-sammy.webp" alt="" loading="lazy" width={170} height={170} className="relative w-[64%] h-[64%] rounded-full ring-4 ring-ink" />
        </div>
      </div>

      {/* Contact columns */}
      <div className="grid gap-10 sm:grid-cols-3 py-12">
        <div>
          <p className="font-display font-extrabold text-[22px]">
            Sammy <span className="text-accent">Partyboom</span>
          </p>
          <p className="mt-2 text-[15px] text-canvas/65 leading-relaxed max-w-[18rem]">
            Animación, recreación y eventos infantiles. No hacemos fiestas, hacemos BOOM.
          </p>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-canvas/60 mb-2">Contacto</h3>
          <ul className="text-[16px]">
            <li>
              <a href={DEFAULT_WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-h-[44px] hover:text-festive-yellow transition-colors">
                <WhatsAppIcon className="w-5 h-5 text-wa" /> WhatsApp {PHONE_DISPLAY} (solo mensajes)
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-h-[44px] hover:text-festive-yellow transition-colors">
                <InstagramIcon className="w-5 h-5 text-accent" /> Instagram @sammypartyboom
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-canvas/60 mb-2">Dónde trabajamos</h3>
          <p className="flex items-start gap-3 text-[16px] leading-relaxed text-canvas/85">
            <MapPin className="w-5 h-5 mt-0.5 text-accent shrink-0" aria-hidden="true" />
            Bucaramanga, Floridablanca, Girón y Piedecuesta, Santander.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-canvas/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] text-canvas/50">
        <p>© 2026 Sammy Partyboom</p>
        <p className="footer-credit">
          Hecho con confeti por{" "}
          <a
            href="https://cristianperez.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-3 text-canvas/65 underline decoration-canvas/25 underline-offset-2 hover:text-canvas hover:decoration-canvas transition-colors"
          >
            Cristian Pérez
          </a>
          {invisibleSignature}
        </p>
      </div>
    </div>
    <RisingWordmark />
  </footer>
);
