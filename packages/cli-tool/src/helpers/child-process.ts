import {spawn} from 'node:child_process'

const runCommand = (name: string, options: string[]): Promise<boolean> => {
  const initializePromise = new Promise(
    (resolve: (value: boolean) => void, reject) => {
      const childProcess = spawn(name, options, {
        shell: true,
        stdio: 'inherit',
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
