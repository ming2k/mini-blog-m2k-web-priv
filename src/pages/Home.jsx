import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import ProfileImage from '../components/ProfileImage';
import usePerformanceMonitor from '../hooks/usePerformanceMonitor';
// Import icons from React Icons
import { FaGithub, FaEnvelope, FaLinkedin, FaCalendarAlt, FaUser, FaComment } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Home = () => {
  usePerformanceMonitor('HomePage');
  const { data: posts, isLoading, isError } = useData('posts');

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
            <a href="https://x.com/mingmillennium" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaXTwitter size={20} />
            </a>
            <a href="mailto:mingmillennium@gmail.com" aria-label="Email">
              <FaEnvelope size={20} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={20} />
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

    return (
      <section className="posts-section">
        {posts && posts.length > 0 ? (
          <div className="post-list">
            {posts.map(post => (
              <article key={post.id} className="post-list-item">
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.body.substring(0, 150)}...</p>
                <div className="post-meta">
                  <span className="post-date">
                    <FaCalendarAlt />
                    <span>2024-07-15</span>
                  </span>
                  <span className="post-author">
                    <FaUser />
                    <span>Harrison Anderson</span>
                  </span>
                  <span className="post-comments">
                    <FaComment />
                    <span>5 comments</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
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