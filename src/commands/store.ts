import {
  checkEnvVariables,
  commitAndPushEncryptedData,
  commitSaveData,
  encryptSaveData,
  importSaveData,
  loadConfigAsync,
} from '../utils';

export async function store() {
  const config = await loadConfigAsync();
  checkEnvVariables();

  await importSaveData(config);
  await commitSaveData(config);
  await encryptSaveData(config);
  await commitAndPushEncryptedData(config);
}
