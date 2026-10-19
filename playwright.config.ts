import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { STORAGE_STATE } from './utils/paths';

// Load variables from .env into process.env (credentials, URLs).
dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Fail CI if someone leaves test.only in the code.
  forbidOnly: !!process.env.CI,
  // No retries: a flaky test should be fixed, not hidden.
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    // saucedemo uses data-test="..." instead of Playwright's default data-testid.
    testIdAttribute: 'data-test',
    // Keep a trace + screenshot only when a test fails (for debugging).
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    // 1) Logs in once and saves the session to STORAGE_STATE.
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // 2) UI tests in 3 browsers, all starting already logged in.
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
      dependencies: ['setup'],
    },
    // Firefox runs in CI (Linux) only: Playwright's Firefox 157 build fails to
    // launch on macOS 27 ("Could not find profile folder"). Run it locally with
    // RUN_FIREFOX=1 to re-check after a Playwright upgrade.
    ...(process.env.CI || process.env.RUN_FIREFOX
      ? [
          {
            name: 'firefox',
            testDir: './tests/ui',
            use: { ...devices['Desktop Firefox'], storageState: STORAGE_STATE },
            dependencies: ['setup'],
          },
        ]
      : []),
    {
      name: 'webkit',
      testDir: './tests/ui',
      use: { ...devices['Desktop Safari'], storageState: STORAGE_STATE },
      dependencies: ['setup'],
    },

    // 3) API tests: no browser needed.
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
