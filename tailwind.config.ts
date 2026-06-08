import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        petrol: "#16313E",
        ivory: "#F7F5F2",
        gold: "#C6A56B",
        graphite: "#2B2B2B",
        ink: "#10242D"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(16, 36, 45, 0.12)"
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at top left, rgba(198,165,107,0.16), transparent 32rem), linear-gradient(135deg, rgba(247,245,242,1), rgba(235,231,224,0.82))"
      }
    }
  },
  plugins: [forms]
};

export default config;
