import { checkEnvVariables, decryptSaveData, loadConfigAsync } from '../utils';

export async function decrypt() {
  const config = await loadConfigAsync();
  checkEnvVariables();

  await decryptSaveData(config);
}
