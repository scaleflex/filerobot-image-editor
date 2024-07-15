# Dev. notes for developers in-case of contribution

#### JS Bundle
1- yarn build:packages
2- yarn build:js-bundle

> cause the js bundle uses the transpiled version of react package.

#### Glossary
- $reactPackage === packages/react-filerobot-image-editor/
- 

#### Adding a new property

- Doing a global search for any property at least should exist 1 time occurrence in each of these 5 files (README.md, $reactPackage/index.d.ts, defaultConfig.js, demo-config.js & -- feature's implementation file --).