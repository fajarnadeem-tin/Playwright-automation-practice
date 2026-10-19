import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/', 'ts-basics/'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    // Playwright rules (e.g. no waitForTimeout, no missing await on expect) for test files.
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts'],
  },
  // Turns off style rules that would fight with Prettier.
  prettier,
);
