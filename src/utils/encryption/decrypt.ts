import { Config } from '../../types';
import { decrypt } from 'folder-encrypt';
import { getEncryptedSaveDirPath, getEncryptionKey, getSaveDirPath } from '..';

export async function decryptSaveData(config: Config) {
  console.log('Decrypting save data...');
  await decrypt({
    password: getEncryptionKey(),
    input: getEncryptedSaveDirPath(config),
    output: getSaveDirPath(config),
  });
  console.log('Successfully decrypted save data.');
}
