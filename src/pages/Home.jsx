import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProfileImage from '../components/ProfileImage';
import usePerformanceMonitor from '../hooks/usePerformanceMonitor';
import { formatShortDate } from '../utils/dateFormat';
import { getPosts } from '../api';
// Import icons from React Icons
import { FaGithub, FaEnvelope, FaLinkedin, FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { FaBilibili, FaXTwitter } from "react-icons/fa6";
import styles from './Home.module.css';

const Home = () => {
  usePerformanceMonitor('HomePage');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add state for hero section visibility
  const [isHeroVisible, setIsHeroVisible] = useState(() => {
    // Initialize from localStorage, default to true if not set
    return localStorage.getItem('heroVisible') !== 'false';
  });
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      setSearchMode(true);
    } else {
      setSearchTerm('');
      setSearchMode(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let result;
        if (searchMode && searchTerm) {
          result = await fetch(
            `http://localhost:8080/api/posts/search?q=${encodeURIComponent(searchTerm)}&page=${currentPage}&per_page=5`
          ).then(res => res.json());
        } else {
          result = await getPosts(currentPage, 5);
        }
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchMode, searchTerm]);

  // Update localStorage when visibility changes
  useEffect(() => {
    localStorage.setItem('heroVisible', isHeroVisible);
  }, [isHeroVisible]);

  // Modified hero section with toggle button and hint text
  const renderHero = () => (
    <section className={`${styles.hero} ${styles['hero--compact']} ${!isHeroVisible ? styles['hero--collapsed'] : ''}`}>
      {!isHeroVisible && (
        <div className={styles.hero__hint}>
          <span className={styles['hero__hint-text']}>👋 Hi, I'm MING2K</span>
        </div>
      )}
      <button 
        className={styles.hero__toggle}
        onClick={() => setIsHeroVisible(!isHeroVisible)}
        aria-label={isHeroVisible ? 'Collapse profile section' : 'Expand profile section'}
      >
        {isHeroVisible ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      
      {isHeroVisible && (
        <div className={`${styles.hero__content} ${styles['hero__content--vertical']}`}>
          <ProfileImage 
            alt="Harrison Anderson" 
            size={120}
          />
          
          <div className={styles.hero__text}>
            <h1 className={styles.hero__title}>👋 Hi, I'm MING2K</h1>
            <p className={styles.hero__description}><i>Also known as Harrison Anderson</i></p>
            
            <div className={styles.social}>
              <a href="https://github.com/ming2k" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.social__link}>
                <FaGithub size={20} />
              </a>
              <a href="https://space.bilibili.com/9192551" target="_blank" rel="noopener noreferrer" aria-label="Bilibili" className={styles.social__link}>
                <FaBilibili size={20} />
              </a>
              <a href="https://x.com/mingmillennium" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.social__link}>
                <FaXTwitter size={20} />
              </a>
              <a href="mailto:mingmillennium@gmail.com" aria-label="Email" className={styles.social__link}>
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  // Posts section - conditionally rendered based on loading state
  const renderPosts = () => {
    if (isLoading) {
      return <div className={`${styles.status} ${styles['status--loading']}`}>Loading posts...</div>;
    }

    if (error) {
      return <div className={`${styles.status} ${styles['status--error']}`}>Failed to load posts. Please try again later.</div>;
    }

    const { posts, pagination } = data || { posts: [], pagination: { current_page: 1, total_pages: 1 } };

    return (
      <section className={styles.posts}>
        {posts && posts.length > 0 ? (
          <>
            <div className={styles.posts__list}>
              {posts.map(post => (
                <Link 
                  to={`/post/${post.id}`} 
                  key={post.id}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article className={styles.posts__item}>
                    <h2 className={styles.posts__title}>{post.title}</h2>
                    <p style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      margin: '0.5rem 0'
                    }}>
                      {post.content_preview}
                    </p>
                    <div className={styles.posts__meta}>
                      <span className={styles['posts__meta-item']}>
                        <FaCalendarAlt className={styles['posts__meta-icon']} />
                        <span>{formatShortDate(post.created_at)}</span>
                      </span>
                      <span className={styles['posts__meta-item']}>
                        <FaUser className={styles['posts__meta-icon']} />
                        <span>{post.author_username || 'Anonymous'}</span>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className={styles.pagination}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={styles.pagination__button}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              <div className={styles.pagination__indicators}>
                {Array.from({ length: pagination.total_pages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`${styles.pagination__dot} ${currentPage === i + 1 ? styles['pagination__dot--active'] : ''}`}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(pagination.total_pages, p + 1))}
                disabled={currentPage === pagination.total_pages}
                className={styles.pagination__button}
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSearchMode(!!term);
    setCurrentPage(1);
    if (term) {
      setSearchParams({ q: term });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.home}>
      {renderHero()}
      <div className={styles.content}>
        {renderPosts()}
      </div>
    </div>
  );
};

export default Home; 