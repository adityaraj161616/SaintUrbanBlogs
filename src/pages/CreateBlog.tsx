import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Lock } from 'lucide-react';
import { supabaseApi } from '../services/supabaseApi';
import { CreateBlogPost } from '../types/blog';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

// Dummy images array
const dummyImages = [
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1506629905687-4775709b9e3e?auto=format&fit=crop&w=1200&q=80'
];

const CreateBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState<CreateBlogPost>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    tags: [],
    featuredImage: ''
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create or edit articles.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  // Load existing post data if editing
  const { data: existingPost } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => supabaseApi.getPostById(id!),
    enabled: isEditing && !!user,
  });

  useEffect(() => {
    if (existingPost && isEditing) {
      setFormData({
        title: existingPost.title,
        content: existingPost.content,
        excerpt: existingPost.excerpt,
        author: existingPost.author,
        tags: existingPost.tags,
        featuredImage: existingPost.featuredImage || ''
      });
    }
  }, [existingPost, isEditing]);

  const createMutation = useMutation({
    mutationFn: supabaseApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Article Created",
        description: "Your article has been published successfully.",
      });
      navigate('/');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while creating the article.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; updates: Partial<CreateBlogPost> }) => 
      supabaseApi.updatePost(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-post', id] });
      toast({
        title: "Article Updated",
        description: "Your changes have been saved.",
      });
      navigate(`/blog/${id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while updating the article.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // If no image is provided, use a random dummy image
    const finalFormData = {
      ...formData,
      featuredImage: formData.featuredImage.trim() || dummyImages[Math.floor(Math.random() * dummyImages.length)]
    };

    if (isEditing && id) {
      updateMutation.mutate({ id, updates: finalFormData });
    } else {
      createMutation.mutate(finalFormData);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags: tagsArray });
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="flex justify-center items-center h-64 pt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  // Show auth required message if not authenticated
  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-8 lg:px-12 pt-32">
          <div className="text-center py-20">
            <Lock size={48} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-light text-gray-600 mb-4">Authentication Required</h1>
            <p className="text-gray-500 mb-8">Please sign in to create or edit articles.</p>
            <Button onClick={() => navigate('/auth')} className="bg-black text-white hover:bg-gray-900">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={20} />
              <span className="font-light tracking-wide">Back</span>
            </button>

            <h1 className="text-4xl md:text-5xl font-light tracking-[-0.02em] text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-gray-600 mt-4 font-light">
              Connected to real database • Server-client communication active
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-lg font-light border-gray-200"
                placeholder="Enter your article title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Description *
              </label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="font-light border-gray-200 resize-none"
                placeholder="A brief summary of your article"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Featured Image URL
              </label>
              <Input
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="font-light border-gray-200"
                placeholder="https://example.com/image.jpg (leave empty for random image)"
                type="url"
              />
              <p className="text-xs text-gray-500">Leave empty to automatically assign a random image</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 tracking-wide">
                Content *
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="font-light border-gray-200 resize-none"
                placeholder="Write your article here..."
                rows={20}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Author *
                </label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="font-light border-gray-200"
                  placeholder="Author name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Tags
                </label>
                <Input
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="font-light border-gray-200"
                  placeholder="fashion, style, trends (separated by commas)"
                />
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-black text-white hover:bg-gray-900 px-8 py-3 font-light tracking-[0.1em] uppercase"
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving to server...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save size={16} />
                    <span>{isEditing ? 'Update' : 'Publish'}</span>
                  </div>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
