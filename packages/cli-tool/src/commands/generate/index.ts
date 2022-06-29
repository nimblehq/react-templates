import {Command, Flags, Hook} from '@oclif/core'
import {ChildProcess} from 'node:child_process'
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
      options: ['Github', 'Gitlab'],
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Generate)
    const appName = args.appName

    await this.config.runHook('initialize', {appName: appName}).then((value : Hook.Result<ChildProcess>) => {
      value.successes[0].result.on('exit', () => {
        this.log(`Generating Nimble React app with the project name = ${appName}!`)

        const versionControl = flags['version-control']
        if (versionControl) {
          this.setVersionControl(appName, versionControl)
        } else {
          this.promptVersionControl(appName)
        }
      })
    }).catch((error: string) => {
      this.error(error)
    })
  }

  promptVersionControl = async (appName: string): Promise<void> => {
    const versionControl = await cli.prompt('Which version control do you use? (Github/Gitlab)')
    this.setVersionControl(appName, versionControl)
  }

  setVersionControl = (appName: string, versionControl: string): void => {
    if (versionControl === 'Github') {
      fs.rmSync(`${appName}/.gitlab`, {recursive: true, force: true})
    } else if (versionControl === 'Gitlab') {
      fs.rmSync(`${appName}/.github`, {recursive: true, force: true})
    }
  }
}
