export interface User {
  id: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {}

export interface Post {
  id: string;
  title: string;
  content_preview: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface Pagination {
  current_page: number;
  per_page: number;
  total_posts: number;
  total_pages: number;
}

export interface PostsResponse {
  posts: Post[];
  pagination: Pagination;
}

export interface ApiError {
  message: string;
  status: number;
} 