import { test, expect } from '../../fixtures/test';
import { formatPrice, products } from '../../test-data/products';

test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('user sees all products', { tag: '@smoke' }, async ({ inventoryPage }) => {
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.itemNames).toHaveText(products.map((p) => p.name));
  });

  test(
    'user can sort products by price low to high',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      const expected = [...products]
        .sort((a, b) => a.price - b.price)
        .map((p) => formatPrice(p.price));

      await inventoryPage.sortBy('lohi');

      await expect(inventoryPage.itemPrices).toHaveText(expected);
    },
  );

  test(
    'user can sort products by price high to low',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      const expected = [...products]
        .sort((a, b) => b.price - a.price)
        .map((p) => formatPrice(p.price));

      await inventoryPage.sortBy('hilo');

      await expect(inventoryPage.itemPrices).toHaveText(expected);
    },
  );

  test(
    'user can sort products by name Z to A',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      const expected = products
        .map((p) => p.name)
        .sort()
        .reverse();

      await inventoryPage.sortBy('za');

      await expect(inventoryPage.itemNames).toHaveText(expected);
    },
  );

  test('user can log out', { tag: '@smoke' }, async ({ page, inventoryPage, loginPage }) => {
    await inventoryPage.logout();

    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});
