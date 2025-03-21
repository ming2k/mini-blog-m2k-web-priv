import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { savePost, getPost } from '../api';
import styles from './DashboardEditor.module.css';

function DashboardEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  async function loadPost() {
    try {
      setLoading(true);
      const data = await getPost(id);
      setPost({
        title: data.title,
        content: data.content
      });
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await savePost({
        id,
        title: post.title,
        content: post.content
      });
      navigate('/dashboard/posts');
    } catch (err) {
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.editor}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>{id ? 'Edit Post' : 'New Post'}</h1>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            rows={10}
          />
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={() => navigate('/dashboard/posts')}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DashboardEditor; 