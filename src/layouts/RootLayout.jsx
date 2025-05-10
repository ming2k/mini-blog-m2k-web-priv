import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { getCurrentUser } from "../api/auth";
import { FaHome, FaFileAlt, FaSignOutAlt, FaUser, FaLink, FaCheckSquare, FaCode, FaSun, FaMoon, FaDesktop, FaCog } from "react-icons/fa";
import styles from "./RootLayout.module.css";
import { useTheme } from '../store/ThemeContext';
import Settings from '../pages/Settings';
import Home from '../pages/Home';

function RootLayout() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

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

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light');
  };

  const themeIcon = theme === 'light' ? <FaSun title="Light mode" /> : theme === 'dark' ? <FaMoon title="Dark mode" /> : <FaDesktop title="System" />;

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

  const navItems = [
    {
      key: 'home',
      icon: <FaHome />,
      label: 'Home',
      onClick: () => navigate('/'),
      isAvatar: false,
    },
    {
      key: 'settings',
      icon: <FaCog />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
      isAvatar: false,
    },
    {
      key: 'account',
      icon: (
        <div className={styles.avatar} style={{ width: 32, height: 32, fontSize: '1.1rem' }} title={user?.username || ''}>
          {user?.username ? user.username.charAt(0).toUpperCase() : '?'}
        </div>
      ),
      label: user?.username || '',
      // onClick: () => navigate(`/${user?.username}`),
      onClick: () => navigate("/ming"),
      isAvatar: true,
    },
  ];

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className={styles.navTop}>
          {navItems.slice(0, 2).map(item => (
            <button
              key={item.key}
              className={styles.navBtn}
              onClick={item.onClick}
              title={item.label}
              type="button"
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div 
          className={styles.navBottom}
          onClick={navItems[2].onClick}
          title={navItems[2].label}
        >
          {navItems[2].icon}
        </div>
      </nav>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout; 