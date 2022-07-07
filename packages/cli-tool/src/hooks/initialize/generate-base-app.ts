import runCommand from '../../helpers/child-process';

const hook = async function(options: {
  appName: string;
  template: string;
}): Promise<boolean> {
  return runCommand('npx', [
    'create-react-app',
    `${options.appName}`,
    `--template ${options.template}`,
  ]);
};

export default hook;
