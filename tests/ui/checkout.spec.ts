import { test, expect } from '../../fixtures/test';
import { missingFieldCases, validCustomer } from '../../test-data/checkout';
import { formatPrice, products } from '../../test-data/products';

test.describe('Checkout', () => {
  test(
    'user can complete checkout with valid details',
    { tag: '@smoke' },
    async ({ inventoryPage, cartPage, checkoutPage }) => {
      const product = products[0];

      await inventoryPage.goto();
      await inventoryPage.addToCart(product.name);
      await inventoryPage.openCart();
      await cartPage.checkout();
      await checkoutPage.fillInfo(validCustomer);

      await expect(checkoutPage.itemTotal).toHaveText(`Item total: ${formatPrice(product.price)}`);

      await checkoutPage.finish();

      await expect(checkoutPage.completeHeader).toBeVisible();
    },
  );

  for (const { field, info, expectedError } of missingFieldCases) {
    test(
      `user sees an error when ${field} is missing`,
      { tag: '@regression' },
      async ({ checkoutPage }) => {
        await checkoutPage.goto();

        await checkoutPage.fillInfo(info);

        await expect(checkoutPage.errorMessage).toHaveText(expectedError);
      },
    );
  }
});
