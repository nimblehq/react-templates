import * as fs from 'fs';

import { cli } from 'cli-ux';

export type versionControlOptions = 'github' | 'gitlab' | 'none';
export const VERSION_CONTROL_OPTIONS = new Map<versionControlOptions, string>([
  ['github', 'GitHub'],
  ['gitlab', 'GitLab'],
  ['none', 'None'],
]);

export const setVersionControl = (
  appName: string,
  versionControl: versionControlOptions,
): void => {
  if (versionControl === 'github') {
    cli.info('Configure GitHub...');

    fs.rmSync(`${appName}/.gitlab`, { recursive: true, force: true });
  } else if (versionControl === 'gitlab') {
    cli.info('Configure GitLab...');

    fs.rmSync(`${appName}/.github`, { recursive: true, force: true });
  } else {
    fs.rmSync(`${appName}/.gitlab`, { recursive: true, force: true });
    fs.rmSync(`${appName}/.github`, { recursive: true, force: true });
  }
};
