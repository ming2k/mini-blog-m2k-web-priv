import { FaHeart, FaCopyright, FaFileContract, FaLock, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright"><FaCopyright size={14} /> {new Date().getFullYear()} M2K BLOG. All rights reserved.</p>
        <div className="footer-links">
          <a href="#"><FaFileContract size={14} /> Terms</a>
          <a href="#"><FaLock size={14} /> Privacy</a>
          <a href="#"><FaEnvelope size={14} /> Contact</a>
        </div>
      </div>
      <div className="footer-credit">
        Made with <FaHeart size={14} style={{ color: '#ff6b6b' }} /> by Harrison Anderson
      </div>
    </footer>
  );
};

export default Footer; 