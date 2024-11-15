module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'import/no-cycle': 'off',
    'default-param-last': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'error',
    'react/no-array-index-key': 'error',
    'react/prefer-read-only-props': 'error',
    'react/jsx-key': ['error', { checkKeyMustBeforeSpread: true }],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/require-default-props': 'off',
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: { defaultFrom: false },
      },
    ],
  },
  overrides: [
    {
      files: ['packages/react-filerobot-image-editor/src/libraries/**/*'],
      rules: {
        'rule-name': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          'packages/react-filerobot-image-editor/src',
        ],
      },
    },
  },
};
