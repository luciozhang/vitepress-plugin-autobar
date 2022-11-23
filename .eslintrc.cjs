module.exports = {
  root: true,
  extends: [
    'eslint-config-tencent',
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
