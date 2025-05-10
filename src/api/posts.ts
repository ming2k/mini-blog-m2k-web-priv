import { api } from './api';

export interface Post {
  id: string;
  title: string;
  content: string;
  content_preview: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

export interface SearchParams {
  q: string;
  page?: number;
  per_page?: number;
}

export interface PostEditorData {
  id?: string;
  title: string;
  content: string;
}

export const getPosts = async (page?: number, per_page?: number): Promise<Post[]> => {
  const response = await api.get('/api/posts', { page, per_page });
  return response;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await api.get(`/api/posts/${id}`);
  return response;
};

export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  const response = await api.post('/api/posts', data);
  return response;
};

export const updatePost = async (id: string, data: UpdatePostRequest): Promise<Post> => {
  const response = await api.put(`/api/posts/${id}`, data);
  return response;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/api/posts/${id}`);
};

export const searchPosts = async (params: SearchParams): Promise<Post[]> => {
  const response = await api.get('/api/posts/search', params);
  return response;
};

export const savePost = async (data: PostEditorData): Promise<Post> => {
  if (data.id) {
    return updatePost(data.id, { title: data.title, content: data.content });
  } else {
    return createPost({ title: data.title, content: data.content });
  }
}; 