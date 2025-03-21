import { API_BASE_URL, API_ENDPOINTS, authHeaders, createApiUrl } from './config';

export interface VisitData {
  ip_address: string;
  visit_count: number;
  last_visit: number;
}

export interface VisitStats {
  total_unique_visitors: number;
  total_visits: number;
  excluded_ips?: string[];
  visits: VisitData[];
}

export async function getVisitStats(fromDate: string, toDate: string, excludeIp?: string): Promise<VisitStats> {
  const url = createApiUrl(API_ENDPOINTS.STATS.VISITS_24H, {
    exclude_ips: excludeIp,
    from_date: fromDate,
    to_date: toDate
  });

  const response = await fetch(url, {
    headers: authHeaders(localStorage.getItem('token') || '')
  });

  if (!response.ok) {
    throw new Error('Failed to fetch visit statistics');
  }

  return response.json();
} 