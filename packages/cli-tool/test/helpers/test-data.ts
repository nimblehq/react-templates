/** Describe all tests to be run for a given add-on */
export type TestData = {
  /** Path relative to the generated project root folder.
   *  List files or folders that are expected to be included within
   *  the generated project.
   *  E.g. '/src/assets/stylesheets/application.scss`
   */
  filePaths: string[];
  /** Path relative to the generated project root folder.
   *  List what file is expected to contain what string.
   *  E.g.
   * ```
   *   {
   *     path: '/src/assets/stylesheets/application.scss`,
   *     shouldContainString: 'vendor/bootstrap`,
   *   }
   * ```
   */
  filesShouldContain: {
    path: string;
    shouldContainString: string;
  }[];
};
