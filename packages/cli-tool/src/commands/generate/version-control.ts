import * as fs from 'node:fs';

import { cli } from 'cli-ux';

export const VERSION_CONTROL_OPTIONS: { [key: string]: string } = {
  github: 'GitHub',
  gitlab: 'GitLab',
  none: 'None',
};

export const SetVersionControl = (appName: string, versionControl: string): void => {
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
