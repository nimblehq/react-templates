import * as fs from 'fs';

import { expect, test } from '@oclif/test';
import Inquirer from 'inquirer';

const templateRepoPath = 'file:./packages/cra-template';
const projectName = 'test-app';
const testFolderPath = '../../';

const testScenarios = [
  {
    options: {
      versionControl: 'github',
      uiFramework: 'bootstrap',
    },
    testData: {
      filesShouldExist: [
        `${projectName}/.github`,
        `${projectName}/src/assets/stylesheets/vendor/bootstrap/index.scss`,
      ],
      filesShouldNotExist: [
        `${projectName}/.gitlab`,
        `${projectName}/tailwind.config.js`,
        `${projectName}/src/assets/stylesheets/application.css`,
      ],
      filesShouldContain: [
        {
          path: `${projectName}/package.json`,
          shouldContainString: 'bootstrap',
        },
        {
          path: `${projectName}/src/assets/stylesheets/application.scss`,
          shouldContainString: 'vendor/bootstrap',
        },
      ],
    },
  },
  {
    options: {
      versionControl: 'gitlab',
      uiFramework: 'tailwindCss',
    },
    testData: {
      filesShouldExist: [
        `${projectName}/.gitlab`,
        `${projectName}/tailwind.config.js`,
        `${projectName}/postcss.config.js`,
        `${projectName}/src/assets/stylesheets/application.css`,
      ],
      filesShouldNotExist: [
        `${projectName}/.github`,
        `${projectName}/src/assets/stylesheets/vendor/bootstrap`,
        `${projectName}/src/assets/stylesheets/application.scss`,
      ],
      filesShouldContain: [
        {
          path: `${projectName}/package.json`,
          shouldContainString: 'tailwindcss',
        },
        {
          path: `${projectName}/package.json`,
          shouldContainString: 'postcss-import',
        },
        {
          path: `${projectName}/src/assets/stylesheets/application.css`,
          shouldContainString: '@tailwind base;',
        },
        {
          path: `${projectName}/src/assets/stylesheets/application.css`,
          shouldContainString: '@tailwind components;',
        },
        {
          path: `${projectName}/src/assets/stylesheets/application.css`,
          shouldContainString: '@tailwind utilities;',
        },
      ],
    },
  },
];

describe('generate', () => {
  afterEach(() => {
    fs.rmSync(`${testFolderPath}${projectName}`, {
      recursive: true,
      force: true,
    });
  });

  test
    .stderr()
    .command(['generate'])
    .catch((error) => {
      expect(error.message).to.contain('Missing 1 required arg:');
      expect(error.message).to.contain('appName  application name');
      expect(error.message).to.contain('See more help with --help');
    })
    .it('requires appName argument');

  testScenarios.forEach((scenario) => {
    test
      .stdout()
      .stub(Inquirer, 'prompt', () => scenario.options)
      .command(['generate', `${projectName}`, templateRepoPath, testFolderPath])
      .it(
        `generates an app ${projectName} with ${scenario.options.versionControl} and ${scenario.options.uiFramework}`,
        (ctx) => {
          expect(ctx.stdout).to.contain(
            `Generating Nimble React app with the project name: ${projectName}`,
          );

          scenario.testData.filesShouldExist.forEach((file) => {
            expect(fs.existsSync(`${testFolderPath}${file}`)).to.equal(true);
          });

          scenario.testData.filesShouldNotExist.forEach((file) => {
            expect(fs.existsSync(`${testFolderPath}${file}`)).to.equal(false);
          });

          scenario.testData.filesShouldContain.forEach((file) => {
            const contents = fs.readFileSync(
              `${testFolderPath}${file.path}`,
              'utf-8',
            );

            const result = contents.includes(file.shouldContainString);

            expect(result).to.equal(true);
          });
        },
      );
  });
});
