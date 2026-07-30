import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
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
