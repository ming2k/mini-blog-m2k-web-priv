import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaUser } from 'react-icons/fa';
import { getPosts, deletePost } from '../api';
import styles from './Dashboard.module.css';
import { formatShortDate } from '../utils/dateFormat';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserAndPosts();
  }, [navigate]);

  const fetchUserAndPosts = async () => {
    try {
      // Fetch user profile
      const userResponse = await fetch('http://localhost:8080/api/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!userResponse.ok) throw new Error('Failed to fetch user profile');
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch posts
      const data = await getPosts();
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
      await deletePost(postId);
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
        <div className={styles.headerContent}>
          <h1>Dashboard</h1>
          {user && (
            <div className={styles.userInfo}>
              <FaUser />
              <span>{user.username}</span>
            </div>
          )}
        </div>
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
            <p style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              margin: '0.5rem 0'
            }}>
              {post.content_preview}
            </p>
            <div className={styles.postMeta}>
              <time dateTime={post.created_at}>
                {formatShortDate(post.created_at)}
              </time>
            </div>
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