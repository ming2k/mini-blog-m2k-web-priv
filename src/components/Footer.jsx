import { FaHeart, FaCopyright, FaFileContract } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <FaCopyright size={14} /> {new Date().getFullYear()} M2K BLOG. All rights reserved.
        </div>
        <div className={styles.menu}>
          <a href="#" className={styles.menuItem}><FaFileContract size={14} /> Terms</a>
        </div>
      </div>
      <div className={styles.credit}>
        <FaHeart size={14} style={{ color: '#ff6b6b' }} /> By ming2k
      </div>
    </footer>
  );
};

export default Footer; 