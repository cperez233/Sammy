/* editorial-ui · Cristian Pérez · cristianperez.me */
export const WHATSAPP_NUMBER = "573170629434";
export const PHONE_DISPLAY = "317 062 9434";
export const PHONE_E164 = "+573170629434";
export const INSTAGRAM_URL = "https://www.instagram.com/sammypartyboom/";
export const TOWNS = ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"];

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const DEFAULT_WA = waLink(
  "Hola Sammy Partyboom, quiero cotizar una fiesta infantil en Bucaramanga."
);

/**
 * The WhatsApp buttons throw confetti from where they were tapped: the party
 * starts at the moment someone writes (brand verb for the main action).
 * Loaded on demand so the confetti code never weighs on the first paint.
 */
export function celebrateFrom(el: HTMLElement) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = el.getBoundingClientRect();
  import("canvas-confetti").then(({ default: confetti }) =>
    confetti({
      particleCount: 42,
      spread: 75,
      startVelocity: 28,
      scalar: 0.8,
      ticks: 120,
      zIndex: 60,
      colors: ["#D42F4B", "#FFC93C", "#7B3FC4", "#5EC8F2", "#25D366"],
      origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight },
    })
  );
}

/** One timing system for the whole site. */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.76, 0, 0.24, 1] as const;
export const springSnappy = { type: "spring", stiffness: 420, damping: 26 } as const;
export const springSoft = { type: "spring", stiffness: 220, damping: 22 } as const;

/**
 * Smooth-scroll to a section without leaving #hash in the URL (F5 goes to
 * the top), then play a short arrival cue on the target (motion-patterns 46).
 */
export function scrollToSection(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", window.location.pathname + window.location.search);

  const target = el.querySelector<HTMLElement>("[data-arrival]");
  if (!target || reduced) return;
  let last = -1;
  let still = 0;
  const tick = () => {
    const y = window.scrollY;
    still = y === last ? still + 1 : 0;
    last = y;
    if (still < 6) return void requestAnimationFrame(tick);
    target.classList.remove("arrived");
    void target.offsetWidth;
    target.classList.add("arrived");
  };
  requestAnimationFrame(tick);
}
