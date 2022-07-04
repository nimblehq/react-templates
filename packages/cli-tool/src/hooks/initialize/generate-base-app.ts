import { template } from '@oclif/core/lib/help/util'
import { cli } from 'cli-ux'
import runCommand from '../../helpers/child-process'

const hook = async function(options: {appName: string, template: string}): Promise<boolean> {
  return runCommand('npx', [
    'create-react-app',
    `${options.appName}`,
    `--template ${options.template}`,
  ]).then(_value => { return runCommand('cd', [`./${options.appName}`]) })
}

export default hook
