export interface Project {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'AI / ML' | '3D / WebGL';
  featured: boolean;
  coverImage: string;
  images: string[];
  client?: string;
  year: string;
  role: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  challenge?: string;
  solution?: string;
  order: number;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Design & 3D' | 'DevOps & Tools';
  level: number; // 0 to 100
  iconName?: string;
  featured: boolean;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
  technologies: string[];
  type: 'Work' | 'Education';
}

export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  published: boolean;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  title: string;
  bio: string;
  heroHeadline: string;
  heroSubheadline: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  availableForFreelance: boolean;
}
