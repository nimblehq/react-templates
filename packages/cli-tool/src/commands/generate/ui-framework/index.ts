import { cli } from 'cli-ux';

import setupBootstrap from './bootstrap';

export const UI_FRAMEWORK_OPTIONS: { [key: string]: string } = {
  bootstrap: 'Bootstrap',
  tailwind: 'Tailwind CSS',
  none: 'None',
};

export const setUIFramework = async(
  appName: string,
  uiFramework: string,
): Promise<void> => {
  if (uiFramework === 'bootstrap') {
    cli.info('Configure Bootstrap...');

    await setupBootstrap(appName);
  }
  if (uiFramework === 'tailwind') {
    cli.info('Tailwind is not available yet. Please configure it manually.');
  }
};
