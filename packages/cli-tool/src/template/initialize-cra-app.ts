import runCommand from '../helpers/child-process';

const initializeCraApp = async(
  appName: string,
  template: string,
  dest: string,
): Promise<void> => {
  return runCommand('npx', [
    'create-react-app',
    `${appName}`,
    `--template ${template}`,
  ], dest);
};

export default initializeCraApp;
