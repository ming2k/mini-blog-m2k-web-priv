import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight, FaEye } from 'react-icons/fa';
import { getPosts, searchPosts, savePost, deletePost } from '../api';
import styles from './Posts.module.css';
import PostEditor from '../components/PostEditor';
import { formatDate, formatShortDate } from '../utils/dateFormat';
import SearchBar from '../components/SearchBar';

function LoadingSpinner() {
  return <div className={`${styles.status} ${styles['status--loading']}`}>Loading posts...</div>;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchMode && searchTerm) {
      fetchSearchResults();
    } else {
      fetchPosts();
    }
  }, [page, searchMode, searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await getPosts(page, 10);
      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await searchPosts(searchTerm, page, 10);
      setPosts(response.posts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  const handleSavePost = async (postData) => {
    try {
      await savePost(postData);
      setIsEditing(false);
      setCurrentPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        fetchPosts();
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchMode(!!term);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Posts</h1>
      <div className={styles.actions}>
        <button 
          className={styles.newButton}
          onClick={() => navigate('/editor')}
        >
          <FaPlus /> New Post
        </button>
        <SearchBar onSearch={handleSearch} />
      </div>

      {isEditing ? (
        <PostEditor 
          post={currentPost}
          onSave={handleSavePost}
          onCancel={() => {
            setIsEditing(false);
            setCurrentPost(null);
          }}
        />
      ) : (
        <div className={styles.posts}>
          {posts.map(post => (
            <div key={post.id} className={styles.post}>
              <h3>{post.title}</h3>
              <p>{post.content_preview}</p>
              <div className={styles.meta}>
                <span>Created: {formatDate(post.created_at)}</span>
                <span>Updated: {formatDate(post.updated_at)}</span>
              </div>
              <div className={styles.actions}>
                <button 
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => {
                    setCurrentPost(post);
                    setIsEditing(true);
                  }}
                  title="Edit post"
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeletePost(post.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isEditing && pagination && (
        <div className={styles.pagination}>
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={styles.paginationButton}
          >
            <FaChevronLeft />
          </button>
          <span>Page {page} of {pagination.total_pages}</span>
          <button 
            onClick={() => setPage(p => Math.min(pagination.total_pages, p + 1))}
            disabled={page === pagination.total_pages}
            className={styles.paginationButton}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
} 