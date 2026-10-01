/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Camera, MessageCircle, Sparkles } from 'lucide-react';

export const BottomDock: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling down past hero (~140px)
      setVisible(window.scrollY > 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          aria-label="Navegación rápida móvil"
          className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md border-2 border-ink rounded-full shadow-floating max-w-sm w-full justify-between">
            {/* Nav link: Paquetes */}
            <a
              href="#paquetes"
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full text-ink hover:text-accent transition-colors touch-target-44 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Package className="w-4 h-4" />
              <span className="text-[11px] font-bold mt-0.5">Planes</span>
            </a>

            {/* Nav link: Galería */}
            <a
              href="#galeria"
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full text-ink hover:text-accent transition-colors touch-target-44 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Camera className="w-4 h-4" />
              <span className="text-[11px] font-bold mt-0.5">Fotos</span>
            </a>

            {/* Nav link: Cotizador */}
            <a
              href="#cotizar"
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full text-ink hover:text-accent transition-colors touch-target-44 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold mt-0.5">Cotizar</span>
            </a>

            {/* Primary Action Button: WhatsApp directo */}
            <motion.a
              href="https://wa.me/573168674729?text=Hola%20Sammy%20Partyboom,%20quiero%20cotizar%20una%20fiesta%20infantil%20en%20Bucaramanga"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-accent text-white font-display font-bold text-xs shadow-sm hover:bg-accent-hover transition-colors touch-target-44 outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
