import { existsSync } from 'fs';
import { Config } from '../../types';
import { mkdir } from 'fs/promises';
import simpleGit, { CheckRepoActions } from 'simple-git';
import { getSaveDirPath } from '..';
import { input } from '@inquirer/prompts';

export async function initializeGitReposAsync(config: Config): Promise<void> {
  await initializeSaveDataGitRepoAsync(config);
  await initializeProjectGitRepoAsync();
}

async function initializeSaveDataGitRepoAsync(config: Config): Promise<void> {
  const saveDir = getSaveDirPath(config);
  if (!existsSync(saveDir)) {
    await mkdir(saveDir);
  }

  const git = simpleGit(saveDir);

  const isRepoInitialized = await git.checkIsRepo(
    CheckRepoActions.IS_REPO_ROOT,
  );
  if (isRepoInitialized) {
    console.log('Git repository in save directory is already initialized.');
    return;
  }

  console.log('Initializing git repository in save directory...');
  await git.init();
}

async function initializeProjectGitRepoAsync(): Promise<void> {
  const git = simpleGit();

  const isRepoInitialized = await git.checkIsRepo();
  if (isRepoInitialized) {
    console.log(
      'Git repository in current working space is already initialized.',
    );
    return;
  }

  console.log('Initializing git repository in current working space...');
  const remoteRepo = await input({
    message: 'Enter the remote repository URL:',
  });
  await git.init().addRemote('origin', remoteRepo);
}
