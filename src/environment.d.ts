declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * gitbunker encryption key
       */
      GIT_BUNKER_KEY: string;
    }
  }
}

export {};
