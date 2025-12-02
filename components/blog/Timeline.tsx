'use client';

import { Post } from '@/types/post';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  posts: Post[];
  category: 'diary' | 'dev';
}

export default function Timeline({ posts, category }: TimelineProps) {
  const categoryPosts = posts.filter(post => post.category === category);
  
  if (categoryPosts.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-gray">
        <p>暂无{category === 'diary' ? '日记' : '开发日志'}内容</p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-warm-orange/30"></div>
      
      <div className="space-y-8">
        {categoryPosts.map((post, index) => (
          <TimelineItem key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}

