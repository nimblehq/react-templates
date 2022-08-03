import runCommand from '../helpers/child-process';

const NIMBLE_CRA_TEMPLATE = '@nimblehq';

const initializeCraApp = async(
  appName: string,
  template: string,
  dest: string,
): Promise<void> => {
  if (template === '') {
    template = NIMBLE_CRA_TEMPLATE;
  }

  return runCommand('npx', [
    'create-react-app',
    `${appName}`,
    `--template ${template}`,
  ], dest);
};

export default initializeCraApp;
