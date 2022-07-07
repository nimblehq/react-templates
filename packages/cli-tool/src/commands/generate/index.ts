import * as fs from 'node:fs';

import { Command } from '@oclif/core';
import { cli } from 'cli-ux';
import Inquirer from 'inquirer';

import getChoices from '../../helpers/choices';
import { formatHookErrorMsg, hookFailed } from '../../helpers/hook-error';
import { VERSION_CONTROL_OPTIONS, SetVersionControl } from './version-control';

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
    const { args } = await this.parse(Generate);
    const appName = args.appName;
    const versionControlChoices = getChoices(VERSION_CONTROL_OPTIONS);
    const questions = [
      {
        type: 'list',
        name: 'versionControl',
        message: 'Select a version control service:',
        choices: versionControlChoices,
      },
    ];
    const answers = await Inquirer.prompt(questions);

    try {
      this.log(
        `Generating Nimble React app with the project name: ${appName}!`,
      );
      const result = await this.config.runHook('initialize', {
        appName,
        template: args.template,
      });

      if (hookFailed(result)) {
        cli.info(
          'Something went wrong while generating the cra-template...',
          formatHookErrorMsg(result),
        );
        return;
      }

      SetVersionControl(appName, answers.versionControl);
    } catch (error) {
      this.error(error as string | Error);
    }
  }
}
