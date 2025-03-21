import React, { Suspense, useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getPosts, searchPosts, savePost, deletePost } from '../api';
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
      fetchSearchResults();
    } else {
      fetchPosts();
    }
  }, [page, searchMode, searchTerm]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts(page, 4);
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const data = await searchPosts(searchTerm, page, 4);
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleSavePost = async (postData) => {
    try {
      await savePost(postData);
      setIsEditing(false);
      setCurrentPost(null);
      
      if (searchMode && searchTerm) {
        fetchSearchResults();
      } else {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(postId);
      if (searchMode && searchTerm) {
        fetchSearchResults();
      } else {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
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
          <div className={styles.dashboard__main}>
            <div className={styles.dashboard__controls}>
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search posts..."
              />
              <button 
                className={styles.dashboard__action}
                onClick={() => {
                  setIsEditing(true);
                  setCurrentPost(null);
                }}
              >
                <FaPlus /> <span>New Post</span>
              </button>
            </div>
          </div>
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
                    <footer className={styles.posts__footer}>
                      <div className={styles.posts__meta}>
                        <time dateTime={post.created_at}>
                          {formatDate(post.created_at, 'short')}
                        </time>
                      </div>
                      <div className={styles.posts__actions}>
                        <button 
                          className={`${styles.posts__button} ${styles['posts__button--edit']}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPost(post);
                            setIsEditing(true);
                          }}
                          title="Edit post"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <button 
                          className={`${styles.posts__button} ${styles['posts__button--delete']}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeletePost(post.id);
                          }}
                          title="Delete post"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {pagination && pagination.total_pages > 1 && (
            <footer className={styles.pagination}>
              <button 
                className={styles.pagination__button}
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              <span className={styles.pagination__info}>
                {page} / {pagination.total_pages}
              </span>
              <button 
                className={styles.pagination__button}
                disabled={page === pagination.total_pages}
                onClick={() => setPage(p => p + 1)}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </footer>
          )}
        </div>
      </div>
    </Suspense>
  );
} 