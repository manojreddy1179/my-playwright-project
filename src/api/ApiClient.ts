import { APIRequestContext, APIResponse } from '@playwright/test';
import { API_BASE_URL } from '../config';

type ApiRequestOptions = Parameters<APIRequestContext['get']>[1];

export class ApiClient {
  private readonly context: APIRequestContext;

  constructor(context: APIRequestContext) {
    this.context = context;
  }

  static async create(contextOptions: ApiRequestOptions = {}): Promise<ApiClient> {
    const { request } = await import('@playwright/test');
    const requestContext = await request.newContext({
      baseURL: API_BASE_URL,
      ...contextOptions
    });
    return new ApiClient(requestContext);
  }

  async get(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return await this.context.get(path, options);
  }

  async post(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return await this.context.post(path, options);
  }

  async put(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return await this.context.put(path, options);
  }

  async delete(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return await this.context.delete(path, options);
  }

  async dispose() {
    await this.context.dispose();
  }
}
