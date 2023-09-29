import initializeCraApp from './initialize-cra-app';
import initializeViteApp from './initialize-vite-app';

export type templateOptions = 'webpack' | 'vite';

export type InitTemplateOptions = {
  appName: string;
  dest: string;
  templateReference: string; // Git branch name or path to a local template folder
};

export const TEMPLATE_OPTIONS = new Map<templateOptions, string>([
  ['webpack', 'WebPack'],
  ['vite', 'Vite'],
]);

export const initializeTemplate = async({
  appName,
  dest,
  templateOption,
  templateReference,
}: {
  templateOption: templateOptions;
} & InitTemplateOptions): Promise<void> => {
  if (templateOption === 'vite') {
    await initializeViteApp({
      appName,
      dest,
      templateReference,
    });

    return;
  }

  await initializeCraApp(appName, templateReference, dest);
};
