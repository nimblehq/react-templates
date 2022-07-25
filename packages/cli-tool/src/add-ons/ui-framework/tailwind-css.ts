import * as fs from 'fs';

import { CliUx } from '@oclif/core';

import runCommand from '../../helpers/child-process';
import { replaceLine } from '../../helpers/file-editor';

const DEV_DEPENDENCIES = [
  'tailwindcss@^3.1.4',
  'postcss@^8.4.14',
  'postcss-import@^14.1.0',
  'autoprefixer@^10.4.7',
];

const installDevDependencies = (appPath: string): Promise<void> => {
  return runCommand(
    'npm',
    ['install', '-D', ...DEV_DEPENDENCIES],
    `${appPath}/`,
  );
};

const removeScssFileStructure = (appPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Remove SCSS files...');

    try {
      fs.rmSync(`${appPath}/src/assets/stylesheets`, { recursive: true });
      fs.rmSync(`${appPath}/src/dummy.scss`);

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
const addTailwindFileStructure = (appPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Add TailwindCSS files...');

    try {
      const applicationCss = `${appPath}/.add-ons/tailwind/stylesheets/application.css`;
      const dummyCss = `${appPath}/.add-ons/tailwind/stylesheets/dummy.css`;
      const tailwindConfig = `${appPath}/.add-ons/tailwind/tailwind.config.js`;
      const postcssConfig = `${appPath}/.add-ons/tailwind/postcss.config.js`;

      fs.mkdirSync(`${appPath}/src/assets/stylesheets/`);
      fs.renameSync(
        applicationCss,
        `${appPath}/src/assets/stylesheets/application.css`,
      );
      fs.renameSync(dummyCss, `${appPath}/src/dummy.css`);
      fs.renameSync(tailwindConfig, `${appPath}/tailwind.config.js`);
      fs.renameSync(postcssConfig, `${appPath}/postcss.config.js`);

      resolve();
    } catch (error) {
      CliUx.ux.info('Error while copying files for Tailwind:', error as string);

      reject(error);
    }
  });
};

const addTailwindCssImport = (appPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    CliUx.ux.info('Update css imports in App.tsx');

    try {
      const indexScssPath = `${appPath}/src/App.tsx`;

      // When using Webpack
      replaceLine(
        indexScssPath,
        `import 'assets/stylesheets/application.scss';`,
        `import 'assets/stylesheets/application.css';`,
      );
      replaceLine(indexScssPath, `import '@/dummy.scss';`, `import '@/dummy.css';`);

      // When using Vite
      replaceLine(
        indexScssPath,
        `import '@/assets/stylesheets/application.scss';`,
        `import '@/assets/stylesheets/application.css';`,
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

const setupTailwindCss = async function(appPath: string): Promise<void> {
  return installDevDependencies(appPath)
    .then((_value) => removeScssFileStructure(appPath))
    .then((_value) => addTailwindFileStructure(appPath))
    .then((_value) => addTailwindCssImport(appPath));
};

export default setupTailwindCss;
