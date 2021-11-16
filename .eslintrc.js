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
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'error',
    'react/no-array-index-key': 'error',
    'react/prefer-read-only-props': 'error',
    'react/jsx-key': ['error', { checkKeyMustBeforeSpread: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
