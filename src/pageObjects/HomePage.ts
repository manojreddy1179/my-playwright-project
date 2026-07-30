import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getAllLocators(): Promise<string[]> {
    return await this.page.evaluate(() => {
      const selectors = new Set<string>();
      const elements = Array.from(document.querySelectorAll('body *')) as HTMLElement[];

      elements.forEach((el) => {
        if (el.id) selectors.add(`#${el.id}`);
        if (el.getAttribute('name')) selectors.add(`[name="${el.getAttribute('name')}"]`);
        if (el.getAttribute('aria-label')) selectors.add(`[aria-label="${el.getAttribute('aria-label')}"]`);
        if (el.getAttribute('role')) selectors.add(`[role="${el.getAttribute('role')}"]`);
        if (el.className && typeof el.className === 'string') {
          el.className
            .split(/\s+/)
            .filter(Boolean)
            .forEach((cls) => selectors.add(`.${cls}`));
        }
        selectors.add(el.tagName.toLowerCase());
      });

      return Array.from(selectors).slice(0, 300);
    });
  }
}
