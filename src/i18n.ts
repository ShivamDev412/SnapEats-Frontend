import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import translationEN from '../public/locales/en/translation.json';
import translationFR from '../public/locales/fr/translation.json';
import translationES from '../public/locales/es/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  es: {
    translation: translationES
  }
}
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
