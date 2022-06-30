import runCommand from '../../helpers/child-process'

const hook = async function(options: {appName: string}): Promise<boolean> {
  return runCommand('npx', [
    'create-react-app',
    `${options.appName}`,
    '--template @nimblehq',
  ])
}

export default hook
