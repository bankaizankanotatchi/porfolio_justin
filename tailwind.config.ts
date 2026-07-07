import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        border: "var(--border)",
        card: "var(--card)",
        accent: {
          cyan: "#06b6d4",
          purple: "#a78bfa",
          emerald: "#10b981",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(6, 182, 212, 0.15)",
        "neon-purple": "0 0 20px rgba(167, 139, 250, 0.15)",
        "neon-emerald": "0 0 20px rgba(16, 185, 129, 0.15)",
      }
    },
  },
  plugins: [],
};
export default config;
