import * as fs from 'fs';

import { expect, test } from '@oclif/test';
import Inquirer from 'inquirer';

import { bootstrapTestData } from '../../add-ons/ui-framework/bootstrap';
import { tailwindCssTestData } from '../../add-ons/ui-framework/tailwind-css';
import { gitHubTestData } from '../../add-ons/version-control/github';
import { gitLabTestData } from '../../add-ons/version-control/gitlab';
import { TestScenario } from '../../helpers/test-scenario';

const templateRepoPath = 'file:./packages/cra-template';
const projectName = 'test-app';
const testFolderPath = '../../';

const gitHubData = gitHubTestData(projectName);
const gitLabData = gitLabTestData(projectName);

const bootstrapData = bootstrapTestData(projectName);
const tailwindCssData = tailwindCssTestData(projectName);

const testScenarios: TestScenario[] = [
  {
    options: {
      versionControl: 'github',
      uiFramework: 'bootstrap',
    },
    testData: {
      filesShouldExist: [
        ...gitHubData.filesShouldExist,
        ...bootstrapData.filesShouldExist,
      ],
      filesShouldNotExist: [
        ...gitHubData.filesShouldNotExist,
        ...bootstrapData.filesShouldNotExist,
      ],
      filesShouldContain: [
        ...gitHubData.filesShouldContain,
        ...bootstrapData.filesShouldContain,
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
        ...gitLabData.filesShouldExist,
        ...tailwindCssData.filesShouldExist,
      ],
      filesShouldNotExist: [
        ...gitLabData.filesShouldNotExist,
        ...tailwindCssData.filesShouldNotExist,
      ],
      filesShouldContain: [
        ...gitLabData.filesShouldContain,
        ...tailwindCssData.filesShouldContain,
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
