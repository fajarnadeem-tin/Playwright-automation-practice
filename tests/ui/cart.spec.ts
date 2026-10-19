import { test, expect } from '../../fixtures/test';

const backpack = 'Sauce Labs Backpack';
const bikeLight = 'Sauce Labs Bike Light';

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test(
    'user can add a product to the cart',
    { tag: '@smoke' },
    async ({ inventoryPage, cartPage }) => {
      await inventoryPage.addToCart(backpack);
      await expect(inventoryPage.cartBadge).toHaveText('1');

      await inventoryPage.openCart();

      await expect(cartPage.title).toHaveText('Your Cart');
      await expect(cartPage.items).toHaveCount(1);
      await expect(cartPage.items).toContainText(backpack);
    },
  );

  test('cart badge counts multiple products', { tag: '@regression' }, async ({ inventoryPage }) => {
    await inventoryPage.addToCart(backpack);
    await inventoryPage.addToCart(bikeLight);

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test(
    'user can remove a product from the cart',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      await inventoryPage.addToCart(backpack);
      await expect(inventoryPage.cartBadge).toHaveText('1');

      await inventoryPage.removeFromCart(backpack);

      await expect(inventoryPage.cartBadge).toBeHidden();
    },
  );
});
