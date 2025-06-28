
import { supabase } from '../integrations/supabase/client';
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '../types/blog';

export const supabaseApi = {
  // GET /api/posts - Fetch all blog posts from server
  getAllPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    // Transform server data to match frontend interface
    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      tags: post.tags || [],
      featuredImage: post.featured_image
    }));
  },

  // GET /api/posts/:id - Fetch single blog post from server
  getPostById: async (id: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post:', error);
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    if (!data) return null;

    // Transform server data to match frontend interface
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      tags: data.tags || [],
      featuredImage: data.featured_image
    };
  },

  // POST /api/posts - Create new blog post on server
  createPost: async (postData: CreateBlogPost): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: postData.title,
        content: postData.content,
        excerpt: postData.excerpt,
        author: postData.author,
        tags: postData.tags,
        featured_image: postData.featuredImage
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw new Error(`Failed to create post: ${error.message}`);
    }

    // Transform server response to match frontend interface
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      tags: data.tags || [],
      featuredImage: data.featured_image
    };
  },

  // PUT /api/posts/:id - Update existing blog post on server
  updatePost: async (id: string, updates: Partial<UpdateBlogPost>): Promise<BlogPost | null> => {
    const updateData: any = {};
    
    if (updates.title) updateData.title = updates.title;
    if (updates.content) updateData.content = updates.content;
    if (updates.excerpt) updateData.excerpt = updates.excerpt;
    if (updates.author) updateData.author = updates.author;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.featuredImage !== undefined) updateData.featured_image = updates.featuredImage;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating post:', error);
      throw new Error(`Failed to update post: ${error.message}`);
    }

    if (!data) return null;

    // Transform server response to match frontend interface
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      author: data.author,
      publishedAt: data.published_at,
      updatedAt: data.updated_at,
      tags: data.tags || [],
      featuredImage: data.featured_image
    };
  },

  // DELETE /api/posts/:id - Delete blog post from server
  deletePost: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      throw new Error(`Failed to delete post: ${error.message}`);
    }

    return true;
  }
};
