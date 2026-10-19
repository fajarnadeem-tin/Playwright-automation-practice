import { test as setup, expect } from '../fixtures/test';
import { STORAGE_STATE } from '../utils/paths';
import { env } from '../utils/env';

// Runs once before the UI projects. Logs in through the UI and saves the
// cookies to a file, so every UI test starts already logged in.
setup('authenticate as standard user', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(env.sauceUsername, env.saucePassword);
  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: STORAGE_STATE });
});
