import { cwd, env } from 'process';
import { select, input } from '@inquirer/prompts';
import { randomBytes } from 'crypto';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';

export async function createEncryptionKeyAsync() {
  if (env['GIT_BUNKER_KEY']) {
    console.log('Found existing encryption key.');
    return;
  }

  const shouldGenerate = await select({
    message:
      'No encryption key found. Would you like to generate one or enter an existing key?',
    choices: [
      { name: 'Generate key', value: true },
      { name: 'Use existing key', value: false },
    ],
  });

  const key = shouldGenerate ? generateKey() : await enterKeyAsync();
  const dotEnvPath = join(cwd(), '.env');
  const envString = `GIT_BUNKER_KEY="${key}"`;
  if (existsSync(dotEnvPath)) {
    console.log('Updating .env file with encryption key...');
    await writeFile(dotEnvPath, `\n${envString}`, {
      flag: 'a',
    });
  } else {
    console.log('Creating new .env file with encryption key...');
    await writeFile(dotEnvPath, envString);
  }
}

function generateKey() {
  console.log('Generating encryption key...');
  const key = randomBytes(1024).toString('hex');
  return key;
}

async function enterKeyAsync() {
  while (true) {
    const key = await input({
      message: 'Please enter your encryption key:',
    });
    if (key !== '') {
      return key;
    }

    console.log('Encryption key cannot be empty!');
  }
}
