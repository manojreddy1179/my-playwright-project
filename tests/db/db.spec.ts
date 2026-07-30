import { test, expect } from '@playwright/test';
import { DbClient } from '../../src/db/DbClient';

test.describe('Database tests', () => {
  let db: DbClient;

  test.beforeAll(async () => {
    db = new DbClient();
    await db.connect();
  });

  test.afterAll(async () => {
    await db.disconnect();
  });

  test('can query database version', async () => {
    const result = await db.query<{ version: string }>('SELECT version() AS version');
    expect(result.rowCount).toBeGreaterThan(0);
    expect(result.rows[0].version).toBeTruthy();
  });
});
