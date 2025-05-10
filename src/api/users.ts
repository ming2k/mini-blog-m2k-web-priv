import { api } from './api';

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ErrorResponse {
  error: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/api/users/login', data);
  return response;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post('/api/users/register', data);
  return response;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/api/users/me');
  return response;
};

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  await api.put('/api/users/password', data);
}; 