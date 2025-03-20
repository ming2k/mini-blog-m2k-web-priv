import { API_BASE_URL } from './config';

export async function getPost(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
} 