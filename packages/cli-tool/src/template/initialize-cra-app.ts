import runCommand from '../helpers/child-process';

const initializeCraApp = async(
  appName: string,
  template: string,
): Promise<boolean> => {
  return runCommand('npx', [
    'create-react-app',
    `${appName}`,
    `--template ${template}`,
  ]);
};

export default initializeCraApp;
