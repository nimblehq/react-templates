import { TestData } from '../../helpers/test-data';

export const bootstrapTestData: TestData = {
  filePaths: [
    '/src/assets/stylesheets/vendor/bootstrap/index.scss',
  ],
  filesShouldContain: [
    {
      path: '/package.json',
      shouldContainString: 'bootstrap',
    },
    {
      path: '/src/assets/stylesheets/application.scss',
      shouldContainString: 'vendor/bootstrap',
    },
  ],
};
