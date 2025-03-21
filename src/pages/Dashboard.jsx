import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaEye, FaUser, FaArrowLeft } from 'react-icons/fa';
import { getPosts, deletePost } from '../api';
import styles from './Dashboard.module.css';
import { formatShortDate } from '../utils/dateFormat';
import Account from './Account';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAccount, setShowAccount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.posts);
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

  if (loading) return <div className={styles.loading}>Loading posts...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  if (showAccount) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.backButton}
              onClick={() => setShowAccount(false)}
            >
              <FaArrowLeft /> Back to Posts
            </button>
          </div>
        </header>
        <Account />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Posts</h1>
        </div>
        <div className={styles.headerRight}>
          <button 
            className={styles.accountButton}
            onClick={() => setShowAccount(true)}
          >
            <FaUser /> Account
          </button>
          <button 
            className={styles.newButton}
            onClick={() => navigate('/dashboard/editor')}
          >
            <FaPlus /> New Post
          </button>
        </div>
      </header>

      <div className={styles.postsGrid}>
        {posts.map(post => (
          <article key={post.id} className={styles.postCard}>
            <div className={styles.postContent}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postPreview}>{post.content_preview}</p>
              <div className={styles.postMeta}>
                <time dateTime={post.created_at}>
                  {formatShortDate(post.created_at)}
                </time>
              </div>
            </div>
            <div className={styles.postActions}>
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className={`${styles.actionButton} ${styles.viewButton}`}
                title="View post"
              >
                <FaEye />
              </button>
              <button
                onClick={() => navigate(`/dashboard/editor/${post.id}`)}
                className={`${styles.actionButton} ${styles.editButton}`}
                title="Edit post"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                title="Delete post"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 