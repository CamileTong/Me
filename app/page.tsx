import Hero from '@/components/home/Hero';
import ProjectCard from '@/components/home/ProjectCard';
import { getAllProjects } from '@/lib/projects';

export default function Home() {
  const projects = getAllProjects();
  
  return (
    <main className="min-h-screen">
      <Hero />
      
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-warm-text mb-6 tracking-tight">
              活的项目们
            </h2>
            <p className="text-xl text-neutral-gray max-w-2xl mx-auto font-light">
              开袋即食！这里有一些我正在折腾或者已经折腾完的小玩意儿。
            </p>
          </div>
          
          {projects.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-warm-text/5 backdrop-blur-sm">
              <p className="text-neutral-gray text-lg">暂无项目展示</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
