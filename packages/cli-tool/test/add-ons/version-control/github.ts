import { TestData } from '../../helpers/test-data';

export const gitHubTestData = (projectName: string): TestData => {
  return {
    filesShouldExist: [
      `${projectName}/.github`,
    ],
    filesShouldNotExist: [
      `${projectName}/.gitlab`,
    ],
    filesShouldContain: [],
  };
};
