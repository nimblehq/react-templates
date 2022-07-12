import * as fs from 'fs';

import {expect, test} from '@oclif/test';
import Inquirer from 'inquirer';

const templateRepoPath = 'file:../cra-template';
const projectName = 'test-app';
const testScenarios =
  [
    {
      options: {
        versionControl: 'github',
        uiFramework: 'bootstrap',
      },
      testData: {
        filesShouldExist: [
          `${projectName}/.github`,
          `${projectName}/src/assets/stylesheets/vendor/bootstrap`,
        ],
        filesShouldNotExist: [
          `${projectName}/.gitlab`,
          `${projectName}/tailwind.config.js`,
        ],
        filesShouldContain: [
          {
            path: `${projectName}/package.json`,
            shouldContainString: 'bootstrap',
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
        ],
        filesShouldNotExist: [
          `${projectName}/.github`,
          `${projectName}/src/assets/stylesheets/vendor/bootstrap`,
        ],
        filesShouldContain: [
          {
            path: `${projectName}/package.json`,
            shouldContainString: 'tailwindcss',
          },
        ],
      },
    },
  ];

describe('generate', () => {
  test
    .stderr()
    .command(['generate'])
    .catch(error => {
      expect(error.message).to.contain('Missing 1 required arg:');
      expect(error.message).to.contain('appName  application name');
      expect(error.message).to.contain('See more help with --help');
    })
    .it('requires appName argument');

  testScenarios.forEach(scenario => {
    test
      .stdout()
      .stub(Inquirer, 'prompt', () => scenario.options)
      .command(['generate', `${projectName}`, templateRepoPath])
      .it(`generates an app ${projectName} with ${scenario.options.versionControl} and ${scenario.options.uiFramework}`, ctx => {
        expect(ctx.stdout).to.contain(`Generating Nimble React app with the project name: ${projectName}`);

        scenario.testData.filesShouldExist.forEach(file => {
          expect(fs.existsSync(file)).to.equal(true);
        });

        scenario.testData.filesShouldNotExist.forEach(file => {
          expect(fs.existsSync(file)).to.equal(false);
        });
      });
  });

  beforeEach(() => {
    fs.rmSync(`${projectName}`, {recursive: true, force: true});
  });
});
