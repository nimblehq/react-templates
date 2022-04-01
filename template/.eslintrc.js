module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    '@nimblehq/eslint-config-nimble',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: 'src/tests/**/*.test.ts',
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
    {
      files: 'cypress/**/*.ts',
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'css/*|*.scss|*.svg|.png',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/extensions': [
      'error',
      'never',
      {
        scss: 'always',
        svg: 'always',
        png: 'always',
        json: 'always',
        spec: 'always',
      },
    ],
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error'],
    'prettier/prettier': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
