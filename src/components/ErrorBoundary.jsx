import { useRouteError } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className={styles.errorContainer}>
      <h1>Oops! Something went wrong</h1>
      <p>
        {error.status === 404 
          ? "Sorry, we couldn't find what you were looking for."
          : "An unexpected error occurred."}
      </p>
      <p className={styles.errorDetails}>
        {error.message || error.statusText}
      </p>
      <a href="/" className={styles.homeLink}>
        Return to Home
      </a>
    </div>
  );
} 