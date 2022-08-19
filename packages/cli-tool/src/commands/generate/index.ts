import * as fs from 'fs';

import { Command } from '@oclif/core';
import Inquirer from 'inquirer';

import { setUIFramework } from '../../add-ons/ui-framework/index';
import { setVersionControl } from '../../add-ons/version-control/index';
import { questions } from '../../helpers/questions';
import { initializeTemplate } from '../../template/index';

type generateArguments = { appName: string; templateReference: string; dest: string };

export default class Generate extends Command {
  static description = 'Generate Nimble React application';

  static examples = ['$ nimble-react generate app-name'];

  static args = [
    {
      name: 'appName',
      required: true,
      description: 'application name',
    },
    {
      name: 'dest',
      required: false,
      description:
      'destination, defines in which folder the project folder will be created',
      default: './',
    },
    {
      name: 'templateReference',
      required: false,
      description: 'Specify the branch to download the vite-template from or path to a local cra-template folder.',
      default: '',
    },
  ];

  public async parseArgs(): Promise<generateArguments> {
    let destination = '';
    const {
      args: { appName, templateReference, dest },
    }: { args: generateArguments } = await this.parse(Generate);

    destination = dest.endsWith('/') ? dest : `${dest}/`;

    return { appName, templateReference, dest: destination };
  }

  public async run(): Promise<void> {
    const args = await this.parseArgs();
    const answers = await Inquirer.prompt(questions);

    const appPath = `${args.dest}${args.appName}`;

    try {
      this.log(
        `Generating Nimble React app with the project name: ${args.appName}!`,
      );

      await initializeTemplate({
        templateOption: answers.template,
        ...args,
      });

      setVersionControl(appPath, answers.versionControl);
      await setUIFramework(appPath, answers.uiFramework, answers.template);

      // Clean files after all steps
      await this.cleanFiles(appPath);

      // Display a final message
      this.displayEndMessage(args.appName, appPath);
    } catch (error) {
      this.error(error as string | Error);
    }
  }

  cleanFiles = async(appName: string): Promise<void> => {
    this.log('Removing the .add-ons folder.');
    return this.deleteAddOnsFolder(appName);
  };

  deleteAddOnsFolder = async(appPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.rm(`${appPath}/.add-ons`, { recursive: true }, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  };

  displayEndMessage = (appName: string, appPath: string): void => {
    this.log(``);
    this.log(`\n\n🚀 Your app "${appName}" has been created successfully!`);
    this.log('\n\nTo get started, run the following:');
    this.log(`> cd ./${appPath}`);
    this.log(`> npm start`);
  };
}
