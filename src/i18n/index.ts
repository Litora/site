import { en } from "./en";
import { es } from "./es";
import type { LocaleText } from "./types";

const locales: Record<string, LocaleText> = { en, es };

export function getI18n(lang: string): LocaleText {
  return locales[lang];
}