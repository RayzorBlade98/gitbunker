import { writeFile } from 'fs/promises';
import { getConfigPath } from './path';
import { fileSelector, Item } from 'inquirer-file-selector';
import { input } from '@inquirer/prompts';
import { tryLoadConfigAsync } from '.';

export async function createConfigAsync() {
  let config = await tryLoadConfigAsync();
  if (config) {
    console.log('Found existing gitbunker.json config.');
    return config;
  }

  config = {
    includedPaths: await getIncludedFilesAsync(),
    saveDir: await getSaveDirAsync(),
    encryptedCommitMessage: await getEncryptedCommitMessageAsync(),
  };

  await writeFile(getConfigPath(), JSON.stringify(config, null, 4));

  return config;
}

async function getIncludedFilesAsync(): Promise<string[]> {
  let selections: Item[];
  while (true) {
    selections = await fileSelector({
      message: 'What files or directories do you want to save?',
      multiple: true,
    });

    if (selections.length > 0) {
      break;
    }

    console.log('No files or directories selected. Please try again.');
  }
  return selections.map((item) => item.path);
}

function getSaveDirAsync(): Promise<string> {
  return input({
    message:
      'How should the directory where all the saved files will be copied to be named?',
    default: 'data',
  });
}

function getEncryptedCommitMessageAsync(): Promise<string> {
  return input({
    message: 'What should be the commit message for the encrypted backup?',
    default: '[BACKUP]',
  });
}
