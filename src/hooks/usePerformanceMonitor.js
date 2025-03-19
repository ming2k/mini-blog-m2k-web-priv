import { useEffect, useRef } from 'react';

const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  
  useEffect(() => {
    const now = performance.now();
    const renderTime = now - lastRenderTime.current;
    renderCount.current += 1;
    
    console.log(`[${componentName}] Render #${renderCount.current} took ${renderTime.toFixed(2)}ms`);
    
    lastRenderTime.current = now;
    
    return () => {
      console.log(`[${componentName}] Component unmounted after ${renderCount.current} renders`);
    };
  });
  
  return renderCount.current;
};

export default usePerformanceMonitor; 