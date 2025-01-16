import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationTR from './locales/tr.json';

const resources = {
  tr: translationTR
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 