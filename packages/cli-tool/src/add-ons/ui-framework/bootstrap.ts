import * as fs from 'fs';

import { CliUx } from '@oclif/core';

import runCommand from '../../helpers/child-process';
import {
  addLinesToFileAfterMatchedLine,
  lineFinderFuncType,
} from '../../helpers/file-editor';

const DEV_DEPENDENCIES = ['bootstrap@^5.1.3'];

export const addBootstrapFileStructure = (appPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Starting: ', `${appPath}/.add-ons/bootstrap`);

    try {
      const destPath = `${appPath}/src/assets/stylesheets/vendor/bootstrap/`;
      fs.renameSync(`${appPath}/.add-ons/bootstrap/`, destPath);

      resolve();
    } catch (error) {
      CliUx.ux.info(
        'Error while copying vendor files for Bootstrap:',
        error as string,
      );

      reject(error);
    }
  });
};

const bootstrapImportLocationFinder: lineFinderFuncType = (
  lines: string[],
): number => {
  return lines.indexOf('// Dependencies');
};

// In index.scss, Replace "// Dependencies" by `// Dependencies \n@import 'vendor/bootstrap';` in application.scss
const addBootstrapScssUseLine = (appPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Insert bootstrap scss import.');

    try {
      const indexScssPath = `${appPath}/src/assets/stylesheets/application.scss`;
      const lineToAdd = `@use 'src/assets/stylesheets/vendor/bootstrap';`;

      addLinesToFileAfterMatchedLine(
        indexScssPath,
        bootstrapImportLocationFinder,
        [lineToAdd],
      );

      resolve();
    } catch (error) {
      CliUx.ux.info(
        'Error while adding the bootstrap lib import in index.scss:',
        error as string,
      );

      reject(error);
    }
  });
};

const installDevDependencies = (appPath: string): Promise<void> => {
  return runCommand('npm', ['install', ...DEV_DEPENDENCIES], `${appPath}/`);
};

const setupBootstrap = async(appPath: string): Promise<void> => {
  return installDevDependencies(appPath)
    .then((_value) => addBootstrapFileStructure(appPath))
    .then((_value) => addBootstrapScssUseLine(appPath));
};

export default setupBootstrap;
