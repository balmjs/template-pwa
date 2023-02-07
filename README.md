# BalmJS template - `pwa`

> A PWA project

## Requirements

```sh
npm install -g balm-core balm-cli
# OR
yarn global add balm-core balm-cli
```

```sh
# Verify
balm -V

# Output:
# balm-cli: 4.0.0
# balm-core: 4.0.0
```

## Installation

```sh
balm init pwa my-project

cd my-project
yarn
# or
npm i
```

Since the application manifest is a text file, you can choose to write it by hand or use a tool that simplifies its creation. Several tools are available online:

- [App Manifest Generator](https://app-manifest.firebaseapp.com/)
- [Web App Manifest Generator](https://tomitm.github.io/appmanifest/)

## Enjoy

```sh
# For development
npm run dev

# For production
npm run prod
```

- thx [BalmJS](https://github.com/balmjs/balm)
