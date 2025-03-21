import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`${styles.nav} ${styles.slim}`}>
      <div className={styles.brand}>
        <Link to="/" className={styles.brand}>M2K BLOG</Link>
      </div>
      <div className={styles.menu}>
        <Link to="/" className={styles.menuItem}>Home</Link>
        <Link to="/about" className={styles.menuItem}>About</Link>
        <button 
          className={styles.searchTab}
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open search"
        >
          <FaSearch />
        </button>
      </div>

      {isSearchOpen && (
        <div className={styles.searchOverlay} onClick={() => setIsSearchOpen(false)}>
          <form 
            className={styles.searchForm}
            onSubmit={handleSearchSubmit}
            onClick={e => e.stopPropagation()}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.searchInput}
              placeholder="Search posts..."
            />
          </form>
        </div>
      )}
    </nav>
  );
} 