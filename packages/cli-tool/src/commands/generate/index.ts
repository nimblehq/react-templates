import * as fs from "fs";

import { Command } from "@oclif/core";
import Inquirer from "inquirer";

import { setUIFramework } from "../../add-ons/ui-framework/index";
import { setVersionControl } from "../../add-ons/version-control/index";
import { questions } from "../../helpers/questions";
import initializeViteApp from "../../template/initialize-vite-app";

export default class Generate extends Command {
  static description = "Generate Nimble React application";

  static examples = ["$ nimble-react generate app-name"];

  static args = [
    {
      name: "appName",
      required: true,
      description: "application name",
    },
    {
      name: "branch",
      required: false,
      description:
        'Specify the branch to download the vite-template from...',
      default: "main",
    },
    {
      name: "dest",
      required: false,
      description:
        "destination, defines in which folder the project folder will be created",
      default: "./",
    },
  ];

  public async run(): Promise<void> {
    const {
      args: { appName, branch, dest },
    } = await this.parse(Generate);

    const appPath = `${dest}${appName}`;

    const answers = await Inquirer.prompt(questions);

    try {
      this.log(
        `Generating Nimble React app with the project name: ${appName}!`
      );

      await initializeViteApp({
        appName,
        dest,
        branch: branch,
      });
      setVersionControl(appPath, answers.versionControl);
      await setUIFramework(appPath, answers.uiFramework);

      // Clean files after all steps
      await this.cleanFiles(appPath);

      // Display a final message
      this.displayEndMessage(appName, appPath);
    } catch (error) {
      this.error(error as string | Error);
    }
  }

  cleanFiles = async (appName: string): Promise<void> => {
    this.log("Removing the .add-ons folder.");
    return this.deleteAddOnsFolder(appName);
  };

  deleteAddOnsFolder = async (appPath: string): Promise<void> => {
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
    this.log("\n\nTo get started, run the following:");
    this.log(`> cd ./${appPath}`);
    this.log(`> npm start`);
  };
}
