import React from 'react';
import { formatDate } from '../utils/dateFormat';

export default function PostDetail({ post }) {
  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <div className={styles.metadata}>
        <span>Published on {formatDate(post.created_at, 'full')}</span>
      </div>
      {/* ... rest of the component */}
    </div>
  );
} 