/** TestScenario group several add-ons tests
 *  into a single generate command execution */
export type TestScenario = {
  options: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  templateReference: string;
  testData: {
    /** Path relative to the generated project root folder.
     *  List files or folders that are expected to be included within
     *  the generated project.
     *  E.g. '/src/assets/stylesheets/application.scss`
     */
    filesShouldExist: string[];
    /** Path relative to the generated project root folder.
     *  List files or folders that are expected to NOT be included within
     *  the generated project.
     *  E.g. '/src/assets/stylesheets/vendor/bootstrap`
     */
    filesShouldNotExist: string[];
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
};
