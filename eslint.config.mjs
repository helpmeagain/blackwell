import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/coverage'],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vitest-globals/recommended',
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        // ...vitestGlobals.environments.env.globals,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },
    },

    rules: {
      'no-useless-constructor': 'off',
      'grouped-accessor-pairs': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',

      'prettier/prettier': [
        'error',
        {
          printWidth: 90,
          tabWidth: 2,
          singleQuote: true,
          endOfLine: 'auto',
          trailingComma: 'all',
          arrowParens: 'always',
          semi: true,
        },
      ],
    },
  },
];
