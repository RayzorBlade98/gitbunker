import { existsSync } from 'fs';
import { Config } from '../../types';
import { getConfigPath } from './path';
import { readFile } from 'fs/promises';

export async function tryLoadConfigAsync(): Promise<Config | null> {
  const configPath = getConfigPath();
  if (!existsSync(configPath)) {
    return null;
  }

  const configContent = await readFile(configPath, 'utf-8');
  return JSON.parse(configContent) as Config;
}

export async function loadConfigAsync(): Promise<Config> {
  const config = await tryLoadConfigAsync();
  if (config) {
    return config;
  }

  console.error('Config file not found. Please run "gitbunker init" first');
  process.exit(1);
}
