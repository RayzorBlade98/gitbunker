#!/usr/bin/env node

import { program } from 'commander';
import packageJson from '../package.json';
import { decrypt, init, store } from './commands';
import { configDotenv } from 'dotenv';

configDotenv({ quiet: true });

program
  .name('gitbunker')
  .description(packageJson.description)
  .version(packageJson.version);

program.command('init').description('Initialize gitbunker').action(init);

program
  .command('store')
  .description('Create a backup and push it to the remote repository')
  .action(store);

program
  .command('decrypt')
  .description('Decrypt the encrypted backup')
  .action(decrypt);

program.parseAsync(process.argv);
