/* editorial-ui · Cristian Pérez · cristianperez.me */
import React from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";
import { ease } from "../lib/site";

/** Approved client messages as received WhatsApp bubbles. Renders nothing until one is approved. */
export const Testimonials: React.FC = () => {
  const quotes = TESTIMONIALS.filter((t) => t.approved).slice(0, 3);
  if (!quotes.length) return null;
  return (
    <figure className="mt-10">
      <figcaption className="text-[15px] font-semibold text-ink/85 mb-4">Lo que nos escriben después de la fiesta</figcaption>
      <ul className="space-y-3 max-w-[26rem]">
        {quotes.map((t, i) => (
          <motion.li
            key={t.quote}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease }}
            className="relative rounded-2xl rounded-tl-md bg-white border-2 border-ink/10 px-4 pt-3 pb-2 shadow-resting"
          >
            <blockquote className="text-[16px] leading-relaxed text-ink">{t.quote}</blockquote>
            <p className="mt-1.5 flex items-center justify-between gap-3 text-[13px] text-ink-muted">
              <span>
                {t.who}
                {t.party ? ` · ${t.party}` : ""}
              </span>
              <CheckCheck className="w-4 h-4 text-[#2E8FBF] shrink-0" aria-hidden="true" />
            </p>
          </motion.li>
        ))}
      </ul>
    </figure>
  );
};
