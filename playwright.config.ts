import { defineConfig, devices } from '@playwright/test';
import { BASE_URL, DEFAULT_TIMEOUT } from './src/config';

export default defineConfig({
  testDir: 'tests',
  timeout: DEFAULT_TIMEOUT,
  expect: {
    timeout: DEFAULT_TIMEOUT
  },
  use: {
    headless: false,
    baseURL: BASE_URL,
    viewport: null,
    launchOptions: {
      args: ['--start-fullscreen']
    },
    actionTimeout: DEFAULT_TIMEOUT,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chrome',
      use: { channel: 'chrome', ...devices['Desktop Chrome'] }
    }
  ]
});
