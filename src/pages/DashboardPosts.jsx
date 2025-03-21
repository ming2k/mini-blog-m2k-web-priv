import React, { Suspense, useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './DashboardPosts.module.css';
import PostEditor from '../components/PostEditor';
import { formatDate } from '../utils/dateFormat';
import SearchBar from '../components/SearchBar';

function LoadingSpinner() {
  return <div className={`${styles.status} ${styles['status--loading']}`}>Loading...</div>;
}

export default function DashboardPosts() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchMode && searchTerm) {
      searchPosts();
    } else {
      fetchPosts();
    }
  }, [page, searchMode, searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts?page=${page}&per_page=4`);
      const data = await response.json();
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const searchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/search?q=${encodeURIComponent(searchTerm)}&page=${page}&per_page=4`
      );
      const data = await response.json();
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleSavePost = async (postData) => {
    try {
      const url = postData.id 
        ? `http://localhost:8080/api/posts/${postData.id}`
        : 'http://localhost:8080/api/posts';
        
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(postData)
      });
      
      if (response.ok) {
        setIsEditing(false);
        setCurrentPost(null);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchMode(!!term);
    setPage(1);
  };

  if (isEditing) {
    return (
      <PostEditor 
        post={currentPost}
        onSave={handleSavePost}
        onCancel={() => {
          setIsEditing(false);
          setCurrentPost(null);
        }}
      />
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={styles.dashboard}>
        <header className={styles.dashboard__header}>
          <div className={styles.dashboard__title}>
            <h1>Manage Posts</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          <button 
            className={styles.dashboard__action}
            onClick={() => {
              setIsEditing(true);
              setCurrentPost(null);
            }}
          >
            <FaPlus /> New Post
          </button>
        </header>

        <div className={styles.posts}>
          <div className={styles.posts__container}>
            <div className={styles.posts__grid}>
              {posts.map(post => (
                <article key={post.id} className={styles.posts__item}>
                  <div className={styles.posts__content}>
                    <div className={styles.posts__main}>
                      <h3 className={styles.posts__title}>{post.title}</h3>
                      <p className={styles.posts__preview}>{post.content_preview}</p>
                    </div>
                    <div className={styles.posts__footer}>
                      <div className={styles.posts__meta}>
                        {formatDate(post.created_at, 'short')}
                      </div>
                      <div className={styles.posts__actions}>
                        <button 
                          className={`${styles.posts__button} ${styles['posts__button--edit']}`}
                          onClick={() => {
                            setCurrentPost(post);
                            setIsEditing(true);
                          }}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button className={`${styles.posts__button} ${styles['posts__button--delete']}`}>
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {pagination && (
            <div className={styles.pagination}>
              <button 
                className={styles.pagination__button}
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              <span className={styles.pagination__info}>
                Page {page} of {pagination.total_pages}
              </span>
              <button 
                className={styles.pagination__button}
                disabled={page === pagination.total_pages}
                onClick={() => setPage(p => p + 1)}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
} 