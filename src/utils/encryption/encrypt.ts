import { Config } from '../../types';
import { encrypt } from 'folder-encrypt';
import { getEncryptedSaveDirPath, getEncryptionKey, getSaveDirPath } from '..';

export async function encryptSaveData(config: Config) {
  console.log('Encrypting save data...');
  await encrypt({
    password: getEncryptionKey(),
    input: getSaveDirPath(config),
    output: getEncryptedSaveDirPath(config),
  });
  console.log('Successfully encrypted save data.');
}
