import { CliUx } from '@oclif/core';

import { InitTemplateOptions } from '../.';
import runCommand from '../../helpers/child-process';
import { FetchStrategy } from './';

const TEMPLATE_SOURCE_FILES = '../vite-template';

class CopyStrategy implements FetchStrategy {
  async fetchTemplateFiles(options: InitTemplateOptions): Promise<void> {
    return this.copyTemplateFiles(options)
      .then(() => this.renameFolder(options));
  }

  private async copyTemplateFiles(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Copying template source files...');

    return runCommand(
      'cp',
      ['-r', TEMPLATE_SOURCE_FILES, options.dest],
    );
  }

  private async renameFolder(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Rename your app folder...');

    return runCommand(
      'mv',
      [`${options.dest}/vite-template`, `${options.dest}/${options.appName}`],
    );
  }
}

export default CopyStrategy;
