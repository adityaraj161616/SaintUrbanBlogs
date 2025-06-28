
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { supabaseApi } from '../services/supabaseApi';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useToast } from '../hooks/use-toast';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => supabaseApi.getPostById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: supabaseApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Article Deleted",
        description: "The article has been deleted successfully.",
      });
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while deleting the article.",
        variant: "destructive"
      });
    }
  });

  const handleDelete = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to delete articles.",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      deleteMutation.mutate(id!);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="flex justify-center items-center h-64 pt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-8 lg:px-12 pt-32">
          <h1 className="text-2xl font-light text-red-600 text-center">Article not found</h1>
          <p className="text-gray-500 text-center mt-2">Failed to fetch data from server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          {/* Back button */}
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300 mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft size={20} />
            <span className="font-light tracking-wide">Back to articles</span>
          </motion.button>

          {/* Featured Image */}
          {post.featuredImage && (
            <motion.div
              className="relative overflow-hidden bg-gray-50 aspect-[16/9] mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Article Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] text-black mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-6 text-gray-600 font-light tracking-wide">
                <span>{post.author}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
                {post.updatedAt !== post.publishedAt && (
                  <>
                    <span>•</span>
                    <span className="text-sm">Updated {formatDate(post.updatedAt)}</span>
                  </>
                )}
                <span>•</span>
                <span className="text-sm text-green-600">Live from database</span>
              </div>
              
              {user && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate(`/blog/${post.id}/edit`)}
                    className="p-2 text-gray-600 hover:text-black transition-colors duration-300"
                    title="Edit article"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-300 disabled:opacity-50"
                    title="Delete article"
                  >
                    {deleteMutation.isPending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.header>

          {/* Tags */}
          {post.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-sm text-gray-600 bg-gray-100 px-4 py-2 tracking-wider uppercase font-light"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="text-xl text-gray-700 font-light leading-relaxed tracking-wide whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
