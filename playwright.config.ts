import { defineConfig, devices } from '@playwright/test';
import { BASE_URL, DEFAULT_TIMEOUT } from './src/config';

export default defineConfig({
  testDir: 'tests',
  timeout: DEFAULT_TIMEOUT,
  expect: {
    timeout: DEFAULT_TIMEOUT
  },
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    headless: false,
    baseURL: BASE_URL,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },
    actionTimeout: DEFAULT_TIMEOUT,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chrome',
      use: { channel: 'chrome'}
    }
  ]
});
