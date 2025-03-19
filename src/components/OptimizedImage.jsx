import { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  lazy = true,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMWUxZTEiLz48L3N2Zz4=' 
}) => {
  const [imageSrc, setImageSrc] = useState(lazy ? placeholder : src);
  const [isLoaded, setIsLoaded] = useState(!lazy);
  
  useEffect(() => {
    if (lazy) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [src, lazy]);
  
  return (
    <div className="image-container" style={{ width, height, position: 'relative' }}>
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0.5,
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default OptimizedImage; 