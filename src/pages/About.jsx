import { memo } from 'react';
import ProfileImage from '../components/ProfileImage';
import usePerformanceMonitor from '../hooks/usePerformanceMonitor';
import { FaGithub, FaEnvelope, FaCode, FaBolt, FaImage, FaChartLine } from 'react-icons/fa';

const About = memo(() => {
  usePerformanceMonitor('AboutPage');
  
  return (
    <div className="about-page">
      <section className="about-header">
        <h1>About M2K BLOG</h1>
        <p className="subtitle">A collection of thoughts and code snippets</p>
      </section>
      
      <section className="about-content">
        <div className="about-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <ProfileImage alt="Harrison Anderson" size={120} />
            <div>
              <h2>About Me</h2>
              <p>
                I'm Harrison Anderson, a developer with a passion for clean code, efficient systems, and minimalist design.
                I created this blog to share my experiences and knowledge with the wider developer community.
              </p>
            </div>
          </div>
          
          <h2>Technical Details</h2>
          <p>
            This blog is built with React and optimized for performance. Some of the technical features include:
          </p>
          <ul className="feature-list">
            <li><FaCode /> Code splitting and lazy loading</li>
            <li><FaBolt /> Efficient state management</li>
            <li><FaImage /> Optimized image loading</li>
            <li><FaChartLine /> Performance monitoring</li>
          </ul>
          
          <h2>Contact</h2>
          <p>
            If you'd like to get in touch, you can reach me at <a href="mailto:mingmillennium@gmail.com"><FaEnvelope /> mingmillennium@gmail.com</a> or
            find me on <a href="https://github.com/ming2k"><FaGithub /> GitHub</a>.
          </p>
        </div>
      </section>
    </div>
  );
});

export default About; 