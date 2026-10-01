/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from 'react';
import { MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-ink/5 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-accent min-h-[44px] py-1"
          aria-label="Sammy Partyboom - Inicio"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors shadow-sm bg-festive-lavender flex items-center justify-center shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="Logo Sammy Partyboom"
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                e.currentTarget.classList.add('hidden');
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-xs text-accent tracking-tighter bg-festive-lavender" aria-hidden="true">
              SB
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-ink leading-tight tracking-tight">
              Sammy <span className="text-accent">Partyboom</span>
            </span>
            <span className="text-[13px] text-ink-muted flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Bucaramanga
            </span>
          </div>
        </a>

        {/* WhatsApp fast CTA button */}
        <motion.a
          href="https://wa.me/573168674729?text=Hola%20Sammy%20Partyboom,%20quiero%20cotizar%20un%20evento%20infantil%20en%20Bucaramanga"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-ink text-canvas text-sm font-semibold hover:bg-ink-soft transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
        >
          <MessageCircle className="w-4 h-4 text-festive-teal fill-festive-teal" />
          <span className="hidden xs:inline">WhatsApp</span>
          <span className="xs:hidden">Chat</span>
        </motion.a>
      </div>
    </header>
  );
};
