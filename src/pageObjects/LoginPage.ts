import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { PasswordPage } from './PasswordPage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get email(): Locator {
    return this.page.locator('#signInName');
  }

  get emailLabel(): Locator {
    return this.page.locator('#signInName_label');
  }

  get continueButton(): Locator {
    return this.page.locator('#continue');
  }

  get forgotPasswordLink(): Locator {
    return this.page.locator('#ForgotPassword');
  }

  get createAccountLink(): Locator {
    return this.page.locator('#createAccount');
  }

  get pageErrors(): Locator {
    return this.page.locator('#errors .error-container');
  }

  async fillEmail(value: string) {
    await this.email.fill(value);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async continueToPasswordPage(): Promise<PasswordPage> {
    await Promise.all([
      this.page.waitForSelector('#password', { state: 'visible' }),
      this.clickContinue()
    ]);
    return new PasswordPage(this.page);
  }

  async getErrorText(): Promise<string | null> {
    return await this.pageErrors.textContent();
  }
}
