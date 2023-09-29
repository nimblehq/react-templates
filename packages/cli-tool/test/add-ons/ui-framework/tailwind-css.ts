import { TestData } from '../../helpers/test-data';

export const tailwindCssTestData: TestData = {
  filePaths: [
    '/tailwind.config.js',
    '/postcss.config.js',
    '/src/assets/stylesheets/application.css',
  ],
  filesShouldContain: [
    {
      path: '/package.json',
      shouldContainString: 'tailwindcss',
    },
    {
      path: '/package.json',
      shouldContainString: 'postcss-import',
    },
    {
      path: '/src/assets/stylesheets/application.css',
      shouldContainString: '@tailwind base;',
    },
    {
      path: '/src/assets/stylesheets/application.css',
      shouldContainString: '@tailwind components;',
    },
    {
      path: '/src/assets/stylesheets/application.css',
      shouldContainString: '@tailwind utilities;',
    },
  ],
};
