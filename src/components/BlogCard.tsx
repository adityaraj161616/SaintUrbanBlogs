
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
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
      className="blog-card group cursor-pointer"
      onClick={handleClick}
      whileHover={{ y: -12 }}
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
        <div className="relative overflow-hidden bg-gray-50 aspect-[4/3] mb-8">
          <motion.img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700" />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            <span className="text-white text-lg font-light tracking-[0.2em] uppercase bg-black/30 px-8 py-3 backdrop-blur-sm">
              Read Article
            </span>
          </motion.div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 font-light tracking-wide">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        
        <h3 className="text-2xl font-light text-black group-hover:text-gray-700 transition-colors duration-300 tracking-[0.05em] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 font-light text-base leading-relaxed tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
          {post.excerpt}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-3 py-1 tracking-wider uppercase font-light"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default BlogCard;
