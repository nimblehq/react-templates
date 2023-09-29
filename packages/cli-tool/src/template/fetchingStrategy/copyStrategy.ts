import { CliUx } from '@oclif/core';

import { FetchStrategy } from '.';
import { InitTemplateOptions } from '../.';
import runCommand from '../../helpers/child-process';

class CopyStrategy implements FetchStrategy {
  constructor(public selectedTemplate: string) {
    this.selectedTemplate = selectedTemplate;
  }

  async fetchTemplateFiles(options: InitTemplateOptions): Promise<void> {
    return this.copyTemplateFiles(options)
      .then(() => this.renameFolder(options));
  }

  private async copyTemplateFiles(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Copying template source files...');

    return runCommand(
      'cp',
      ['-r', `../${this.selectedTemplate}`, options.dest],
    );
  }

  private async renameFolder(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Rename your app folder...');

    return runCommand(
      'mv',
      [`${options.dest}/${this.selectedTemplate}/`, `${options.dest}/${options.appName}/`],
    );
  }
}

export default CopyStrategy;
