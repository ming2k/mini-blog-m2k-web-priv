import React, { useState, useEffect } from 'react';
import { FaEye, FaUserFriends, FaCalendarDay, FaChartLine, FaFileAlt } from 'react-icons/fa';
import { getVisitStats, getPosts } from '../api';
import { formatDate } from '../utils/dateFormat';
import styles from './DashboardHome.module.css';

export default function DashboardHome() {
  const [visitStats, setVisitStats] = useState(null);
  const [postsStats, setPostsStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIp, setCurrentIp] = useState('');

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setCurrentIp(data.ip);
      } catch (err) {
        console.error('Failed to fetch IP:', err);
      }
    };

    fetchIp();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const [visitsData, postsData] = await Promise.all([
          getVisitStats(today.toISOString(), tomorrow.toISOString(), currentIp),
          getPosts(1, 1)
        ]);

        setVisitStats(visitsData);
        setPostsStats(postsData.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentIp) {
      fetchStats();
    }
  }, [currentIp]);

  const formatLastVisit = (visits) => {
    if (!visits || visits.length === 0) return 'No visits yet';
    
    const lastVisitTimestamp = Math.max(...visits.map(v => v.last_visit));
    const date = formatDate(lastVisitTimestamp, 'short');
    
    // Normalize timestamp (convert to milliseconds if needed)
    const timestamp = lastVisitTimestamp.toString().length === 10 
      ? lastVisitTimestamp * 1000 
      : lastVisitTimestamp;
      
    const time = new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return (
      <div className={styles.lastVisit}>
        <span className={styles.lastVisit__date}>{date}</span>
        <span className={styles.lastVisit__time}>{time}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loading}>Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboard__header}>
        <h1 className={styles.dashboard__title}>Dashboard Overview</h1>
        <p className={styles.dashboard__subtitle}>Today's Statistics</p>
      </header>

      <div className={styles.stats}>
        <div className={styles.stats__grid}>
          <div className={styles.stats__card}>
            <div className={`${styles.stats__icon} ${styles['stats__icon--posts']}`}>
              <FaFileAlt />
            </div>
            <div className={styles.stats__content}>
              <h3 className={styles.stats__label}>Total Posts</h3>
              <p className={styles.stats__value}>
                {postsStats?.total_posts || 0}
              </p>
            </div>
          </div>

          <div className={styles.stats__card}>
            <div className={`${styles.stats__icon} ${styles['stats__icon--views']}`}>
              <FaEye />
            </div>
            <div className={styles.stats__content}>
              <h3 className={styles.stats__label}>Total Views</h3>
              <p className={styles.stats__value}>
                {visitStats?.visits.reduce((sum, visit) => sum + visit.visit_count, 0) || 0}
              </p>
            </div>
          </div>

          <div className={styles.stats__card}>
            <div className={`${styles.stats__icon} ${styles['stats__icon--visitors']}`}>
              <FaUserFriends />
            </div>
            <div className={styles.stats__content}>
              <h3 className={styles.stats__label}>Unique Visitors</h3>
              <p className={styles.stats__value}>
                {visitStats?.total_unique_visitors || 0}
              </p>
            </div>
          </div>

          <div className={styles.stats__card}>
            <div className={`${styles.stats__icon} ${styles['stats__icon--time']}`}>
              <FaCalendarDay />
            </div>
            <div className={styles.stats__content}>
              <h3 className={styles.stats__label}>Last Visit</h3>
              <p className={styles.stats__value}>
                {formatLastVisit(visitStats?.visits)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 