import { cli } from 'cli-ux';

import setupBootstrap from './bootstrap';
import setupTailwindCss from './tailwind-css';

export type uiFrameworkKey = 'bootstrap' | 'tailwindCss' | 'none';

export const UI_FRAMEWORK_OPTIONS = new Map<uiFrameworkKey, string>([
  ['bootstrap', 'Bootstrap'],
  ['tailwindCss', 'Tailwind CSS'],
  ['none', 'None'],
]);

export const setUIFramework = async(
  appName: string,
  uiFramework: uiFrameworkKey,
): Promise<void> => {
  switch (uiFramework) {
    case 'bootstrap':
      cli.info('Configure Bootstrap...');
      return setupBootstrap(appName);
      break;
    case 'tailwindCss':
      cli.info('Configure TailwindCSS...');
      return setupTailwindCss(appName);
      break;
  }
};
