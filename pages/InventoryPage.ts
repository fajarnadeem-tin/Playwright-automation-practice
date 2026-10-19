import type { Locator, Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    // It's an <a> tag, but the site gives it role="button".
    this.logoutLink = page.getByRole('button', { name: 'Logout' });
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  /** The product card that contains this product name. */
  item(productName: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: productName });
  }

  async addToCart(productName: string) {
    await this.item(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(productName: string) {
    await this.item(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
