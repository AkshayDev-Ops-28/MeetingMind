import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          start: "#0A6B62",
          end: "#1EA854",
        },
        dark: "#0A1647",
        card: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        card: "0 4px 16px rgba(10,107,98,0.12)",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
