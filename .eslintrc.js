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
    'import/no-cycle': 'off',
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
  },
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
