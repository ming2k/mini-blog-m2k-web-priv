import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, placeholder, className }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className={styles.searchWrapper}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.searchInput} ${className}`}
      />
    </div>
  );
} 