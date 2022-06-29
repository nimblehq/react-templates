import {Command, Flags, Hook} from '@oclif/core'
import {ChildProcess} from 'node:child_process'
import Inquirer from 'inquirer'
import cli from 'cli-ux'
import * as fs from 'node:fs'

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
    'version-control': Flags.string({
      char: 'c',
      description: 'version control to use in the project',
      options: ['github', 'gitlab', 'none'],
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)
    const appName = args.appName
    const questions = [
      {
        type: 'list',
        name: 'versionControl',
        message: 'Select a version control service:',
        choices: [
          {
            value: 'github',
            name: 'GitHub',
          },
          {
            value: 'gitlab',
            name: 'GitLab',
          },
          {
            value: 'none',
            name: 'None',
          },
        ],
      },
    ]

    let versionControl = flags['version-control']

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
