import type { MiddlewareHandler } from "astro";
import parser from "accept-language-parser";
import { getI18n } from "./i18n";

const PREFERRED_LOCALES = ["es", "en"] as const;

export const onRequest: MiddlewareHandler = async (context, next) => {
	const raw = context.request.headers.get("accept-language") || "en";

	const parsed = parser.parse(raw).map((l) => l.code.toLowerCase());

	const lang =
		parsed.find((code) =>
			PREFERRED_LOCALES.includes(code as (typeof PREFERRED_LOCALES)[number])
		) ?? "en";

	context.locals.lang = lang;
	context.locals.texts = getI18n(lang);

	return next();
};
