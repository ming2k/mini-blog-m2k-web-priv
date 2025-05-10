import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { getCurrentUser } from "../api/auth";
import { FaHome, FaFileAlt, FaSignOutAlt, FaUser, FaLink, FaCheckSquare, FaCode } from "react-icons/fa";
import styles from "./RootLayout.module.css";

function RootLayout() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to load user:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.iconbar}>
        <div className={styles.iconbarIcons}>
          <button className={styles.iconbarIconBtn}><FaLink /></button>
          <button className={styles.iconbarIconBtn}><FaCheckSquare /></button>
          <button className={styles.iconbarIconBtn}><FaCode /></button>
        </div>
        <div className={styles.iconbarUser}>
          <div className={styles.avatar} title={user.username}>
            {user.username ? user.username.charAt(0).toUpperCase() : '?'}
          </div>
        </div>
      </aside>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          {/* Search Bar */}
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search memos..."
          />

          {/* Navigation */}
          <nav className={styles.navSection}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              <FaHome /> Home
            </Link>
            <Link 
              to="/explore" 
              className={`${styles.navLink} ${location.pathname === '/explore' ? styles.active : ''}`}
            >
              <FaFileAlt /> Explore
            </Link>
          </nav>

          {/* Calendar (static for now) */}
          <div className={styles.calendarSection}>
            <div className={styles.calendarHeader}>March 2025</div>
            <table className={styles.calendarTable}>
              <thead>
                <tr>
                  <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr><td></td><td></td><td></td><td></td><td></td><td></td><td>1</td></tr>
                <tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
                <tr><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr>
                <tr><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td></tr>
                <tr><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr>
                <tr><td>30</td><td>31</td><td></td><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>

          {/* Shortcuts */}
          <div className={styles.shortcutsSection}>
            <div className={styles.sectionTitle}>Shortcuts</div>
            <ul className={styles.shortcutsList}>
              <li>Links</li>
              <li>To-do</li>
              <li>Code</li>
            </ul>
          </div>

          {/* Tags */}
          <div className={styles.tagsSection}>
            <div className={styles.sectionTitle}>Tags</div>
            <div className={styles.tagsList}>
              <span className={styles.tag}>#features</span>
              <span className={styles.tag}>#hello</span>
              <span className={styles.tag}>#todo</span>
            </div>
          </div>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout; 