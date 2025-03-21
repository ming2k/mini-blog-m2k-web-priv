import React from 'react';
import styles from './ErrorBoundary.module.css';

export default function ErrorBoundary() {
  return (
    <div className={styles.errorContainer}>
      <h1>Oops! Something went wrong</h1>
      <p>We're sorry for the inconvenience. Please try again later.</p>
      <button 
        className={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );
} 