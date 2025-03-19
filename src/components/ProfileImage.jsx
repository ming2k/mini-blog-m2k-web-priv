import { useState } from 'react';
import profileImage from '../assets/images/profile.jpg'; // Import the image

const ProfileImage = ({ alt, size = 150, src = profileImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="profile-image-container" style={{ width: size, height: size }}>
      <img 
        src={src} 
        alt={alt} 
        className={`profile-image ${isLoaded ? 'loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          transition: 'opacity 0.3s ease',
          opacity: isLoaded ? 1 : 0,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      />
      {!isLoaded && (
        <div className="profile-image-placeholder" style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'rgb(245, 245, 245)',
          position: 'absolute',
          top: 0,
          left: 0
        }}></div>
      )}
    </div>
  );
};

export default ProfileImage; 