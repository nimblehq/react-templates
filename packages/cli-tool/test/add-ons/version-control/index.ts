import { TestData } from '../../helpers/test-data';

export const gitHubTestData: TestData = {
  filesShouldExist: ['/.github'],
  filesShouldNotExist: ['/.gitlab'],
  filesShouldContain: [],
};

export const gitLabTestData: TestData = {
  filesShouldExist: ['/.gitlab'],
  filesShouldNotExist: ['/.github'],
  filesShouldContain: [],
};
