import { TestData } from '../../helpers/test-data';

export const bootstrapTestData: TestData = {
  filesShouldExist: [
    '/src/assets/stylesheets/vendor/bootstrap/index.scss',
  ],
  filesShouldNotExist: [
    '/tailwind.config.js',
    '/src/assets/stylesheets/application.css',
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
