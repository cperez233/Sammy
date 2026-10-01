/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCheck, Sparkles } from 'lucide-react';

const SECTORES = [
  "Bucaramanga (Cabecera, Centro, Norte, etc.)",
  "Floridablanca (Cañaveral, etc.)",
  "Girón",
  "Piedecuesta",
  "Otro sector o municipio cercano",
];

const PACKAGES_OPTIONS = [
  "Animación + Sonido (3 Horas, $200.000 ref)",
  "Animación sin sonido",
  "Animación + Decoración con globos",
  "Paquete FULL (Animación, Sonido y Decoración)",
  "Consulta general / Otro requerimiento",
];

export const WhatsAppComposer: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState(PACKAGES_OPTIONS[0]);
  const [sector, setSector] = useState(SECTORES[0]);
  const [childrenCount, setChildrenCount] = useState("15 a 25 niños");
  const [celebrantName, setCelebrantName] = useState("");

  // Construct message preview string
  const messageText = `Hola Sammy Partyboom 💥! Quisiera cotizar una fiesta infantil en Bucaramanga:
- Paquete: ${selectedPlan}
- Sector / Lugar: ${sector}
- Cantidad estimada de niños: ${childrenCount}
${celebrantName.trim() ? `- Cumpleañero(a): ${celebrantName.trim()}` : ""}
¿Me pueden confirmar disponibilidad y valor exacto? Muchas gracias!`;

  const whatsappUrl = `https://wa.me/573168674729?text=${encodeURIComponent(messageText)}`;

  return (
    <section id="cotizar" className="py-14 sm:py-20 px-4 sm:px-6 bg-festive-lavender/30 border-t border-ink/5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-ink text-sm sm:text-base font-semibold mb-2">
            <span className="w-1.5 h-4 rounded-full bg-accent" />
            <span>Cotizador directo</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-ink tracking-tight">
            Arma tu mensaje para WhatsApp
          </h2>
          <p className="text-base text-ink-muted mt-1 max-w-md mx-auto">
            Configura los datos de tu evento y mira el mensaje exacto que recibirán antes de enviar.
          </p>
        </div>

        {/* Builder Container */}
        <div className="bg-white rounded-3xl border-2 border-ink p-6 sm:p-8 shadow-raised">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Form Controls */}
            <div className="space-y-4">
              {/* Plan Selection */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                  1. Elige tu paquete
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent font-medium touch-target-44"
                >
                  {PACKAGES_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector Selection */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                  2. Sector o Municipio
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 bg-canvas text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent font-medium touch-target-44"
                >
                  {SECTORES.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Children Count */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                  3. Cantidad de niños aproximada
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Hasta 15", "15 a 30", "Más de 30"].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setChildrenCount(count)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all touch-target-44 ${
                        childrenCount === count
                          ? "bg-ink text-canvas border-ink shadow-sm"
                          : "bg-canvas text-ink-muted border-ink/10 hover:border-ink/30"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Name */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                  4. Nombre del cumpleañero (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Luciana (5 años)"
                  value={celebrantName}
                  onChange={(e) => setCelebrantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 bg-canvas text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent font-medium touch-target-44"
                />
              </div>
            </div>

            {/* Live Message Preview (Pattern 48) */}
            <div className="flex flex-col h-full justify-between bg-canvas rounded-2xl p-4 sm:p-5 border border-ink/10">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-ink/10 mb-3">
                  <span className="text-xs font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Vista previa de tu mensaje
                  </span>
                  <span className="text-[11px] text-ink-faint">Número: 316 8674729</span>
                </div>

                {/* WhatsApp Chat Bubble */}
                <motion.div
                  layout
                  className="bg-[#E7F8E8] text-[#111B21] border border-[#C2E8C4] rounded-2xl rounded-tr-sm p-3.5 shadow-sm text-xs sm:text-sm font-sans whitespace-pre-line leading-relaxed relative"
                >
                  {messageText}

                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-emerald-800">
                    <span>Ahora</span>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                </motion.div>
              </div>

              {/* Send Button */}
              <div className="mt-5">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BE5B] text-white font-display font-bold text-sm sm:text-base shadow-md transition-colors touch-target-44"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enviar mensaje a WhatsApp</span>
                  <Send className="w-4 h-4 ml-1" />
                </motion.a>
                <p className="text-[11px] text-center text-ink-muted mt-2">
                  Atención directa y sin intermediarios por WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
