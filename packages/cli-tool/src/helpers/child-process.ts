import { spawn } from 'node:child_process';

const runCommand = (
  command: string,
  args: string[],
  cwd = './',
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      shell: true,
      stdio: 'inherit',
      cwd,
    });

    childProcess.on('exit', () => {
      resolve();
    });
    childProcess.on('error', (error) => {
      reject(error);
    });
  });
};

export default runCommand;
