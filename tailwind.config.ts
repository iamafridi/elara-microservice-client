import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bengal Modernist Brand System
        primary: {
          DEFAULT: "#006948", // Bengal Emerald
          container: "#00855d",
          fixed: "#85f8c4",
          light: "#e6f4ee",
        },
        secondary: {
          DEFAULT: "#ab3500", // Terracotta / Tangerine
          container: "#fe6a34",
          light: "#fff0eb",
        },
        tertiary: {
          DEFAULT: "#4648d4", // Royal Indigo
          container: "#6063ee",
          light: "#edeefd",
        },
        // Editorial Luxury Palette
        ivory: "#F4EFE7",
        ink: "#101110",
        cobalt: "#2448FF",
        coral: "#FF7658",
        lime: "#D8FF42",
        // Bangladesh MFS Colors
        bkash: "#D12053",
        nagad: "#F97316",
        // Neutral Surfaces
        surface: {
          DEFAULT: "#faf8ff",
          dark: "#111315",
          low: "#f2f3ff",
          lowest: "#ffffff",
        },
        outline: {
          DEFAULT: "#6d7a72",
          variant: "#bccac0",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        bangla: ["'Hind Siliguri'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      maxWidth: {
        shell: "76rem",
      },
    },
  },
  plugins: [],
};
export default config;


/* elara-stage-164 */
