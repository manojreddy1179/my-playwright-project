import { Locator, Page } from '@playwright/test';
import { AuthBasePage } from './AuthBasePage';
import { PasswordPage } from './PasswordPage';

export class LoginPage extends AuthBasePage {
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

  get pageErrors(): Locator {
    return this.page.locator('#errors .error-container');
  }

  async fillEmail(value: string) {
    await this.fill(this.email, value);
  }

  async clickContinue() {
    await this.click(this.continueButton);
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
