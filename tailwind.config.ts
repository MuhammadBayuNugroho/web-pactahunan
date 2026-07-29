import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6D28D9',       /* Violet 700 */
          purpleLight: '#8B5CF6',  /* Violet 500 */
          purpleDark: '#4C1D95',   /* Violet 900 */
          bgLight: '#F8FAFC',      /* Slate 50 */
          textDark: '#0F172A',     /* Slate 900 */
          emerald: '#10B981',      /* Emerald 500 */
          emeraldDark: '#047857'   /* Emerald 700 */
        }
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
