import {Command, Hook} from '@oclif/core'
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

  public async run(): Promise<void> {
    const {args} = await this.parse(Generate)

    await this.config.runHook('initialize', {appName: args.appName}).then((value : Hook.Result<ChildProcess>) => {
      value.successes[0].result.on('exit', () => {
        this.log(`Generating Nimble React app with the project name = ${args.appName}!`)

        // Continue on prompt for add on
        this.promptVersionControl(args.appName)
      })
    }).catch((error: string) => {
      this.error(error)
    })
  }

  promptVersionControl = async (appName: string): Promise<void> => {
    const addGitlab = await cli.prompt('Which version control do you use? (Github/Gitlab)')

    if (addGitlab === 'Github') {
      fs.rmSync(`${appName}/.gitlab`, {recursive: true, force: true})
    } else if (addGitlab === 'Gitlab') {
      fs.rmSync(`${appName}/.github`, {recursive: true, force: true})
    }
  }
}
