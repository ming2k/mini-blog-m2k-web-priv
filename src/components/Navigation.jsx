import { Link } from 'react-router-dom';

export default function Navigation() {
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
} 