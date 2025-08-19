import {
  createConfigAsync,
  createEncryptionKeyAsync,
  initializeGitReposAsync,
  upsertGitIgnoreAsync,
} from '../utils';

export async function init() {
  console.log('Welcome to gitbunker!');
  console.log("Let's set everything up!");
  const config = await createConfigAsync();
  await createEncryptionKeyAsync();
  await initializeGitReposAsync(config);
  await upsertGitIgnoreAsync(config);
}
