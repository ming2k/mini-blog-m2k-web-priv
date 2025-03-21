import { Navigate } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  const token = localStorage.getItem('token');
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <div className={styles.card}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout; 