import React from 'react';
import styles from './DashboardHome.module.css';

export default function DashboardHome() {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard Overview</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Posts</h3>
          <p className={styles.statNumber}>24</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p className={styles.statNumber}>12</p>
        </div>
        <div className={styles.statCard}>
          <h3>Views Today</h3>
          <p className={styles.statNumber}>156</p>
        </div>
        <div className={styles.statCard}>
          <h3>Comments</h3>
          <p className={styles.statNumber}>48</p>
        </div>
      </div>
    </div>
  );
} 