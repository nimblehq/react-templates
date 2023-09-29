import { TestData } from '../../helpers/test-data';

export const gitHubTestData: TestData = {
  filePaths: ['/.github'],
  filesShouldContain: [],
};

export const gitLabTestData: TestData = {
  filePaths: ['/.gitlab'],
  filesShouldContain: [],
};

export const noVersionControlTestData: TestData = {
  filePaths: ['/.github', '/.gitlab'],
  filesShouldContain: [],
};
