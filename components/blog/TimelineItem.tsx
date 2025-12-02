'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post } from '@/types/post';

interface TimelineItemProps {
  post: Post;
  index: number;
}

export default function TimelineItem({ post, index }: TimelineItemProps) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-16"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-8 h-8 bg-warm-orange rounded-full border-4 border-white shadow-lg flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      <Link
        href={`/blog/${post.category}/${post.slug}`}
        className="block group"
      >
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-warm-orange">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-warm-orange">
              {formattedDate}
            </span>
            <span className="text-xs px-2 py-1 bg-warm-peach text-warm-orange rounded-full">
              {post.category === 'diary' ? '日记' : '开发日志'}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-neutral-dark group-hover:text-warm-orange transition-colors mb-2">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-neutral-gray line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="mt-4 text-sm text-warm-orange group-hover:text-warm-red transition-colors">
            阅读更多 →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

