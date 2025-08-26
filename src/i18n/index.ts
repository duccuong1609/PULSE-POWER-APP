import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./locales/en/en";
import { vi } from "./locales/vi/vi";

// import object thay vì JSON

i18n
  .use(LanguageDetector) // detect language từ localStorage, navigator,...
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React đã auto escape
    },
  });

export default i18n;