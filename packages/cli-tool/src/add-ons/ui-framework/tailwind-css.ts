import * as fs from 'fs';

import { CliUx } from '@oclif/core';

import runCommand from '../../helpers/child-process';
import { replaceLine } from '../../helpers/file-editor';

const DEV_DEPENDENCIES = [
  'tailwindcss@^3.1.4',
  'postcss@^8.4.14',
  'postcss-import@^14.1.0',
];

const installDevDependencies = (appName: string): Promise<void> => {
  return runCommand(
    'npm',
    ['install', '-D', ...DEV_DEPENDENCIES],
    `./${appName}/`,
  );
};

const removeScssFileStructure = (appName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Remove SCSS files...');

    try {
      fs.rmSync(`./${appName}/src/assets/stylesheets`, { recursive: true });
      fs.rmSync(`./${appName}/src/dummy.scss`);

      resolve();
    } catch (error) {
      CliUx.ux.info(
        'Error while removing the SCSS file structure:',
        error as string,
      );

      reject(error);
    }
  });
};

// Copy from template / add-ons / tailwind
const addTailwindFileStructure = (appName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Add TailwindCSS files...');

    try {
      const applicationCss = `./${appName}/.add-ons/tailwind/stylesheets/application.css`;
      const dummyCss = `./${appName}/.add-ons/tailwind/stylesheets/dummy.css`;
      const tailwindConfig = `./${appName}/.add-ons/tailwind/tailwind.config.js`;
      const postcssConfig = `./${appName}/.add-ons/tailwind/postcss.config.js`;

      fs.mkdirSync(`./${appName}/src/assets/stylesheets/`);
      fs.renameSync(
        applicationCss,
        `./${appName}/src/assets/stylesheets/application.css`,
      );
      fs.renameSync(dummyCss, `./${appName}/src/dummy.css`);
      fs.renameSync(tailwindConfig, `./${appName}/tailwind.config.js`);
      fs.renameSync(postcssConfig, `./${appName}/postcss.config.js`);

      resolve();
    } catch (error) {
      CliUx.ux.info('Error while copying files for Tailwind:', error as string);

      reject(error);
    }
  });
};

const addTailwindCssImport = (appName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Update css imports in App.tsx');

    try {
      const indexScssPath = `./${appName}/src/App.tsx`;

      replaceLine(
        indexScssPath,
        `import 'assets/stylesheets/application.scss';`,
        `import 'assets/stylesheets/application.css';`,
      );
      replaceLine(indexScssPath, `import 'dummy.scss';`, `import 'dummy.css';`);

      resolve();
    } catch (error) {
      CliUx.ux.info(
        'Error while adding the tailwind css import in App.tsx:',
        error as string,
      );

      reject(error);
    }
  });
};

const setupTailwindCss = async function(appName: string): Promise<void> {
  return installDevDependencies(appName)
    .then((_value) => removeScssFileStructure(appName))
    .then((_value) => addTailwindFileStructure(appName))
    .then((_value) => addTailwindCssImport(appName));
};

export default setupTailwindCss;
