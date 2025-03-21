import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import { FaHome, FaFileAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import styles from './DashboardLayout.module.css';

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Failed to load user:', err);
      handleLogout();
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <nav className={styles.nav}>
            <Link 
              to="/dashboard" 
              className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
            >
              <FaHome /> Overview
            </Link>
            <Link 
              to="/dashboard/posts" 
              className={`${styles.navLink} ${location.pathname.includes('/dashboard/posts') ? styles.active : ''}`}
            >
              <FaFileAlt /> Posts
            </Link>
          </nav>
          <div className={styles.sidebarFooter}>
            <div className={styles.userInfo}>
              <FaUser className={styles.userIcon} />
              {user && <span>{user.username}</span>}
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout; 