
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import BlogList from './BlogList';

const ProductGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="blog-section">
      <BlogList />
    </div>
  );
};

export default ProductGrid;
