import { TestData } from './test-data';

/** TestScenario group several add-ons tests
 *  into a single generate command execution */
export type TestScenario = {
  options: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  templateReference: string;
  testData: TestData;
};
