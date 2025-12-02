export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  link?: string;
  tags?: string[];
  date: string;
  featured?: boolean;
}

