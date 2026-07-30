import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageTitle(): Locator {
    return this.page.locator('h1, h2, [data-testid="dashboard-title"]');
  }

  get userMenu(): Locator {
    return this.page.locator('[data-testid="user-menu"], .user-menu, #userMenu');
  }

  get notificationBell(): Locator {
    return this.page.locator('[data-testid="notification-bell"], .notification-bell, #notificationBell');
  }

  get logoutButton(): Locator {
    return this.page.locator('[data-testid="logout"], .logout-button, #logout');
  }

  get widgetCards(): Locator {
    return this.page.locator('[data-testid="dashboard-widget"], .dashboard-card, .widget-card');
  }

  get searchInput(): Locator {
    return this.page.locator('[data-testid="dashboard-search"], .dashboard-search input, #dashboardSearch');
  }

  async getPageTitleText(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  async openUserMenu() {
    await this.click(this.userMenu);
  }

  async clickLogout() {
    await this.click(this.logoutButton);
  }

  async searchDashboard(query: string) {
    await this.fill(this.searchInput, query);
    await this.page.keyboard.press('Enter');
  }

  async getNotificationCount(): Promise<number> {
    const countText = await this.notificationBell.getAttribute('data-count');
    if (!countText) return 0;
    const count = Number(countText.trim());
    return Number.isNaN(count) ? 0 : count;
  }

  async getWidgetTitles(): Promise<string[]> {
    return await this.widgetCards.evaluateAll((cards) =>
      cards.map((card) => card.textContent?.trim() ?? '').filter(Boolean)
    );
  }

  async isLoaded(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }
}
