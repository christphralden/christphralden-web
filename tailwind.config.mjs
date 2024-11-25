/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontfamily: {
        medium: ["medium"],
        montreal: ["montreal", "monospace"],
      },
      colors: {
        background: "#fafafa",
        accent: "#0000FF",
      },
    },
  },
  plugins: [],
};
