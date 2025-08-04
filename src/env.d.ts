/// <reference types="astro/client" />
import type { AdvancedRuntime } from "@astrojs/cloudflare";
import type { D1Database, R2Bucket } from "@cloudflare/workers-types";
import type { LocaleText } from "./i18n/types";

type AppEnv = {
	DB: D1Database;
	R2_CDN: R2Bucket;
	AUTH_SECRET: string;
};

declare global {
	namespace App {
		interface Locals extends AdvancedRuntime<AppEnv> {
			texts: LocaleText;
			lang: string;
		}
	}
}
