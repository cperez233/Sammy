/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF7F2",
        ink: {
          DEFAULT: "#211526",
          soft: "#4E3E56",
          muted: "#75657D",
          faint: "#A598AB",
        },
        accent: {
          DEFAULT: "#E63956",
          hover: "#D12745",
          light: "#FDF0F2",
        },
        festive: {
          yellow: "#FFD166",
          lavender: "#E8DCF8",
          teal: "#06D6A0",
          orange: "#FF9F1C",
          sky: "#83BCFF",
        }
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'resting': '0 4px 20px -4px rgba(33, 21, 38, 0.05)',
        'raised': '0 12px 32px -8px rgba(33, 21, 38, 0.08)',
        'floating': '0 20px 48px -12px rgba(33, 21, 38, 0.15)',
        'dock': '0 8px 32px rgba(33, 21, 38, 0.12)',
      },
    },
  },
  plugins: [],
}
