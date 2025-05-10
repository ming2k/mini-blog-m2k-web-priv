import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaDesktop, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../store/ThemeContext';
import styles from './Settings.module.css';

function LoadingSpinner() {
  return <div className={styles.loading}>Loading settings...</div>;
}

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={styles.settingsRoot}>
        <div className={styles.settingsCard}>
          <h1 className={styles.title}>Settings</h1>
          <section className={styles.section}>
            <label className={styles.label}>Theme</label>
            <div className={styles.themeOptions}>
              <button
                className={`${styles.themeOption} ${theme === 'light' ? styles.selected : ''}`}
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
              >
                <FaSun /> Light
              </button>
              <button
                className={`${styles.themeOption} ${theme === 'dark' ? styles.selected : ''}`}
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
              >
                <FaMoon /> Dark
              </button>
              <button
                className={`${styles.themeOption} ${theme === 'system' ? styles.selected : ''}`}
                onClick={() => setTheme('system')}
                aria-pressed={theme === 'system'}
              >
                <FaDesktop /> System
              </button>
            </div>
          </section>
          <button className={styles.backButton} onClick={() => navigate('/')}> <FaArrowLeft /> Back </button>
        </div>
      </div>
    </Suspense>
  );
} 