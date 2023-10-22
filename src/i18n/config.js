import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translations.json";
import uk from "./locales/uk/translations.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: en,
      },
      uk: {
        translation: uk,
      },
    },
    debug: true,
    fallbackLng: "en",
    detection: { order: ["navigator"] },
  });

export default i18n;
