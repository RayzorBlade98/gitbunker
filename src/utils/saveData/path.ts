import { join } from 'path';
import { Config } from '../../types';

export function getSaveDirPath(config: Config): string {
  return join(process.cwd(), config.saveDir);
}

export function getEncryptedSaveDirPath(config: Config): string {
  return join(process.cwd(), `${config.saveDir}.encrypted`);
}
