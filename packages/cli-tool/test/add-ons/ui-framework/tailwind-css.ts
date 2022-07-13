import { TestData } from '../../helpers/test-data';

export const tailwindCssTestData = (projectName: string): TestData => {
  return {
    filesShouldExist: [
      `${projectName}/tailwind.config.js`,
      `${projectName}/postcss.config.js`,
      `${projectName}/src/assets/stylesheets/application.css`,
    ],
    filesShouldNotExist: [
      `${projectName}/src/assets/stylesheets/vendor/bootstrap`,
      `${projectName}/src/assets/stylesheets/application.scss`,
    ],
    filesShouldContain: [
      {
        path: `${projectName}/package.json`,
        shouldContainString: 'tailwindcss',
      },
      {
        path: `${projectName}/package.json`,
        shouldContainString: 'postcss-import',
      },
      {
        path: `${projectName}/src/assets/stylesheets/application.css`,
        shouldContainString: '@tailwind base;',
      },
      {
        path: `${projectName}/src/assets/stylesheets/application.css`,
        shouldContainString: '@tailwind components;',
      },
      {
        path: `${projectName}/src/assets/stylesheets/application.css`,
        shouldContainString: '@tailwind utilities;',
      },
    ],
  };
};
