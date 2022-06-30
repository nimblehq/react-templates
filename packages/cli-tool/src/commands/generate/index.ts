import * as fs from 'node:fs'

import {Command} from '@oclif/core'
import {cli} from 'cli-ux'
import Inquirer from 'inquirer'

import getChoices from '../../helpers/choices'

const UI_FRAMEWORK_OPTIONS: { [key: string]: string; } = {bootstrap: 'Bootstrap', tailwind: 'Tailwind CSS', none: 'None'}
const VERSION_CONTROL_OPTIONS: { [key: string]: string; } = {github: 'GitHub', gitlab: 'GitLab', none: 'None'}

export default class Generate extends Command {
  static description = 'Generate Nimble React application'

  static examples = [
    '$ nimble-react generate app-name',
  ]

  static args = [{
    name: 'appName',
    required: true,
    description: 'application name',
  }]

  public async run(): Promise<void> {
    const {args} = await this.parse(Generate)
    const appName = args.appName
    const versionControlChoices = getChoices(VERSION_CONTROL_OPTIONS)
    const uiFrameworkChoices = getChoices(UI_FRAMEWORK_OPTIONS)
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
      this.log(`Generating Nimble React app with the project name: ${appName}!`)
      const initializeResult = await this.config.runHook('initialize', {appName: appName})

      if (initializeResult.successes[0]) {
        if (answers.versionControl) {
          this.setVersionControl(appName, answers.versionControl)
        }
      }
    } catch (error: any) {
      this.error(error)
    }

    if (answers.uiFramework === 'bootstrap') {
      cli.info('Configure Bootstrap...')
      await this.config.runHook('install-bootstrap', {appName: appName})
    }
  }

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
  }
}
