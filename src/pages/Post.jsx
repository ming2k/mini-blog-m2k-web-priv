import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { formatDate } from '../lib/utils';
import { getPost } from '../lib/api';
import { API_BASE_URL } from '../lib/config';
import styles from './Post.module.css';

const fetcher = (url) => fetch(url)
  .then((res) => {
    console.log('Response status:', res.status);
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
  })
  .then(data => {
    console.log('Response data:', data);
    return data;
  })
  .catch(err => {
    console.error('Fetch error:', err);
    throw err;
  });

export default function Post() {
  const { id } = useParams();
  console.log('Fetching post with id:', id);
  
  const { data: post, error, isLoading } = useSWR(
    id,
    getPost
  );

  console.log('SWR state:', { post, error, isLoading });

  if (error) {
    return (
      <div className={styles['post-error']}>
        <h2>Error loading post</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles['post-loading']}>
        <div className={styles['loading-spinner']}></div>
      </div>
    );
  }

  return (
    <article className={styles['post-container']}>
      <header className={styles['post-header']}>
        <h1>{post.title}</h1>
        <div className={styles['post-meta']}>
          <time dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
        </div>
      </header>
      <div className={styles['post-content']}>
        {post.content}
      </div>
    </article>
  );
}