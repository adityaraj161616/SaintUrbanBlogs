
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseApi } from '../services/supabaseApi';
import { seedDatabase, checkIfArticlesExist } from '../utils/seedArticles';
import EnhancedBlogCard from './EnhancedBlogCard';
import AnimatedLoader from './AnimatedLoader';

const BlogList = () => {
  const queryClient = useQueryClient();
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: supabaseApi.getAllPosts,
  });

  // Auto-seed database if empty
  useEffect(() => {
    const seedIfEmpty = async () => {
      try {
        const hasArticles = await checkIfArticlesExist();
        if (!hasArticles) {
          console.log('No articles found, seeding database...');
          const success = await seedDatabase();
          if (success) {
            // Refetch posts after seeding
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
          }
        }
      } catch (error) {
        console.error('Error in auto-seeding:', error);
      }
    };

    if (!isLoading && (!posts || posts.length === 0)) {
      seedIfEmpty();
    }
  }, [isLoading, posts, queryClient]);

  if (isLoading) {
    return <AnimatedLoader isLoading={true} text="Loading amazing articles..." />;
  }

  if (error) {
    return (
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-light text-red-600 mb-4">Unable to load articles</h2>
            <p className="text-gray-600">Please check your connection and try again</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <motion.div 
          className="text-center mb-32"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="animate-text text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] text-black mb-8 leading-[0.9]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Latest
            <br />
            Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
            Discover thought-provoking stories, insights, and perspectives from our community of writers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {posts?.map((post, index) => (
            <EnhancedBlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {posts?.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                No articles yet
              </h3>
              <p className="text-gray-600 font-light">Be the first to share your story with the world!</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
