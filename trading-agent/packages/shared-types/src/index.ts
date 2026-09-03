export type ServiceStatus = 'ok' | 'error' | 'loading';

export interface HealthResponse {
  service: string;
  status: ServiceStatus;
  timestamp: string;
  mode: 'paper' | 'live';
}

export interface WatchlistItem {
  symbol: string;
  score: number;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
}
