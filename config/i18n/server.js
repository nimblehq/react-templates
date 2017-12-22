/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import FileSystem from 'i18next-node-fs-backend';
import path from 'path';

import config from './shared';

i18n
  .use(FileSystem)
  .init({
    ...config,
    backend: { loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json') }
  });

export default i18n;
