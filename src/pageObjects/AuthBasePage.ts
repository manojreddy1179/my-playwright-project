import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export abstract class AuthBasePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get forgotPasswordLink(): Locator {
    return this.page.locator('#ForgotPassword');
  }

  get createAccountLink(): Locator {
    return this.page.locator('#createAccount');
  }
}
