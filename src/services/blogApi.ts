
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '../types/blog';

// Mock data - In a real app, this would be stored in a database
let mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Timeless Fashion',
    content: 'In a world where trends change at lightning speed, there is something deeply comforting about timeless pieces. These creations transcend seasons and decades, becoming part of our personal style narrative. Understanding the principles of timeless fashion helps us build a wardrobe that speaks to our authentic selves while maintaining relevance through changing times.',
    excerpt: 'Discover how to create a personal style that withstands time and passing trends.',
    author: 'Marie Thompson',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    tags: ['fashion', 'style', 'timeless'],
    featuredImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2',
    title: 'The Beauty of Minimalism',
    content: 'Minimalism is not just a trend, it is a philosophy of life that reflects in our clothing choices. Less is often more, and this principle guides us toward making thoughtful decisions about what we wear and how we present ourselves to the world.',
    excerpt: 'Explore the philosophy of minimalism and its application in contemporary fashion.',
    author: 'Peter Laurent',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    tags: ['minimalism', 'philosophy', 'design'],
    featuredImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '3',
    title: 'Craftsmanship and Heritage',
    content: 'Behind every exceptional piece lies hours of meticulous craftsmanship. From the initial sketch to the final stitch, each step is a testament to human artistry and dedication to excellence.',
    excerpt: 'An exploration of traditional craftsmanship in modern fashion design.',
    author: 'Sophie Martin',
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    tags: ['craftsmanship', 'heritage', 'artistry'],
    featuredImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const blogApi = {
  // GET /api/posts
  getAllPosts: async (): Promise<BlogPost[]> => {
    await delay(500);
    return [...mockPosts].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  },

  // GET /api/posts/:id
  getPostById: async (id: string): Promise<BlogPost | null> => {
    await delay(300);
    return mockPosts.find(post => post.id === id) || null;
  },

  // POST /api/posts
  createPost: async (postData: CreateBlogPost): Promise<BlogPost> => {
    await delay(700);
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPosts.push(newPost);
    return newPost;
  },

  // PUT /api/posts/:id
  updatePost: async (id: string, updates: Partial<UpdateBlogPost>): Promise<BlogPost | null> => {
    await delay(600);
    const postIndex = mockPosts.findIndex(post => post.id === id);
    if (postIndex === -1) return null;
    
    mockPosts[postIndex] = {
      ...mockPosts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockPosts[postIndex];
  },

  // DELETE /api/posts/:id
  deletePost: async (id: string): Promise<boolean> => {
    await delay(400);
    const initialLength = mockPosts.length;
    mockPosts = mockPosts.filter(post => post.id !== id);
    return mockPosts.length < initialLength;
  }
};
