import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import ProfileImage from '../components/ProfileImage';
import usePerformanceMonitor from '../hooks/usePerformanceMonitor';
// Import icons from React Icons
import { FaGithub, FaEnvelope, FaLinkedin, FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaBilibili, FaXTwitter } from "react-icons/fa6";

const Home = () => {
  usePerformanceMonitor('HomePage');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useData('posts', { page: currentPage, per_page: 5 });

  // Hero section - always rendered
  const renderHero = () => (
    <section className="hero compact">
      <div className="hero-content vertical">
        <ProfileImage 
          alt="Harrison Anderson" 
          size={120}
        />
        
        <div className="hero-text">
          <h1>👋 Hi, I'm MING2K</h1>
          <p><i>Also known as Harrison Anderson</i></p>
          
          <div className="social-links">
            <a href="https://github.com/ming2k" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://space.bilibili.com/9192551" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaBilibili size={20} />
            </a>
            <a href="https://x.com/mingmillennium" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaXTwitter size={20} />
            </a>
            <a href="mailto:mingmillennium@gmail.com" aria-label="Email">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  // Posts section - conditionally rendered based on loading state
  const renderPosts = () => {
    if (isLoading) {
      return <div className="loading">Loading posts...</div>;
    }

    if (isError) {
      return <div className="error">Failed to load posts. Please try again later.</div>;
    }

    const { posts, pagination } = data || { posts: [], pagination: { current_page: 1, total_pages: 1 } };

    return (
      <section className="posts-section">
        {posts && posts.length > 0 ? (
          <>
            <div className="post-list">
              {posts.map(post => (
                <Link 
                  to={`/post/${post.id}`} 
                  key={post.id}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article className="post-list-item">
                    <h2>{post.title}</h2>
                    <p>{post.content_preview.substring(0, 150)}...</p>
                    <div className="post-meta">
                      <span className="post-date">
                        <FaCalendarAlt />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </span>
                      <span className="post-author">
                        <FaUser />
                        <span>Author ID: {post.author_id || 'Anonymous'}</span>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              <div className="page-indicators">
                {Array.from({ length: pagination.total_pages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`page-dot ${currentPage === i + 1 ? 'active' : ''}`}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(pagination.total_pages, p + 1))}
                disabled={currentPage === pagination.total_pages}
                className="pagination-btn"
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          </>
        ) : (
          <p>No posts available.</p>
        )}
      </section>
    );
  };

  return (
    <div className="home-page">
      {renderHero()}
      {renderPosts()}
    </div>
  );
};

export default Home; 