import { join } from 'path';
import { Config } from '../../types';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { compile } from 'gitignore-parser';

export async function upsertGitIgnoreAsync(config: Config): Promise<void> {
  const gitIgnorePath = join(process.cwd(), '.gitignore');
  const gitIgnoreStrings = [config.saveDir, '.env'];

  if (!existsSync(gitIgnorePath)) {
    console.log('Creating .gitignore file...');
    await writeFile(gitIgnorePath, gitIgnoreStrings.join('\n'));
    return;
  }

  console.log('Updating .gitignore file...');
  const gitIgnoreContent = await readFile(gitIgnorePath, 'utf-8');
  const gitIgnore = compile(gitIgnoreContent);

  const newGitIgnoreStrings = gitIgnoreStrings.filter((gitIgnoreString) =>
    gitIgnore.accepts(gitIgnoreString),
  );

  if (newGitIgnoreStrings.length > 0) {
    await writeFile(gitIgnorePath, `\n${newGitIgnoreStrings.join('\n')}`, {
      flag: 'a',
    });
  }
}
