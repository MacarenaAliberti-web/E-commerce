import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",       // fondo principal oscuro
        secondary: "#1f2937",     // gris oscuro
        accent: "#2563eb",        // azul
        soft: "#9ca3af",          // gris claro
        light: "#f3f4f6",         // fondo claro
        greenish: "#16a34a",      // verde
      },
    },
  },
  plugins: [],
};

export default config;
