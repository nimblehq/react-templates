import {Command, Flags, Hook} from '@oclif/core'
import {ChildProcess} from 'node:child_process'
import Inquirer from 'inquirer'
import * as fs from 'node:fs'
import getChoices from '../../helpers/choices'
import { cli } from 'cli-ux'

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

    await this.config.runHook('initialize', {appName: appName}).then((value : Hook.Result<ChildProcess>) => {
      value.successes[0].result.on('exit', () => {
        this.log(`Generating Nimble React app with the project name: ${appName}!`)

        if (answers.versionControl) {
          this.setVersionControl(appName, answers.versionControl)
        }
      })
    }).catch((error: string) => {
      this.error(error)
    })

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
