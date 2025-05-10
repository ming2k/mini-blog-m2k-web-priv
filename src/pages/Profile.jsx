import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.css';
import { FaUser, FaLock, FaEnvelope, FaKey, FaCheck, FaTimes } from 'react-icons/fa';

export default function Profile() {
  const { username } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    // TODO: Implement password change API call
    setMessage({ type: 'success', text: 'Password updated successfully' });
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {username.charAt(0).toUpperCase()}
        </div>
        <h1 className={styles.username}>@{username}</h1>
      </div>

      <div className={styles.profileContent}>
        <section className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>
            <FaUser className={styles.sectionIcon} />
            Profile Information
          </h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Username</label>
              <div className={styles.infoValue}>@{username}</div>
            </div>
            <div className={styles.infoItem}>
              <label>Email</label>
              <div className={styles.infoValue}>user@example.com</div>
            </div>
            <div className={styles.infoItem}>
              <label>Member Since</label>
              <div className={styles.infoValue}>March 2024</div>
            </div>
          </div>
        </section>

        <section className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>
            <FaLock className={styles.sectionIcon} />
            Security Settings
          </h2>
          <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />
                <FaKey className={styles.inputIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />
                <FaKey className={styles.inputIcon} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />
                <FaKey className={styles.inputIcon} />
              </div>
            </div>

            {message.text && (
              <div className={`${styles.message} ${styles[message.type]}`}>
                {message.type === 'success' ? <FaCheck /> : <FaTimes />}
                {message.text}
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              Update Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
} 