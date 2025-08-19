export function getEncryptionKey() {
  const key = process.env['GIT_BUNKER_KEY'];
  if (key) {
    return key;
  }

  console.error('Missing encryption key. Please run "gitbunker init" first');
  process.exit(1);
}
