import * as fs from 'fs';

import { expect, test } from '@oclif/test';
import Inquirer from 'inquirer';

import { bootstrapTestData } from '../../add-ons/ui-framework/bootstrap';
import { tailwindCssTestData } from '../../add-ons/ui-framework/tailwind-css';
import { gitHubTestData, gitLabTestData } from '../../add-ons/version-control';
import { TestScenario } from '../../helpers/test-scenario';

// const templateRepoPath = 'file:./packages/cra-template';
const viteBranch = 'feature/gh88-replace-webpack-with-vite';
const projectName = 'test-app';
const testFolderPath = '../../';

const projectPath = `${testFolderPath}${projectName}`;

const testScenarios: TestScenario[] = [
  {
    options: {
      template: 'vite',
      versionControl: 'github',
      uiFramework: 'bootstrap',
    },
    testData: {
      filesShouldExist: [
        ...gitHubTestData.filesShouldExist,
        ...bootstrapTestData.filesShouldExist,
      ],
      filesShouldNotExist: [
        ...gitHubTestData.filesShouldNotExist,
        ...bootstrapTestData.filesShouldNotExist,
      ],
      filesShouldContain: [
        ...gitHubTestData.filesShouldContain,
        ...bootstrapTestData.filesShouldContain,
      ],
    },
  },
  {
    options: {
      template: 'vite',
      versionControl: 'gitlab',
      uiFramework: 'tailwindCss',
    },
    testData: {
      filesShouldExist: [
        ...gitLabTestData.filesShouldExist,
        ...tailwindCssTestData.filesShouldExist,
      ],
      filesShouldNotExist: [
        ...gitLabTestData.filesShouldNotExist,
        ...tailwindCssTestData.filesShouldNotExist,
      ],
      filesShouldContain: [
        ...gitLabTestData.filesShouldContain,
        ...tailwindCssTestData.filesShouldContain,
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
      .command(['generate', `${projectName}`, viteBranch, testFolderPath])
      .it(
        `generates an app ${projectName} with ${scenario.options.versionControl} and ${scenario.options.uiFramework}`,
        (ctx) => {
          expect(ctx.stdout).to.contain(
            `Generating Nimble React app with the project name: ${projectName}`,
          );

          scenario.testData.filesShouldExist.forEach((file) => {
            expect(fs.existsSync(`${projectPath}${file}`)).to.equal(true);
          });

          scenario.testData.filesShouldNotExist.forEach((file) => {
            expect(fs.existsSync(`${projectPath}${file}`)).to.equal(false);
          });

          scenario.testData.filesShouldContain.forEach((file) => {
            const contents = fs.readFileSync(
              `${projectPath}${file.path}`,
              'utf-8',
            );

            const result = contents.includes(file.shouldContainString);

            expect(result).to.equal(true);
          });
        },
      );
  });
});
