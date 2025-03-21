import { API_BASE_URL, headers, authHeaders } from './config';

export interface Post {
  id: string;
  title: string;
  content: string;
  content_preview?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export async function getPosts(page = 1, per_page = 5) {
  const response = await fetch(
    `${API_BASE_URL}/api/posts?page=${page}&per_page=${per_page}`,
    { headers }
  );
  // console.log('Fetching posts:', response.json().then(data => console.log(data)));
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export async function getPost(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, { headers });
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
}

export async function createPost(data: { title: string; content: string }) {
  const response = await fetch(`${API_BASE_URL}/api/posts`, {
    method: 'POST',
    headers: authHeaders(localStorage.getItem('token') || ''),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function updatePost(id: string, data: { title?: string; content?: string }) {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
    method: 'POST',
    headers: authHeaders(localStorage.getItem('token') || ''),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}

export async function deletePost(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(localStorage.getItem('token') || ''),
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
} 