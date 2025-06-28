
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  featuredImage?: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  featuredImage?: string;
}

export interface UpdateBlogPost extends Partial<CreateBlogPost> {
  id: string;
}
