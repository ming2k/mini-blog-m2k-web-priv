import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, placeholder = 'Search posts...' }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.search__input}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className={styles.search__button}>
        <FaSearch />
      </button>
    </form>
  );
} 