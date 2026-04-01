import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text1)",
        bg: "#0a0f14",
        surface: "#111820",
        surface2: "#16202b",
        aqua: "#00c8d8",
        aqua2: "#00e8ff",
        "aqua-dim": "rgba(0,200,220,0.12)",
        "aqua-glow": "rgba(0,200,220,0.25)",
        text1: "#e4eef5",
        text2: "#7a9ab5",
        text3: "#3f5f78",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,200,220,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;