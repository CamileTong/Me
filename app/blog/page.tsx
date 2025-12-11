import Timeline from '@/components/blog/Timeline';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();
  
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-dark mb-4">碎碎念</h1>
          <p className="text-xl text-neutral-gray">话太密了，小红书字数限制阻止我发挥</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-neutral-dark mb-8 flex items-center">
              <span className="w-1 h-8 bg-warm-orange mr-3"></span>
              私人日记
            </h2>
            <Timeline posts={posts} category="diary" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-neutral-dark mb-8 flex items-center">
              <span className="w-1 h-8 bg-warm-yellow mr-3"></span>
              开发日志
            </h2>
            <Timeline posts={posts} category="dev" />
          </div>
        </div>
      </div>
    </div>
  );
}

