import initializeCraApp from "./initialize-cra-app";
import initializeViteApp from "./initialize-vite-app";

export type templateOptions = "webpack" | "vite";
export const TEMPLATE_OPTIONS = new Map<templateOptions, string>([
  ["webpack", "WebPack"],
  ["vite", "Vite"],
]);

export const initializeTemplate = async ({
  appName,
  templateOption,
  branch,
  dest,
}: {
  appName: string;
  templateOption: templateOptions;
  branch: string;
  dest: string;
}): Promise<void> => {
  if (templateOption == "vite") {
    await initializeViteApp({
      appName,
      dest,
      branch: branch,
    });

    return;
  }

  await initializeCraApp(appName, branch, dest);
};
