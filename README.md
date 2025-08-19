# gitbunker

A CLI tool for securely storing sensitive data in a git repository by encrypting it with a secret key.

This tool is designed for scenarios where you want to store data in a dedicated remote repository. It is not intended for integration with existing repositories.

## Features

- Secure storage of sensitive data
- Complete change history (leveraging all features of git)
- Simple and user-friendly

## How does it work?

gitbunker saves your data in a git repository, encrypts it, and pushes it to a remote repository. This approach ensures a complete history of all changes is preserved securely.

## Installation

```sh
npm install gitbunker
```

## Usage

### Initialization

Initialize your project with:

```sh
npx gitbunker init
```

This command interactively creates a `gitbunker.json` configuration file and sets up your project. No additional setup is required.

### Storing Data

To store a new version of your configured data, use:

```sh
npx gitbunker store
```

This command copies all configured files to the save data repository, creates a new commit, encrypts it with your secret key, and pushes the encrypted files to the remote repository.

### Decrypting Data

To decrypt your saved data, use:

```sh
npx gitbunker decrypt
```

This command decrypts the encrypted data and extracts it to the save data directory.

## License

MIT
