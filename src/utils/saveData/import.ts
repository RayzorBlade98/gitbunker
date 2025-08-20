import { copyFile, cp, mkdir, stat } from 'fs/promises';
import { getSaveDirPath } from '.';
import { Config } from '../../types';
import { confirm } from '@inquirer/prompts';
import { dirname, join, sep } from 'path';
import { existsSync } from 'fs';

export async function importSaveData(config: Config): Promise<void> {
  const shouldContinue = await confirm({
    message:
      'The current save data will be overwritten. Do you want to continue?',
    default: true,
  });
  if (!shouldContinue) {
    process.exit(0);
  }

  const sharedLeadingPaths = await countSharedLeadingPathSegments(
    config.includedPaths,
  );
  await Promise.all(
    config.includedPaths.map((path) =>
      importPath(path, config, { sharedLeadingPaths }),
    ),
  );
}

async function countSharedLeadingPathSegments(
  paths: string[],
): Promise<number> {
  const splitPaths = paths.map((p) => p.split(sep));

  // If there's only one path, the files will be copied directly into the save data directory
  if (paths.length === 1) {
    const stats = await stat(paths[0]!);
    const segments = splitPaths[0]!.length;
    return stats.isDirectory() ? segments : segments - 1;
  }

  const sharedSegments = [];
  for (let i = 0; ; i++) {
    const segment = splitPaths[0]![i];
    if (!segment || splitPaths.some((segments) => segments[i] !== segment)) {
      break;
    }

    sharedSegments.push(segment);
  }

  return sharedSegments.length;
}

async function importPath(
  pathToImport: string,
  config: Config,
  options: { sharedLeadingPaths: number },
): Promise<void> {
  const savePath = join(
    getSaveDirPath(config),
    ...pathToImport.split(sep).slice(options.sharedLeadingPaths),
  );

  const pathStats = await stat(pathToImport);
  if (pathStats.isFile()) {
    try {
      const savePathDir = dirname(savePath);
      if (!existsSync(savePathDir)) {
        await mkdir(savePathDir, { recursive: true });
      }

      await copyFile(pathToImport, savePath);
      console.log(`Successfully copied file ${pathToImport}`);
    } catch (error) {
      console.error(`Error while copying file ${pathToImport}`);
      throw error;
    }
  } else if (pathStats.isDirectory()) {
    try {
      await cp(pathToImport, savePath, { recursive: true });
      console.log(`Successfully copied directory ${pathToImport}`);
    } catch (error) {
      console.error(`Error while copying directory ${pathToImport}`);
      throw error;
    }
  } else {
    console.warn(
      `Only files and directories are supported. Skipping ${pathToImport}`,
    );
  }
}
