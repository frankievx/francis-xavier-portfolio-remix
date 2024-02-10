import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: { aspectRatio: true },
  plugins: [
    // require("@tailwindcss/aspect-ratio")
  ],
} satisfies Config;
