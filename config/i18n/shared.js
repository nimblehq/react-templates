export default {
  debug: (process.env.NODE_ENV === 'development'),
  preload: ['en'],
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  react: {
    // globally set to wait for loaded translations in translate hoc
    wait: true
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  }
};
