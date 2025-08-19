import simpleGit from 'simple-git';
import { Config } from '../../types';
import { input } from '@inquirer/prompts';
import { getEncryptedSaveDirPath, getSaveDirPath } from '..';

export async function commitSaveData(config: Config): Promise<void> {
  const commitMessage = await enterCommitMessage();
  await simpleGit(getSaveDirPath(config)).add('./*').commit(commitMessage);
  console.log(`Successfully created commit ${commitMessage}`);
}

export async function commitAndPushEncryptedData(config: Config) {
  await simpleGit()
    .add(getEncryptedSaveDirPath(config))
    .commit(config.encryptedCommitMessage)
    .push();
}

async function enterCommitMessage() {
  while (true) {
    const commitMessage = await input({
      message: 'Enter the commit message for the save data:',
    });
    if (commitMessage.trim() !== '') {
      return commitMessage;
    }

    console.log('Commit message cannot be empty!');
  }
}
