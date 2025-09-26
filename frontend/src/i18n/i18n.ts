import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en.json';
import esTranslation from './es.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation.translation
      },
      es: {
        translation: esTranslation.translation
      }
    },
    lng: "es", // default language
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
