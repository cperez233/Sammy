/* editorial-ui · Cristian Pérez · cristianperez.me */
export const WHATSAPP_NUMBER = "573168674729";
export const PHONE_DISPLAY = "316 867 4729";
export const INSTAGRAM_URL = "https://www.instagram.com/sammypartyboom/";

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const DEFAULT_WA = waLink(
  "Hola Sammy Partyboom, quiero cotizar una fiesta infantil en Bucaramanga."
);

/** One timing system for the whole site. */
export const ease = [0.22, 1, 0.36, 1] as const;
export const springSnappy = { type: "spring", stiffness: 420, damping: 26 } as const;
export const springSoft = { type: "spring", stiffness: 220, damping: 22 } as const;
