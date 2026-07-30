import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text));
  }
}
