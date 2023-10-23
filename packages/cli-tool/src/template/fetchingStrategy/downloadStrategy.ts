import { CliUx } from '@oclif/core';

import { FetchStrategy } from '.';
import { InitTemplateOptions } from '../.';
import runCommand from '../../helpers/child-process';
import { downloadRepository } from '../../helpers/github';

const TEMPLATE_OWNER = 'nimblehq';
const TEMPLATE_REPO = 'react-templates';

class DownloadStrategy implements FetchStrategy {
  constructor(public selectedTemplate: string) {
    this.selectedTemplate = selectedTemplate;
  }

  async fetchTemplateFiles(options: InitTemplateOptions): Promise<void> {
    await this.downloadTemplateRepository(options);
    await this.extractDownloadedTemplateFolder(options);
    await this.renameFolder(options);
    return this.cleanTemporaryFiles(options);
  }

  private downloadTemplateRepository(
    options: InitTemplateOptions,
  ): Promise<void> {
    CliUx.ux.info('Downloading template source files...');

    return downloadRepository(
      {
        gitHubAccount: TEMPLATE_OWNER,
        repositoryName: TEMPLATE_REPO,
        branch: options.templateReference,
      },
      options.appName,
      options.dest,
    );
  }

  private extractDownloadedTemplateFolder(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Extracting template source files...');

    return runCommand(
      'tar',
      ['-xz', '-f', `${options.appName}.gz`],
      options.dest,
    );
  }

  private renameFolder(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Rename your app folder...');
    const path = options.templateReference.replace('/', '-');

    return runCommand(
      'mv',
      [`${TEMPLATE_REPO}-${path}/${this.selectedTemplate}/`, options.appName],
      options.dest,
    );
  }

  private async cleanTemporaryFiles(options: InitTemplateOptions): Promise<void> {
    CliUx.ux.info('Remove zip and unwanted files...');
    const branchPath = options.templateReference.replace('/', '-');

    // Remove the archive
    await runCommand('rm', [`${options.appName}.gz`], options.dest);

    // Remove the extracted folder
    return runCommand(
      'rm',
      ['-rf', `${TEMPLATE_REPO}-${branchPath}`],
      options.dest,
    );
  }
}

export default DownloadStrategy;
