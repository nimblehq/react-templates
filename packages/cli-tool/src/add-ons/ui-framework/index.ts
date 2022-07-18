import { CliUx } from '@oclif/core';

import setupBootstrap from './bootstrap';
import setupTailwindCss from './tailwind-css';

export type uiFrameworkKey = 'bootstrap' | 'tailwindCss' | 'none';

export const UI_FRAMEWORK_OPTIONS = new Map<uiFrameworkKey, string>([
  ['bootstrap', 'Bootstrap'],
  ['tailwindCss', 'Tailwind CSS'],
  ['none', 'None'],
]);

export const setUIFramework = async(
  appPath: string,
  uiFramework: uiFrameworkKey,
): Promise<void> => {
  switch (uiFramework) {
    case 'bootstrap':
      CliUx.ux.info('Configure Bootstrap...');
      return setupBootstrap(appPath);
    case 'tailwindCss':
      CliUx.ux.info('Configure TailwindCSS...');
      return setupTailwindCss(appPath);
  }
};
