import { API_BASE_URL, authHeaders } from './config';

export interface Post {
  id: string;
  title: string;
  content: string;
  content_preview: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  author?: {
    username: string;
  };
}

export interface PaginationData {
  current_page: number;
  per_page: number;
  total_posts: number;
  total_pages: number;
}

export interface PostsResponse {
  posts: Post[];
  pagination: PaginationData;
}

export interface PostEditorData {
  id?: string;
  title: string;
  content: string;
}

export async function getPosts(page: number = 1, per_page: number = 5): Promise<PostsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/posts?page=${page}&per_page=${per_page}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

export async function searchPosts(query: string, page: number = 1, per_page: number = 10): Promise<PostsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`
  );

  if (!response.ok) {
    throw new Error('Failed to search posts');
  }

  return response.json();
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}

export async function updatePost(id: string, data: { title?: string; content?: string }): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to update post');
  }

  return response.json();
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
}

export async function getPostById(id: string): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
}

export async function savePost(data: PostEditorData): Promise<Post> {
  const url = data.id 
    ? `${API_BASE_URL}/posts/${data.id}`
    : `${API_BASE_URL}/posts`;
    
  const response = await fetch(url, {
    method: data.id ? 'PUT' : 'POST',
    headers: authHeaders(localStorage.getItem('token') || ''),
    body: JSON.stringify({
      title: data.title,
      content: data.content
    })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to ${data.id ? 'update' : 'create'} post`);
  }

  return response.json();
} 