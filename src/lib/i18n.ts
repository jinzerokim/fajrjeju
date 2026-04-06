export const locales = ["en", "ko", "id", "ur", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export const rtlLocales: Locale[] = ["ar", "ur"];
export const isRtl = (locale: Locale) => rtlLocales.includes(locale);

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  id: "Bahasa",
  ur: "اردو",
  ar: "العربية",
};
