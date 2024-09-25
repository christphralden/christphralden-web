// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercelStatic from "@astrojs/vercel/static";

export default defineConfig({
  integrations: [tailwind(), react()],

  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    },
  }),
  vite: {
    ssr: {
      noExternal: ["gsap"],
    },
  },
});
