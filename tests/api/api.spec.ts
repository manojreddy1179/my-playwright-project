import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/ApiClient';

test.describe('API tests', () => {
  test('health check returns 200', async () => {
    const api = await ApiClient.create();
    const response = await api.get('/health');

    expect(response.status()).toBe(200);
    expect(await response.json()).toBeTruthy();

    await api.dispose();
  });
});
