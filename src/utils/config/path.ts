import { join } from 'path';

export function getConfigPath() {
  return join(process.cwd(), 'gitbunker.json');
}
