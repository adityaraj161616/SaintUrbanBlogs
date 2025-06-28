
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface AnimatedLoaderProps {
  isLoading: boolean;
  text?: string;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({ 
  isLoading, 
  text = "Loading amazing content..." 
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading && loaderRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Sophisticated loader animation
      tl.to(circleRef.current, {
        rotation: 360,
        duration: 2,
        ease: "none"
      })
      .to(loaderRef.current.querySelectorAll('.loader-dot'), {
        scale: 1.5,
        opacity: 1,
        duration: 0.3,
        stagger: 0.2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      }, 0);

      return () => {
        tl.kill();
      };
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      ref={loaderRef}
      className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div ref={circleRef} className="relative w-16 h-16 mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-black border-t-transparent rounded-full"></div>
        </div>
        
        <div className="flex space-x-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="loader-dot w-3 h-3 bg-black rounded-full"
            />
          ))}
        </div>
        
        <p className="text-gray-600 font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default AnimatedLoader;
