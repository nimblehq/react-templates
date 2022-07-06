import {spawn} from 'node:child_process'

const runCommand = (
  command: string,
  args: string[],
  cwd = './',
): Promise<boolean> => {
  const initializePromise = new Promise(
    (resolve: (value: boolean) => void, reject) => {
      const childProcess = spawn(command, args, {
        shell: true,
        stdio: 'inherit',
        cwd,
      })

      childProcess.on('exit', () => {
        resolve(true)
      })
      childProcess.on('error', () => {
        reject()
      })
    },
  )

  return initializePromise
}

export default runCommand
