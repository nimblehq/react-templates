export type TestData = {
  filesShouldExist: string[];
  filesShouldNotExist: string[];
  filesShouldContain: {
    path: string;
    shouldContainString: string;
  }[];
};
