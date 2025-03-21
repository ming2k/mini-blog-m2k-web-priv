const isDev = import.meta.env.DEV;

// Ensure the base URL doesn't have trailing slash
export const API_BASE_URL = (isDev ? '/api' : '').replace(/\/$/, '');

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    PROFILE: '/users/me',
  },
  POSTS: '/posts',
  STATS: {
    VISITS: '/stats/visits',
    VISITS_24H: '/stats/visits/24h'
  }
};

export const headers = {
  'Content-Type': 'application/json'
};

export const authHeaders = (token: string) => ({
  ...headers,
  'Authorization': `Bearer ${token}`
});

// Helper function for URL construction
export const createApiUrl = (path: string, params?: Record<string, string>) => {
  const baseUrl = `${API_BASE_URL}${path}`;
  if (!params) return baseUrl;
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}; 