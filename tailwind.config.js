/** @type {import('tailwindcss').Config} */
/* editorial-ui · Cristian Pérez · cristianperez.me */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: { xs: "400px" },
      colors: {
        canvas: { DEFAULT: "#FBF6EE", deep: "#F4ECDF" },
        ink: {
          DEFAULT: "#22142B",
          soft: "#4A3A55",
          muted: "#6E5E79",
          faint: "#A193AA",
        },
        accent: { DEFAULT: "#E63956", hover: "#CC2645", light: "#FDECEF" },
        uva: { DEFAULT: "#7B3FC4", deep: "#2E1745", light: "#EEE3FB" },
        festive: {
          yellow: "#FFC93C",
          lavender: "#E8DCF8",
          teal: "#22C58B",
          orange: "#FF8A3D",
          sky: "#5EC8F2",
        },
        wa: { DEFAULT: "#25D366", deep: "#128C7E", bubble: "#DCF8C6", chat: "#EFE7DD" },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-rounded", "system-ui", "sans-serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      boxShadow: {
        resting: "0 1px 2px rgba(34,20,43,.06), 0 6px 20px -8px rgba(34,20,43,.12)",
        raised: "0 2px 4px rgba(34,20,43,.06), 0 18px 40px -14px rgba(60,20,70,.28)",
        floating: "0 4px 10px rgba(34,20,43,.08), 0 30px 70px -20px rgba(60,20,70,.40)",
        sheet: "0 -18px 40px -24px rgba(60,20,70,.35)",
        pop: "4px 4px 0 0 #22142B",
        "pop-lg": "6px 6px 0 0 #22142B",
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};
