import React, { Suspense } from 'react';
import styles from './DashboardSettings.module.css';

function LoadingSpinner() {
  return <div className={styles.loading}>Loading...</div>;
}

export default function DashboardSettings() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={styles.settings}>
        <div className={styles.settingsHeader}>
          <h1>Settings</h1>
        </div>
        <div className={styles.settingsContent}>
          {/* Add your settings form/content here */}
          <p>Settings page content coming soon...</p>
        </div>
      </div>
    </Suspense>
  );
} 