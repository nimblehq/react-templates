import * as fs from 'node:fs'

import {Command} from '@oclif/core'
import {cli} from 'cli-ux'
import Inquirer from 'inquirer'

import getChoices from '../../helpers/choices'
import {formatHookErrorMsg, hookFailed} from '../../helpers/hook-error'

const UI_FRAMEWORK_OPTIONS: { [key: string]: string } = {
  bootstrap: 'Bootstrap',
  tailwind: 'Tailwind CSS',
  none: 'None',
}
const VERSION_CONTROL_OPTIONS: { [key: string]: string } = {
  github: 'GitHub',
  gitlab: 'GitLab',
  none: 'None',
}

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
    const {args} = await this.parse(Generate)
    const appName = args.appName
    const uiFrameworkChoices = getChoices(UI_FRAMEWORK_OPTIONS)
    const versionControlChoices = getChoices(VERSION_CONTROL_OPTIONS)
    const questions = [
      {
        type: 'list',
        name: 'versionControl',
        message: 'Select a version control service:',
        choices: versionControlChoices,
      },
      {
        type: 'list',
        name: 'uiFramework',
        message: 'Select a UI Framework:',
        choices: uiFrameworkChoices,
      },
    ]
    const answers = await Inquirer.prompt(questions)

    try {
      this.log(
        `Generating Nimble React app with the project name: ${appName}!`,
      )
      const result = await this.config.runHook('initialize', {
        appName,
        template: args.template,
      })

      if (hookFailed(result)) {
        cli.info(
          'Something went wrong while generating the cra-template...',
          formatHookErrorMsg(result),
        )
        return
      }

      this.setVersionControl(appName, answers.versionControl)
      await this.setUIFramework(appName, answers.uiFramework)

      // Clean files after all steps
      this.cleanFiles(appName)
    } catch (error) {
      this.error(error as string | Error)
    }
  }

  setUIFramework = async(
    appName: string,
    uiFramework: string,
  ): Promise<void> => {
    if (uiFramework === 'bootstrap') {
      cli.info('Configure Bootstrap...')
      const result = await this.config.runHook('install-bootstrap', {
        appName: appName,
      })

      if (hookFailed(result)) {
        const errorMsg = formatHookErrorMsg(result)
        cli.info(
          'Something went wrong while setting up bootstrap...',
          errorMsg,
        )
      }
    }

    if (uiFramework === 'tailwind') {
      cli.info('Tailwind is not available yet. Please configure it manually.')
    }
  };

  setVersionControl = (appName: string, versionControl: string): void => {
    if (versionControl === 'github') {
      cli.info('Configure GitHub...')

      fs.rmSync(`${appName}/.gitlab`, {recursive: true, force: true})
    } else if (versionControl === 'gitlab') {
      cli.info('Configure GitLab...')

      fs.rmSync(`${appName}/.github`, {recursive: true, force: true})
    } else {
      fs.rmSync(`${appName}/.gitlab`, {recursive: true, force: true})
      fs.rmSync(`${appName}/.github`, {recursive: true, force: true})
    }
  };

  cleanFiles = (appName: string): void => {
    fs.rmdirSync(`${appName}/.add-ons`)
  };
}
