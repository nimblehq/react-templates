import {Command, Flags, Hook} from '@oclif/core'
import {ChildProcess} from 'node:child_process'
import Inquirer from 'inquirer'
import * as fs from 'node:fs'

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

  static flags = {
    versionControl: Flags.string({
      char: 'c',
      description: 'version control to use in the project',
      options: Object.keys(VERSION_CONTROL_OPTIONS),
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)
    const appName = args.appName
    const versionControlChoices = Object.keys(VERSION_CONTROL_OPTIONS).map((key: string) => {
      return {value: key, name: VERSION_CONTROL_OPTIONS[key]}
    })
    const questions = [
      {
        type: 'list',
        name: 'versionControl',
        message: 'Select a version control service:',
        choices: versionControlChoices,
      },
      {
        type: 'list',
        name: 'ui-framework',
        message: 'Select a UI Framework:',
        choices: [
          {
            value: 'bootstrap',
            name: 'Bootstrap',
          },
          {
            value: 'tailwind',
            name: 'Tailwind CSS',
          },
          {
            value: 'none',
            name: 'None',
          },
        ],
      },
    ]

    let versionControl = flags.versionControl

    if (!versionControl) {
      const answers = await Inquirer.prompt(questions)
      versionControl = answers.versionControl
    }

    await this.config.runHook('initialize', {appName: appName}).then((value : Hook.Result<ChildProcess>) => {
      value.successes[0].result.on('exit', () => {
        this.log(`Generating Nimble React app with the project name: ${appName}!`)

        if (versionControl) {
          this.setVersionControl(appName, versionControl)
        }
      })
    }).catch((error: string) => {
      this.error(error)
    })
  }

  setVersionControl = (appName: string, versionControl: string): void => {
    if (versionControl === 'github') {
      fs.rmSync(`${appName}/.gitlab`, {recursive: true, force: true})
    } else if (versionControl === 'gitlab') {
      fs.rmSync(`${appName}/.github`, {recursive: true, force: true})
    } else {
      fs.rmSync(`${appName}/.gitlab`, {recursive: true, force: true})
      fs.rmSync(`${appName}/.github`, {recursive: true, force: true})
    }
  }
}
