import { NavLink } from 'react-router-dom';
import { FaHome, FaNewspaper, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './DashboardNavigation.module.css';

export default function DashboardNavigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <NavLink to="/dashboard" className={styles.brandLink}>
          M2K BLOG
        </NavLink>
      </div>
      
      <div className={styles.menu}>
        <NavLink 
          to="/dashboard" 
          end
          className={({ isActive }) => 
            `${styles.menuItem} ${isActive ? styles.active : ''}`
          }
        >
          <FaHome /> <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/dashboard/posts" 
          className={({ isActive }) => 
            `${styles.menuItem} ${isActive ? styles.active : ''}`
          }
        >
          <FaNewspaper /> <span>Posts</span>
        </NavLink>
        
        <NavLink 
          to="/dashboard/settings" 
          className={({ isActive }) => 
            `${styles.menuItem} ${isActive ? styles.active : ''}`
          }
        >
          <FaCog /> <span>Settings</span>
        </NavLink>
      </div>
      
      <div className={styles.footer}>
        <button className={styles.logoutButton}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </nav>
  );
} 