import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLanguages = ['en'];

const DEFAULT_FALLBACK_LANGUAGE = 'en';

const configureI18n = (): void => {
  i18n
    // load translation using http -> see /public/locales
    // (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      fallbackLng: import.meta.env.VITE_DEFAULT_LANGUAGE ?? DEFAULT_FALLBACK_LANGUAGE,
      debug: false,
      supportedLngs: supportedLanguages,

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
};

export default configureI18n;
