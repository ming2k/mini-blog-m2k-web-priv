import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <button 
          className={styles.newButton}
          onClick={() => navigate('/dashboard/new')}
        >
          <FaPlus /> New Post
        </button>
      </header>

      <div className={styles.postsGrid}>
        {posts.map(post => (
          <div key={post.id} className={styles.postCard}>
            <h3>{post.title}</h3>
            <p>{post.content_preview}</p>
            <div className={styles.postActions}>
              <button
                onClick={() => navigate(`/dashboard/edit/${post.id}`)}
                className={styles.editButton}
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className={styles.deleteButton}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 