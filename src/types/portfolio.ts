export interface Skill {
  name: string;
  level: number; // Percentage (e.g. 90)
  category: 'Frontend' | 'Mobile' | 'State Management' | 'Backend Knowledge' | 'Database' | 'Tools';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  image: string; // Will use nice SVG or gradient pattern since we don't have static images
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}
