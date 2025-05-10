import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

function LoadingSpinner() {
  return <div className={styles.loading}>Loading settings...</div>;
}

export default function Settings() {
  const navigate = useNavigate();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={styles.settings}>
        <div className={styles.settingsHeader}>
          <h1>Admin Settings</h1>
        </div>
        <div className={styles.settingsContent}>
          {/* Add your admin settings form/content here */}
          <p>Admin settings page content coming soon...</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </Suspense>
  );
} 