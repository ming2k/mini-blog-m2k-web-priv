import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';
import { FaUser, FaLock } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 403) {
          throw new Error('Registration is closed. Admin user already exists.');
        } else if (response.status === 400) {
          throw new Error('Username already exists');
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Create Account</h1>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className={styles.footer}>
          <p>Already have an account? <Link to="/login" className={styles.link}>Sign In</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register; 