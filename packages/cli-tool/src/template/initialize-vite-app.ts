import { CliUx } from '@oclif/core';

import runCommand from '../helpers/child-process';
import { replaceLine } from '../helpers/file-editor';
import { downloadRepository } from '../helpers/github';

const TEMPLATE_OWNER = 'nimblehq';
const TEMPLATE_REPO = 'react-templates';
const replaceAppNameInFiles = ['package.json', 'index.html'];

type InitViteOptions = {
  dest: string;
  appName: string;
  branch: string;
};

const downloadTemplateRepository = (
  options: InitViteOptions,
): Promise<void> => {
  CliUx.ux.info('Downloading template source files...');

  return downloadRepository(
    {
      gitHubAccount: TEMPLATE_OWNER,
      repositoryName: TEMPLATE_REPO,
      branch: options.branch,
    },
    options.appName,
    options.dest,
  );
};

const extractViteTemplateFolder = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info('Extracting template source files...');

  return runCommand(
    'tar',
    ['-xz', '-f', `${options.appName}.gz`],
    options.dest,
  );
};

const renameFolder = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info('Rename your app folder...');
  const branchPath = options.branch.replace('/', '-');

  return runCommand(
    'mv',
    [`${TEMPLATE_REPO}-${branchPath}/vite-template/`, options.appName],
    options.dest,
  );
};

const replaceAppName = (options: InitViteOptions): void => {
  CliUx.ux.info('Setup your application name...');
  replaceAppNameInFiles.forEach((fileName) => {
    replaceLine(
      `${options.dest}${options.appName}/${fileName}`,
      '%APP_NAME%',
      options.appName,
    );
  });
};

const npmInstall = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info('Run npm install...');
  return runCommand('npm', ['i'], `${options.dest}/${options.appName}`);
};

const cleanTemporaryFiles = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info('Remove zip and unwanted files...');
  const branchPath = options.branch.replace('/', '-');

  // Remove the archive
  return runCommand('rm', [`${options.appName}.gz`], options.dest).then(() => {
    // Remove the extracted folder
    return runCommand(
      'rm',
      ['-rf', `${TEMPLATE_REPO}-${branchPath}`],
      options.dest,
    );
  });
};

const initializeViteApp = async(options: InitViteOptions): Promise<void> => {
  return downloadTemplateRepository(options)
    .then(() => extractViteTemplateFolder(options))
    .then(() => renameFolder(options))
    .then(() => replaceAppName(options))
    .then(() => npmInstall(options))
    .then(() => cleanTemporaryFiles(options));
};

export default initializeViteApp;
