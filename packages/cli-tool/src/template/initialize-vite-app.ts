import { CliUx } from '@oclif/core';

import { InitTemplateOptions } from '.';
import runCommand from '../helpers/child-process';
import { replaceLine } from '../helpers/file-editor';
import { CopyStrategy, DownloadStrategy } from './fetchingStrategy';

const replaceAppNameInFiles = ['index.html'];
const replcaeNimbleNameInFiles = ['package.json'];

const fetchTemplateFiles = (options: InitTemplateOptions): Promise<void> => {
  let fetchStrategy: CopyStrategy | DownloadStrategy;

  // If passed templateReference in CLI, use the DownloadStrategy
  // TODO: Decide if we want to keep DownloadStrategy long-term
  if (options.templateReference && options.templateReference.trim() === '') {
    fetchStrategy = new DownloadStrategy();
  } else {
    fetchStrategy = new CopyStrategy();
  }

  return fetchStrategy.fetchTemplateFiles(options);
};

const replaceAppName = (options: InitTemplateOptions): void => {
  CliUx.ux.info('Setup your application name...');

  replaceAppNameInFiles.forEach((fileName) => {
    replaceLine(
      `${options.dest}${options.appName}/${fileName}`,
      '%APP_NAME%',
      options.appName,
    );
  });

  replcaeNimbleNameInFiles.forEach((fileName) => {
    replaceLine(
      `${options.dest}${options.appName}/${fileName}`,
      'nimble-vite-template',
      options.appName,
    );
  });
};

const npmInstall = (options: InitTemplateOptions): Promise<void> => {
  CliUx.ux.info('Run npm install...');
  return runCommand('npm', ['i'], `${options.dest}/${options.appName}`);
};

const initializeViteApp = async(options: InitTemplateOptions): Promise<void> => {
  return fetchTemplateFiles(options)
    .then(() => replaceAppName(options))
    .then(() => npmInstall(options));
};

export default initializeViteApp;
