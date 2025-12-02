import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import BlogContent from '@/components/blog/BlogContent';
import Button from '@/components/ui/Button';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ category, slug }) => ({
    category,
    slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const post = getPostBySlug(params.category, params.slug);
  
  if (!post) {
    notFound();
  }
  
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <article className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-block mb-8">
          <Button variant="outline">← 返回日志</Button>
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-warm-peach text-warm-orange rounded-full text-sm font-medium">
              {post.category === 'diary' ? '日记' : '开发日志'}
            </span>
            <time className="text-neutral-gray">{formattedDate}</time>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-neutral-gray">{post.excerpt}</p>
          )}
        </header>
        
        {post.image && (
          <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        
        <div className="prose-wrapper">
          <BlogContent content={post.content} />
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-gray">
          <Link href="/blog" className="inline-block">
            <Button variant="outline">← 返回日志列表</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

