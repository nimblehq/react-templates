import { TestData } from '../../helpers/test-data';

export const bootstrapTestData = (projectName: string): TestData => {
  return {
    filesShouldContain: [
      {
        path: `${projectName}/package.json`,
        shouldContainString: 'bootstrap',
      },
      {
        path: `${projectName}/src/assets/stylesheets/application.scss`,
        shouldContainString: 'vendor/bootstrap',
      },
    ],
    filesShouldExist: [
      `${projectName}/src/assets/stylesheets/vendor/bootstrap/index.scss`,
    ],
    filesShouldNotExist: [
      `${projectName}/tailwind.config.js`,
      `${projectName}/src/assets/stylesheets/application.css`,
    ],
  };
};
