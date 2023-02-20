import * as fs from 'fs';

import { expect, test } from '@oclif/test';
import Inquirer from 'inquirer';

import { bootstrapTestData } from '../../add-ons/ui-framework/bootstrap';
import { tailwindCssTestData } from '../../add-ons/ui-framework/tailwind-css';
import { gitHubTestData, gitLabTestData, noVersionControlTestData } from '../../add-ons/version-control';
import { TestScenario } from '../../helpers/test-scenario';

const craTemplateReference = `file:./react-templates/packages/cra-template`;
// TODO: Adjust viteTemplateReference to use commit hash of development branch for vite template
// https://github.com/nimblehq/react-templates/commit/52288d1e5e560bcc717f760f1fd19f7cb1b0085e
const viteTemplateReference = '52288d1e5e560bcc717f760f1fd19f7cb1b0085e';
const projectName = 'test-app';
const testFolderPath = '../../../';

const projectPath = `${testFolderPath}${projectName}`;
const viteTestScenarios: TestScenario[] = [
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
const craTestScenarios: TestScenario[] = [
  {
    options: {
      template: 'cra',
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
      template: 'cra',
      versionControl: 'none',
      uiFramework: 'tailwindCss',
    },
    testData: {
      filesShouldExist: [
        ...noVersionControlTestData.filesShouldExist,
        ...tailwindCssTestData.filesShouldExist,
      ],
      filesShouldNotExist: [
        ...noVersionControlTestData.filesShouldNotExist,
        ...tailwindCssTestData.filesShouldNotExist,
      ],
      filesShouldContain: [
        ...noVersionControlTestData.filesShouldContain,
        ...tailwindCssTestData.filesShouldContain,
      ],
    },
  },
];
const testScenarios: TestScenario[] = [...craTestScenarios, ...viteTestScenarios];

describe('generate', () => {
  afterEach(() => {
    fs.rmSync(projectPath, {
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
      .command(['generate', `${projectName}`, testFolderPath, scenario.options.template === 'vite' ? viteTemplateReference : craTemplateReference])
      .it(
        `generates a ${scenario.options.template} app ${projectName} with ${scenario.options.versionControl} and ${scenario.options.uiFramework}`,
        (ctx) => {
          expect(ctx.stdout).to.contain(
            `Generating Nimble React app with the project name: ${projectName}`,
          );

          expect(
            fs.existsSync(projectPath),
            'Expect the project path to exists',
          ).to.equal(true);

          scenario.testData.filesShouldExist.forEach((file) => {
            const message = `Expect ${projectPath}${file} to exists.`;
            expect(fs.existsSync(`${projectPath}${file}`), message).to.equal(
              true,
            );
          });

          scenario.testData.filesShouldNotExist.forEach((file) => {
            const message = `Expect ${projectPath}${file} to NOT exists.`;
            expect(fs.existsSync(`${projectPath}${file}`), message).to.equal(
              false,
            );
          });

          scenario.testData.filesShouldContain.forEach((file) => {
            const contents = fs.readFileSync(
              `${projectPath}${file.path}`,
              'utf-8',
            );

            const result = contents.includes(file.shouldContainString);

            const message = `Expect ${projectPath}${file.path} to contain string: ${file.shouldContainString}.`;
            expect(result, message).to.equal(true);
          });
        },
      );
  });
});
