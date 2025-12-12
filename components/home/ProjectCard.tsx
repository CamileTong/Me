'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const imageContent = (
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );

  const cardContent = (
    <div className="h-full flex flex-col">
      {project.link ? (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          {imageContent}
        </Link>
      ) : (
        imageContent
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-neutral-dark">{project.title}</h3>
          {project.featured && (
            <Badge variant="warm">💛</Badge>
          )}
        </div>
        
        <p className="text-neutral-gray mb-4 flex-1">{project.shortDescription}</p>
        
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
        )}
        
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-orange hover:text-warm-red font-medium transition-colors"
          >
            查看项目 →
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card hover={true}>
        {cardContent}
      </Card>
    </motion.div>
  );
}

