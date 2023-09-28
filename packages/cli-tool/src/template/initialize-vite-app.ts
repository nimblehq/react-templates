import { CliUx } from '@oclif/core';

import { InitTemplateOptions } from '.';
import runCommand from '../helpers/child-process';
import { replaceLine } from '../helpers/file-editor';
import { CopyStrategy } from './fetchingStrategy';

const replaceAppNameInFiles = ['package.json', 'index.html'];

const fetchTemplateFiles = (options: InitTemplateOptions): Promise<void> => {
  // If given a branch name, use
  // const fetchStrategy = new DownloadStrategy();
  const fetchStrategy = new CopyStrategy();

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
