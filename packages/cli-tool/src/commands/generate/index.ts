import * as fs from 'node:fs';

import { Command } from '@oclif/core';
import Inquirer from 'inquirer';

import { setUIFramework } from '../../add-ons/ui-framework/index';
import { setVersionControl } from '../../add-ons/version-control/index';
import { questions } from '../../helpers/questions';
import initializeCraApp from '../../template/initialize-cra-app';

export default class Generate extends Command {
  static description = 'Generate Nimble React application';

  static examples = ['$ nimble-react generate app-name'];

  static args = [
    {
      name: 'appName',
      required: true,
      description: 'application name',
    },
    {
      name: 'template',
      required: false,
      description:
        'template location, use "file:{../path/to/your/local/template/repo}" for using a local cra template',
      default: '@nimblehq',
    },
  ];

  public async run(): Promise<void> {
    const {
      args: { appName, template },
    } = await this.parse(Generate);

    const answers = await Inquirer.prompt(questions);

    try {
      this.log(
        `Generating Nimble React app with the project name: ${appName}!`,
      );

      await initializeCraApp(appName, template);
      setVersionControl(appName, answers.versionControl);
      await setUIFramework(appName, answers.uiFramework);

      // Clean files after all steps
      this.cleanFiles(appName);
    } catch (error) {
      this.error(error as string | Error);
    }
  }

  cleanFiles = (appName: string): void => {
    fs.rmSync(`${appName}/.add-ons`, { recursive: true });
  };
}
