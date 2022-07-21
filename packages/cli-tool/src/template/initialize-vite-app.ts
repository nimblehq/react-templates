import { CliUx } from "@oclif/core";
import runCommand from "../helpers/child-process";
import { replaceLine } from "../helpers/file-editor";

const TEMPLATE_OWNER = "nimblehq";
const TEMPLATE_REPO = "react-templates";
const replaceAppNameInFiles = ["package.json", "index.html"];

type InitViteOptions = {
  dest: string;
  appName: string;
  branch: string;
};

const downloadTemplateRepository = (
  options: InitViteOptions
): Promise<void> => {
  CliUx.ux.info("Downloading template source files...");

  return runCommand(
    "curl",
    [
      `https://codeload.github.com/${TEMPLATE_OWNER}/${TEMPLATE_REPO}/tar.gz/${options.branch}`,
      "--output",
      `${options.appName}.gz`,
    ],
    options.dest
  );
};

const extractViteTemplateFolder = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info("Extracting template source files...");
  const branchPath = options.branch.replace("/", "-");

  return runCommand(
    "tar",
    [
      "-xz",
      "-f",
      `${options.appName}.gz`,
      "--strip=2",
      `${TEMPLATE_REPO}-${branchPath}/packages/vite-template`,
    ],
    options.dest
  );
};

const renameFolder = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info("Rename your app folder...");

  return runCommand("mv", ["vite-template", options.appName], options.dest);
};

const replaceAppName = (options: InitViteOptions): void => {
  CliUx.ux.info("Setup your application name...");
  replaceAppNameInFiles.forEach((fileName) => {
    replaceLine(
      `${options.dest}${options.appName}/${fileName}`,
      "%APP_NAME%",
      options.appName
    );
  });
};

const cleanTemporaryFiles = (options: InitViteOptions): Promise<void> => {
  CliUx.ux.info("Remove zip and unwanted files...");

  return runCommand("rm", [`${options.appName}.gz`], options.dest);
};

const initializeViteApp = async (options: InitViteOptions): Promise<void> => {
  return downloadTemplateRepository(options)
    .then(() => extractViteTemplateFolder(options))
    .then(() => renameFolder(options))
    .then(() => replaceAppName(options))
    .then(() => cleanTemporaryFiles(options));
};

export default initializeViteApp;
