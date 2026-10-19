import type { Locator, Page } from '@playwright/test';
import type { CheckoutInfo } from '../test-data/checkout';

/** Covers all 3 checkout screens: your info -> overview -> complete. */
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly itemTotal: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.errorMessage = page.getByTestId('error');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.completeHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillInfo(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
