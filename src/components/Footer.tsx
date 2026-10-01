/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { BurstMark, Reveal } from "./Reveal";
import { invisibleSignature } from "../utils/signature";
import { DEFAULT_WA, INSTAGRAM_URL, PHONE_DISPLAY, WHATSAPP_NUMBER, springSnappy } from "../lib/site";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => (
  <footer className="relative -mt-8 rounded-t-[36px] bg-ink text-canvas pt-16 sm:pt-24 pb-28 lg:pb-12 px-4 sm:px-6 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      {/* Closing call */}
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] items-center pb-14 sm:pb-20 border-b border-canvas/15">
        <Reveal>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,8vw,5rem)] leading-[0.98] tracking-[-0.035em]">
            ¿Hacemos <span className="text-accent">BOOM</span>
            <br />
            en tu fiesta?
          </h2>
          <p className="mt-5 text-[17px] text-canvas/70 max-w-[30rem]">
            Escríbenos con la fecha y el lugar. Te respondemos por WhatsApp con
            disponibilidad y valor.
          </p>
          <motion.a
            href={DEFAULT_WA}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className="mt-8 inline-flex items-center gap-2.5 h-14 px-7 rounded-full bg-accent text-white font-display font-bold text-[17px] border-[3px] border-canvas shadow-[4px_4px_0_0_#FBF6EE] hover:bg-accent-hover transition-colors"
          >
            <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
            Escribir al {PHONE_DISPLAY}
          </motion.a>
        </Reveal>

        <div aria-hidden="true" className="relative mx-auto w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] grid place-items-center">
          <span className="absolute inset-0 anim-spin-slow">
            <BurstMark className="w-full h-full" fill="#FFC93C" stroke="#FFC93C" />
          </span>
          <img src="/images/logo-sammy.webp" alt="" loading="lazy" className="relative w-[64%] h-[64%] rounded-full ring-4 ring-ink" />
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
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-h-[44px] hover:text-festive-yellow transition-colors">
                <MessageCircle className="w-5 h-5 text-wa" aria-hidden="true" /> WhatsApp {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-3 min-h-[44px] hover:text-festive-yellow transition-colors">
                <Phone className="w-5 h-5 text-festive-yellow" aria-hidden="true" /> Llamar al {PHONE_DISPLAY}
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
          Hecho con editorial-ui ·{" "}
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
  </footer>
);
