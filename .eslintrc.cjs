/* eslint-env node */
/* eslint-disable import/no-commonjs, import/unambiguous */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.mts', '.tsx'] },
    'import/resolver': { typescript: {} },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'object',
          'index',
        ],
      },
    ],
    'import/no-relative-parent-imports': 'off',
    'import/no-cycle': 'off',
    'react-hooks/exhaustive-deps': [
      'error',
      { additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)' },
    ],
  },
  overrides: [
    {
      files: ['src/**/*'],
      env: { browser: true },
      rules: { 'no-alert': 'off' },
    },
    {
      files: ['build/**/*'],
      env: { node: true },
      rules: { 'no-console': 'off' },
    },
  ],
  ignorePatterns: ['docs/**/*'],
};
