import { Project } from '@/types/project';
import projectsData from '@/data/projects.json';

export function getAllProjects(): Project[] {
  return projectsData.projects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id);
}

