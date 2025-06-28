
import { supabaseApi } from '../services/supabaseApi';
import { sampleArticles } from './sampleArticles';

export const seedDatabase = async () => {
  try {
    console.log('Starting to seed database with sample articles...');
    
    for (const article of sampleArticles) {
      try {
        await supabaseApi.createPost({
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          author: article.author,
          tags: article.tags,
          featuredImage: article.featuredImage
        });
        console.log(`✅ Added article: ${article.title}`);
      } catch (error) {
        console.error(`❌ Failed to add article: ${article.title}`, error);
      }
    }
    
    console.log('✅ Database seeding completed!');
    return true;
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    return false;
  }
};

// Function to check if articles already exist
export const checkIfArticlesExist = async () => {
  try {
    const posts = await supabaseApi.getAllPosts();
    return posts.length > 0;
  } catch (error) {
    console.error('Error checking existing articles:', error);
    return false;
  }
};
