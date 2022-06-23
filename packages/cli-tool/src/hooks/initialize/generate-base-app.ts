import {ChildProcess, spawn} from 'node:child_process'

const hook = async function (options: {appName: string}): Promise<ChildProcess> {
  const childProcess = await spawn('npx', [
    'create-react-app',
    `${options.appName}`,
    '--template @nimblehq',
  ], {shell: true, stdio: 'inherit'})

  return childProcess
}

export default hook
