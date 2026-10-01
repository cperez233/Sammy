/* editorial-ui · Cristian Pérez · cristianperez.me */
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCheck, Send } from "lucide-react";
import { Reveal, SectionLabel, HeadingWords } from "./Reveal";
import { PACKAGES } from "./Packages";
import { PHONE_DISPLAY, springSnappy, waLink } from "../lib/site";

const PLANS = [...PACKAGES.map((p) => p.name), "Otra cosa"];
const SECTORES = ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Otro municipio cercano"];
const KIDS = ["Hasta 15", "15 a 30", "Más de 30"];

const fieldLabel = "block text-[15px] font-semibold text-canvas/90 mb-2";
const inputBase =
  "w-full h-12 px-4 rounded-xl bg-white/[0.08] border-2 border-white/15 text-canvas text-[16px] placeholder:text-canvas/40 focus:outline-none focus:border-festive-yellow transition-colors";

function formatDate(v: string) {
  if (!v) return "";
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
}

export const WhatsAppComposer: React.FC = () => {
  const [plan, setPlan] = useState(PLANS[0]);
  const [sector, setSector] = useState(SECTORES[0]);
  const [kids, setKids] = useState(KIDS[1]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const message = useMemo(() => {
    const lines = [
      "¡Hola Sammy Partyboom! 💥 Quiero cotizar una fiesta infantil:",
      `• Plan: ${plan}`,
      date ? `• Fecha: ${formatDate(date)}` : "",
      `• Lugar: ${sector}`,
      `• Niños: ${kids.toLowerCase()}`,
      name.trim() ? `• Cumpleañero(a): ${name.trim()}` : "",
      "¿Tienen disponibilidad?",
    ];
    return lines.filter(Boolean).join("\n");
  }, [plan, sector, kids, date, name]);

  return (
    <section
      id="cotizar"
      className="relative -mt-8 rounded-t-[36px] sm:rounded-t-[48px] bg-uva-deep text-canvas shadow-sheet pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 confetti-field opacity-60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
        <div>
          <Reveal>
            <SectionLabel tone="light">Cotiza en un minuto</SectionLabel>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
              <HeadingWords text="Arma tu mensaje y envíalo por WhatsApp" />
            </h2>
            <p className="mt-4 text-[17px] text-canvas/75 leading-relaxed max-w-[34rem]">
              Elige lo básico y mira el mensaje antes de enviarlo. Te respondemos
              con disponibilidad y el valor exacto.
            </p>
          </Reveal>

          <form className="mt-9 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className={fieldLabel}>Plan</legend>
              <div className="flex flex-wrap gap-2">
                {PLANS.map((p) => {
                  const on = p === plan;
                  return (
                    <label
                      key={p}
                      className={`relative inline-flex items-center h-11 px-4 rounded-full cursor-pointer text-[15px] font-semibold border-2 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-festive-yellow ${
                        on ? "border-festive-yellow text-ink" : "border-white/20 text-canvas/85 hover:border-white/45"
                      }`}
                    >
                      <input type="radio" name="plan" value={p} checked={on} onChange={() => setPlan(p)} className="sr-only" />
                      {on && (
                        <motion.span
                          layoutId="wa-plan"
                          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                          className="absolute inset-0 rounded-full bg-festive-yellow"
                        />
                      )}
                      <span className="relative">{p}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="wa-date" className={fieldLabel}>Fecha (opcional)</label>
                <input
                  id="wa-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${inputBase} [color-scheme:dark]`}
                />
              </div>
              <div>
                <label htmlFor="wa-sector" className={fieldLabel}>Municipio</label>
                <select id="wa-sector" value={sector} onChange={(e) => setSector(e.target.value)} className={`${inputBase} [color-scheme:dark]`}>
                  {SECTORES.map((s) => (
                    <option key={s} value={s} className="text-ink">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset>
              <legend className={fieldLabel}>¿Cuántos niños, más o menos?</legend>
              <div className="grid grid-cols-3 p-1 rounded-2xl bg-white/[0.08] border-2 border-white/15">
                {KIDS.map((k) => {
                  const on = k === kids;
                  return (
                    <label key={k} className="relative grid place-items-center h-11 rounded-xl cursor-pointer text-[15px] font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-festive-yellow">
                      <input type="radio" name="kids" value={k} checked={on} onChange={() => setKids(k)} className="sr-only" />
                      {on && (
                        <motion.span
                          layoutId="wa-kids"
                          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                          className="absolute inset-0 rounded-xl bg-canvas"
                        />
                      )}
                      <span className={`relative transition-colors ${on ? "text-ink" : "text-canvas/80"}`}>{k}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="wa-name" className={fieldLabel}>Nombre y edad del cumpleañero (opcional)</label>
              <input
                id="wa-name"
                type="text"
                autoComplete="off"
                placeholder="Ej: Luciana, 5 años"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputBase}
              />
            </div>
          </form>
        </div>

        {/* Phone with the live WhatsApp preview */}
        <Reveal delay={0.15} className="mx-auto w-full max-w-[380px]">
          <div data-arrival className="rounded-[44px]">
          <div className="relative rounded-[44px] border-[3px] border-ink bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] rotate-[1.5deg]">
            <div className="rounded-[34px] overflow-hidden bg-wa-chat">
              <div className="flex items-center gap-3 px-4 pt-5 pb-3 bg-wa-deep text-white">
                <img src="/images/logo-sammy.webp" alt="" width={40} height={40} className="w-10 h-10 rounded-full bg-white" />
                <div className="leading-tight">
                  <p className="font-semibold text-[16px]">Sammy Partyboom</p>
                  <p className="text-[13px] text-white/75">{PHONE_DISPLAY}</p>
                </div>
              </div>

              <div className="min-h-[220px] sm:min-h-[330px] px-3.5 py-5 flex flex-col justify-end">
                <motion.div
                  layout
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="self-end max-w-[92%] rounded-2xl rounded-tr-md bg-wa-bubble text-[#111B21] px-3.5 pt-2.5 pb-1.5 shadow-[0_1px_1px_rgba(0,0,0,.12)]"
                >
                  <motion.p
                    key={message}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="whitespace-pre-line text-[15px] leading-[1.45]"
                  >
                    {message}
                  </motion.p>
                  <span className="flex items-center justify-end gap-1 mt-1 text-[12px] text-[#667781]">
                    ahora <CheckCheck className="w-4 h-4 text-[#53BDEB]" aria-hidden="true" />
                  </span>
                </motion.div>
              </div>

              <div className="p-3 bg-wa-chat">
                <motion.a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                  className="flex items-center justify-center gap-2 h-14 rounded-full bg-wa text-white font-display font-bold text-[17px] hover:bg-[#1FB959] transition-colors"
                >
                  Enviar por WhatsApp
                  <Send className="w-[18px] h-[18px]" aria-hidden="true" />
                </motion.a>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-[14px] text-canvas/65">
            Se abre WhatsApp con el mensaje listo. Nada se envía sin que lo confirmes.
          </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
