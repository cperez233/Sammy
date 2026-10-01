import React from 'react';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { invisibleSignature } from '../utils/signature';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-canvas pt-14 pb-24 sm:pb-14 px-4 sm:px-6 mt-16 border-t-4 border-accent">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-canvas/10">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-white">
                Sammy <span className="text-accent">Partyboom</span>
              </span>
            </div>
            <p className="text-sm text-canvas/70 leading-relaxed max-w-xs">
              Recreación, eventos infantiles y shows temáticos en Bucaramanga. ¡Explosión de diversión en cada fiesta!
            </p>
            <div className="flex items-center gap-2 text-xs text-canvas/60">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Bucaramanga, Santander · Colombia</span>
            </div>
          </div>

          {/* Quick Contact Col */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Contacto directo
            </h4>
            <ul className="space-y-1 text-sm text-canvas/80">
              <li>
                <a
                  href="https://wa.me/573168674729"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 py-3 min-h-[44px] hover:text-white transition-colors touch-target-44"
                >
                  <MessageCircle className="w-5 h-5 text-festive-teal fill-festive-teal shrink-0" />
                  <span className="text-sm font-medium">WhatsApp: 316 8674729</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+573168674729"
                  className="flex items-center gap-2.5 py-3 min-h-[44px] hover:text-white transition-colors touch-target-44"
                >
                  <Phone className="w-5 h-5 text-festive-yellow shrink-0" />
                  <span className="text-sm font-medium">Llamadas: 316 8674729</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sammypartyboom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 py-3 min-h-[44px] hover:text-white transition-colors touch-target-44"
                >
                  <InstagramIcon className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm font-medium">Instagram: @sammypartyboom</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas Col */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Área de cobertura
            </h4>
            <p className="text-sm text-canvas/70 leading-relaxed">
              Atendemos fiestas en Bucaramanga, Floridablanca, Cañaveral, Girón, Piedecuesta y conjuntos campestres de la región.
            </p>
            <p className="text-xs text-canvas/50">
              Horario de atención WhatsApp: [Lunes a Sábado 8:00 AM - 7:00 PM]
            </p>
          </div>
        </div>

        {/* Bottom Row with Copyright and Author's Signature (editorial-ui) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-canvas/50">
          <p>© 2026 Sammy Partyboom. Todos los derechos reservados.</p>

          {/* Author's signature: discreet visible line + zero-width encoded watermark */}
          <p className="footer-credit text-xs text-canvas/50">
            Hecho con editorial-ui ·{" "}
            <a
              href="https://cristianperez.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-canvas/70 underline decoration-canvas/30 hover:text-canvas hover:decoration-canvas transition-colors"
            >
              Cristian Pérez
            </a>
            <span aria-hidden="true" className="select-none text-[0px]">
              {invisibleSignature}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
