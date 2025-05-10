import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';
import styles from './EditPost.module.css'; // Reuse the same styles

export default function NewPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createPost(post);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.editContainer}>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <h2>Create New Post</h2>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            rows={15}
            placeholder="Write your post content here..."
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
} 