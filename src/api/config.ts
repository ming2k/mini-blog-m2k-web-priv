// Use the full URL during development
export const API_BASE_URL = 'http://localhost:3000';

export const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const authHeaders = (token: string) => ({
  ...headers,
  'Authorization': `Bearer ${token}`,
}); 