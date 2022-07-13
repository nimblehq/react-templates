import { TestData } from '../../helpers/test-data';

export const gitLabTestData = (projectName: string): TestData => {
  return {
    filesShouldExist: [
      `${projectName}/.gitlab`,
    ],
    filesShouldNotExist: [
      `${projectName}/.github`,
    ],
    filesShouldContain: [],
  };
};
