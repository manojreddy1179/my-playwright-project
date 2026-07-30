import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test('homepage has title (POM)', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto('https://example.com');
  await home.expectTitleContains('Example Domain');
});
