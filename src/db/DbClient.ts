import { Client, ClientConfig, QueryResultRow } from 'pg';
import { DB_CONNECTION_STRING } from '../config';

export class DbClient {
  private client: Client;

  constructor(config: ClientConfig = {}) {
    this.client = new Client({ connectionString: DB_CONNECTION_STRING, ...config });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.end();
  }

  async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }> {
    const result = await this.client.query<T>(text, params);
    return {
      rows: result.rows as T[],
      rowCount: result.rowCount ?? 0
    };
  }
}
