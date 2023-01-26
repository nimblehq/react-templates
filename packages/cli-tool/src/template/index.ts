import initializeCraApp from './initialize-cra-app';
import initializeViteApp from './initialize-vite-app';

export type templateOptions = 'webpack' | 'vite';
export const TEMPLATE_OPTIONS = new Map<templateOptions, string>([
  ['webpack', 'WebPack'],
  ['vite', 'Vite'],
]);

export const initializeTemplate = async({
  appName,
  templateOption,
  templateReference,
  dest,
}: {
  appName: string;
  templateOption: templateOptions;
  templateReference: string;
  dest: string;
}): Promise<void> => {
  if (templateOption === 'vite') {
    await initializeViteApp({
      appName,
      dest,
      branch: templateReference,
    });

    return;
  }

  await initializeCraApp(appName, templateReference, dest);
};
