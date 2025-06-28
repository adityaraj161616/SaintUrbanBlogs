
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { BlogPost } from '../types/blog';
import advancedScrollRecorder from '../utils/scrollAnimations';

interface EnhancedBlogCardProps {
  post: BlogPost;
  index: number;
}

const EnhancedBlogCard: React.FC<EnhancedBlogCardProps> = ({ post, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // Add magnetic effect to the card
      advancedScrollRecorder.createMagneticEffect(cardRef.current, 0.1);
      
      // Add ripple effect
      advancedScrollRecorder.createRippleEffect(cardRef.current);
    }
  }, []);

  const handleClick = () => {
    // Add click animation before navigation
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(cardRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => navigate(`/blog/${post.id}`)
          });
        }
      });
    }
  };

  const handleMouseEnter = () => {
    if (imageRef.current && contentRef.current) {
      const tl = gsap.timeline();
      
      tl.to(imageRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(contentRef.current.querySelectorAll('h3, p'), {
        y: -5,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      }, 0.1);
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current && contentRef.current) {
      const tl = gsap.timeline();
      
      tl.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(contentRef.current.querySelectorAll('h3, p'), {
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
      }, 0);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article 
      ref={cardRef}
      className="blog-card group cursor-pointer relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        duration: 0.8, 
        delay: index * 0.1 
      }}
      viewport={{ once: true }}
    >
      {post.featuredImage && (
        <div className="relative overflow-hidden bg-gray-50 aspect-[4/3] mb-6">
          <img
            ref={imageRef}
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Overlay content */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-black text-sm font-medium tracking-wide uppercase">
                Read More
              </span>
            </div>
          </motion.div>
        </div>
      )}
      
      <div ref={contentRef} className="p-6 space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 font-light tracking-wide">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        
        <h3 className="text-xl font-light text-black group-hover:text-gray-700 transition-colors duration-300 tracking-wide leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 font-light text-sm leading-relaxed tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
          {post.excerpt}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full tracking-wider uppercase font-light hover:bg-gray-200 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 rounded-lg transition-all duration-300 pointer-events-none"></div>
    </motion.article>
  );
};

export default EnhancedBlogCard;
