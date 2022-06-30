import {ChildProcess, spawn} from 'node:child_process'

const hook = async function (options: {appName: string}): Promise<ChildProcess> {
  await spawn('cd', [options.appName], {shell: true, stdio: 'inherit'})

  const childProcess = await spawn('npm', [
    'install',
    'bootstrap@^5.1.3',
  ], {shell: true, stdio: 'inherit'})

  return childProcess
}

export default hook
