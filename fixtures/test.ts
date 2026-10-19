import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { BookingApi } from '../api/BookingApi';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  bookingApi: BookingApi;
};

/**
 * Our own `test`: same as Playwright's, plus ready-made page objects.
 * A test just asks for what it needs, e.g. async ({ inventoryPage }) => ...
 */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  bookingApi: async ({ request }, use) => {
    await use(new BookingApi(request));
  },
});

export { expect } from '@playwright/test';
