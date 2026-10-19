import { test, expect } from '../../fixtures/test';
import { invalidLoginCases } from '../../test-data/login';
import { env } from '../../utils/env';

// These tests are about logging in, so start with an empty (logged-out) session.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'user can log in with valid credentials',
    { tag: '@smoke' },
    async ({ page, loginPage, inventoryPage }) => {
      await loginPage.login(env.sauceUsername, env.saucePassword);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.title).toHaveText('Products');
    },
  );

  for (const { title, username, password, expectedError } of invalidLoginCases()) {
    test(`user sees an error for ${title}`, { tag: '@regression' }, async ({ page, loginPage }) => {
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toHaveText(expectedError);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }

  test(
    'logged-out user cannot open the inventory page directly',
    { tag: '@regression' },
    async ({ page, loginPage }) => {
      await page.goto('/inventory.html');

      await expect(loginPage.errorMessage).toHaveText(
        "Epic sadface: You can only access '/inventory.html' when you are logged in.",
      );
    },
  );
});
