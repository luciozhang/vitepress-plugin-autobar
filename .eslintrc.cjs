module.exports = {
  root: true,
  extends: [
    '@tencent/eslint-config-tencent',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
};
