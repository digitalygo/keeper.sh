export interface AppAuthContext {
  hasSession: () => boolean;
}

export type AppJsonFetcher = <T>(path: string, init?: RequestInit) => Promise<T>;

export interface AppRouterContext {
  auth: AppAuthContext;
  fetchApi: AppJsonFetcher;
  fetchWeb: AppJsonFetcher;
}
