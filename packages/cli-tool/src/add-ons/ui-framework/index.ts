import { cli } from 'cli-ux';

import setupBootstrap from './bootstrap';
import setupTailwindCss from './tailwind-css';

export const UI_FRAMEWORK_OPTIONS: { [key: string]: string } = {
  bootstrap: 'Bootstrap',
  tailwindCss: 'Tailwind CSS',
  none: 'None',
};

export const setUIFramework = async(
  appName: string,
  uiFramework: string,
): Promise<void> => {
  switch (uiFramework) {
    case 'bootstrap':
      cli.info('Configure Bootstrap...');
      await setupBootstrap(appName);
      break;
    case 'tailwindCss':
      cli.info('Configure TailwindCSS...');
      await setupTailwindCss(appName);
      break;
  }
};
