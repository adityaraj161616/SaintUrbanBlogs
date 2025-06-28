
import React, { useEffect, useRef } from 'react';
import scrollRecorder from '../utils/scrollAnimations';

interface ScrollAnimationProviderProps {
  children: React.ReactNode;
  autoStart?: boolean;
}

const ScrollAnimationProvider: React.FC<ScrollAnimationProviderProps> = ({ 
  children, 
  autoStart = true 
}) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && autoStart) {
      // Small delay to ensure all components are mounted
      const timer = setTimeout(() => {
        console.log('Initializing scroll animations...');
        hasInitialized.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoStart]);

  // Expose scroll recorder to window for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).scrollRecorder = scrollRecorder;
      console.log('ScrollRecorder available at window.scrollRecorder');
    }
  }, []);

  return <>{children}</>;
};

export default ScrollAnimationProvider;
