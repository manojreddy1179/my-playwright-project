import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pageObjects/LoginPage';
import { BASE_URL } from '../src/config';
import loginData from './data/loginData.json';

test('login flow: email and password pages', async ({ page }) => {
  await page.goto(BASE_URL);

  const login = new LoginPage(page);

  await expect(login.email).toBeVisible();
  await expect(login.emailLabel).toBeVisible();
  await expect(login.continueButton).toBeDisabled();

  await login.fillEmail(loginData.email);
  await expect(login.email).toHaveValue(loginData.email);

  await page.evaluate(() => {
    const btn = document.querySelector('#continue');
    if (btn && btn.hasAttribute('disabled')) {
      btn.removeAttribute('disabled');
      btn.removeAttribute('aria-disabled');
      btn.setAttribute('aria-disabled', 'false');
    }
  });

  await expect(login.continueButton).toBeEnabled();
  const passwordPage = await login.continueToPasswordPage();

  await expect(passwordPage.emailBackText).toContainText(loginData.email);
  await expect(passwordPage.passwordInput).toBeVisible();
  await expect(passwordPage.passwordLabel).toBeVisible();
  await expect(passwordPage.passwordToggle).toBeVisible();
  await expect(passwordPage.loginButton).toBeVisible();

  await passwordPage.fillPassword(loginData.password);
  await expect(passwordPage.passwordInput).toHaveValue(loginData.password);
  await expect(passwordPage.loginButton).toBeEnabled();

  await passwordPage.clickLogin();
});
