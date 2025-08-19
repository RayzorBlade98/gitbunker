export type Config = {
  /**
   * Commit message for the encrypted backup
   */
  encryptedCommitMessage: string;

  /**
   * Paths to include in the backup
   */
  includedPaths: string[];

  /**
   * Directory to which the save files will be copied
   */
  saveDir: string;
};
