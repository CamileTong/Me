import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontMatter } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'data', 'posts');

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  
  // 读取 diary 和 dev 目录
  const categories = ['diary', 'dev'];
  
  categories.forEach(category => {
    const categoryPath = path.join(postsDirectory, category);
    
    if (!fs.existsSync(categoryPath)) {
      return;
    }
    
    const fileNames = fs.readdirSync(categoryPath);
    
    fileNames.forEach(fileName => {
      if (!fileName.endsWith('.md')) return;
      
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const slug = fileName.replace(/\.md$/, '');
      
      posts.push({
        slug,
        title: data.title || '',
        date: data.date || '',
        category: category as 'diary' | 'dev',
        content,
        excerpt: data.excerpt,
        image: data.image,
      });
    });
  });
  
  // 按日期排序（最新的在前）
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostsByCategory(category: 'diary' | 'dev'): Post[] {
  return getAllPosts().filter(post => post.category === category);
}

export function getPostBySlug(category: string, slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(post => post.category === category && post.slug === slug) || null;
}

export function getAllPostSlugs(): Array<{ category: string; slug: string }> {
  const posts = getAllPosts();
  return posts.map(post => ({
    category: post.category,
    slug: post.slug,
  }));
}

