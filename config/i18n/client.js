/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

import config from './shared';

i18n
  .use(XHR)
  .init({
    ...config,
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' }
  });

export default i18n;
