import { api } from './api';

export interface Log {
  id: number;
  ip_address: string;
  request_path: string;
  request_method: string;
  status_code: number;
  response_time: number;
  created_at: string;
  user_agent?: string;
}

export interface VisitStats {
  ip_address: string;
  visit_count: number;
  last_visit: string;
}

export const getLogs = async (): Promise<Log[]> => {
  const response = await api.get('/api/analytics/logs');
  return response;
};

export const getVisitStats = async (): Promise<VisitStats> => {
  const response = await api.get('/api/analytics/stats');
  return response;
};

export const get24hVisitStats = async (excludeIps?: string): Promise<VisitStats[]> => {
  const response = await api.get('/api/analytics/stats/24h', { exclude_ips: excludeIps });
  return response;
}; 