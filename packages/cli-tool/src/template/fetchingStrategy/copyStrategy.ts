import { CliUx } from '@oclif/core';

import { FetchStrategy } from '.';
import { InitTemplateOptions } from '../.';
import runCommand from '../../helpers/child-process';

class CopyStrategy implements FetchStrategy {
  constructor(public selectedTemplate: string) {
    this.selectedTemplate = selectedTemplate;
  }

  async fetchTemplateFiles(options: InitTemplateOptions): Promise<void> {
    await this.copyTemplateFiles(options);
    return this.renameFolder(options);
  }

  private copyTemplateFiles(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info(`Copying ${this.selectedTemplate} source files...`);

    return runCommand(
      'cp',
      ['-r', `../${this.selectedTemplate}`, options.dest],
    );
  }

  private renameFolder(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Rename your app folder...');

    return runCommand(
      'mv',
      [`${options.dest}/${this.selectedTemplate}/`, `${options.dest}/${options.appName}/`],
    );
  }
}

export default CopyStrategy;
