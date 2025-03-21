import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser, FaShieldAlt } from 'react-icons/fa';
import styles from './Account.module.css';

export default function Account() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          current_password: formData.currentPassword,
          new_password: formData.newPassword
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Current password is incorrect');
        }
        throw new Error('Failed to change password');
      }

      setSuccess('Password changed successfully');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.account}>
      <div className={styles.header}>
        <FaUser className={styles.headerIcon} />
        <h1>Account Settings</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaShieldAlt className={styles.sectionIcon} />
            <h2>Security</h2>
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                  required
                  className={styles.input}
                  placeholder="Enter your current password"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  required
                  className={styles.input}
                  placeholder="Enter your new password"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={(e) => setFormData({...formData, confirmNewPassword: e.target.value})}
                  required
                  className={styles.input}
                  placeholder="Confirm your new password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 