import { TFuncKey } from 'react-i18next';

import defaultRes from '../../public/locales/en/translation.json';

export type TranslationKey = TFuncKey<'translation', undefined, { translation: typeof defaultRes }>;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof defaultRes };
  }
}
