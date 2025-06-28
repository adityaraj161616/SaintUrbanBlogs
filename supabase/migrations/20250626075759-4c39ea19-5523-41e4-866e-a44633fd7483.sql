
-- Create a table for blog posts with proper CRUD operations
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT
);

-- Add Row Level Security (RLS) to make it publicly readable but only allow authenticated users to modify
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read blog posts (public blog)
CREATE POLICY "Anyone can view blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to create blog posts
CREATE POLICY "Authenticated users can create blog posts" 
  ON public.blog_posts 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy that allows authenticated users to update blog posts
CREATE POLICY "Authenticated users can update blog posts" 
  ON public.blog_posts 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy that allows authenticated users to delete blog posts
CREATE POLICY "Authenticated users can delete blog posts" 
  ON public.blog_posts 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER handle_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
