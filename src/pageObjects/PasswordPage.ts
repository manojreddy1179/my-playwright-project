import { Locator, Page } from '@playwright/test';
import { AuthBasePage } from './AuthBasePage';

export class PasswordPage extends AuthBasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailBackText(): Locator {
    return this.page.locator('.back-message');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get passwordLabel(): Locator {
    return this.page.locator('#password_label');
  }

  get passwordToggle(): Locator {
    return this.page.locator('.password-toggle');
  }

  get loginButton(): Locator {
    return this.page.locator('#continue');
  }

  get errorMessages(): Locator {
    return this.page.locator('#errors .error-container:visible, #b2cErrors .error.itemLevel:visible');
  }

  async fillPassword(value: string) {
    await this.fill(this.passwordInput, value);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }
}
