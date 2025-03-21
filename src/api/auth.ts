import { API_BASE_URL, headers, authHeaders } from './config';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface User {
  id: string;
  username: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) throw new Error('Invalid credentials');
  return response.json();
}

export async function register(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: authHeaders(localStorage.getItem('token') || '')
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
} 