// @ts-check
import { defineConfig } from "astro/config";
import react from '@astrojs/react'

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
      ssr: {
          noExternal: ["@subframe/core"],
      },
      css: {
          preprocessorOptions: {
              scss: {
                  api: "modern-compiler",
              },
          },
      },
	},

  integrations: [react()],
  adapter: cloudflare(),
});