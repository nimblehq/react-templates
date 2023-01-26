import runCommand from './child-process';

type gitHubRepository = {
  gitHubAccount: string;
  repositoryName: string;
  branch: string;
};

const downloadRepository = (
  repository: gitHubRepository,
  ouput: string,
  dest: string,
): Promise<void> => {
  return runCommand(
    'curl',
    [
      `https://codeload.github.com/${repository.gitHubAccount}/${repository.repositoryName}/tar.gz/${repository.branch}`,
      '--output',
      `${ouput}.gz`,
    ],
    dest,
  );
};

export { downloadRepository, gitHubRepository };
