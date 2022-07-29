import * as fs from 'fs';

import { CliUx } from '@oclif/core';

export type versionControlOptions = 'github' | 'gitlab' | 'none';
export const VERSION_CONTROL_OPTIONS = new Map<versionControlOptions, string>([
  ['github', 'GitHub'],
  ['gitlab', 'GitLab'],
  ['none', 'None'],
]);

export const setVersionControl = (
  appPath: string,
  versionControl: versionControlOptions,
): void => {
  if (versionControl === 'github') {
    CliUx.ux.info('Configure GitHub...');

    fs.rmSync(`${appPath}/.gitlab`, { recursive: true, force: true });
  } else if (versionControl === 'gitlab') {
    CliUx.ux.info('Configure GitLab...');

    fs.rmSync(`${appPath}/.github`, { recursive: true, force: true });
  } else {
    fs.rmSync(`${appPath}/.gitlab`, { recursive: true, force: true });
    fs.rmSync(`${appPath}/.github`, { recursive: true, force: true });
  }
};
