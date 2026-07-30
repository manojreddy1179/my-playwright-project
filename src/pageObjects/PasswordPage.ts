import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PasswordPage extends BasePage {
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

  get forgotPasswordLink(): Locator {
    return this.page.locator('#ForgotPassword');
  }

  get createAccountLink(): Locator {
    return this.page.locator('#createAccount');
  }

  get errorMessages(): Locator {
    return this.page.locator('#errors .error-container:visible, #b2cErrors .error.itemLevel:visible');
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
