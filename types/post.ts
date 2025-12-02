export interface Post {
  slug: string;
  title: string;
  date: string;
  category: 'diary' | 'dev';
  content: string;
  excerpt?: string;
  image?: string;
}

export interface PostFrontMatter {
  title: string;
  date: string;
  category: 'diary' | 'dev';
  excerpt?: string;
  image?: string;
}

