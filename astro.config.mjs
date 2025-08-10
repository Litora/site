// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

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
		resolve: {
			alias: import.meta.env.PROD
				? {
						"react-dom/server": "react-dom/server.edge",
				  }
				: undefined,
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						hls: ['hls.js'],
						jquery: ['jquery']
					}
				}
			}
		}
	},

	integrations: [react()],
	adapter: cloudflare(),
	output: "server"
});
