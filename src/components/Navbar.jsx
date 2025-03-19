import { Link } from 'react-router-dom';
// Remove icon imports since we won't be using them
// import { FaHome, FaUser, FaSearch, FaNewspaper, FaArchive, FaTags } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar slim">
      <div className="navbar-brand">
        <Link to="/" style={{ fontWeight: 'bold' }}>M2K BLOG</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/about" className="navbar-item">About</Link>
      </div>
    </nav>
  );
};

export default Navbar; 