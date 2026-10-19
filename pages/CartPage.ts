import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
