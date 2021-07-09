const { paths } = require('./paths');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2018,
    project: paths.appTsConfig,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
  },
};
