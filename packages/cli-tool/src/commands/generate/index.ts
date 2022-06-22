import {Command, Flags, Hook} from '@oclif/core'
import {ChildProcess} from 'node:child_process'

export default class Generate extends Command {
  static description = 'Generate Nimble React application'

  static examples = [
    '$ nimble-react generate --appName=app-name',
    '$ nimble-react generate -n=app-name',
  ]

  static flags = {
    appName: Flags.string({char: 'n', description: 'Application name', required: true}),
  }

  static args = []

  public async run(): Promise<void> {
    const {flags} = await this.parse(Generate)

    await this.config.runHook('initialize', {appName: flags.appName}).then((value : Hook.Result<ChildProcess>) => {
      value.successes[0].result.on('exit', () => {
        this.log(`Generating Nimble React app with the project name = ${flags.appName}!`)

        // Continue on prompt for add on
      })
    }).catch((error: string) => {
      this.error(error)
    })
  }
}
