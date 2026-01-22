export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  color: string;
  borderColor: string;
  iconBg: string;
  heroImage: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  published: boolean;
  cover_image: string;
  created_at: Date;
  updated_at: Date;
  comments: any[];
  readTime?: string; // Optional for now, or add to constants
}

export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  location: string;
  description: string;
  requirements: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  featured: boolean;
  completed_date: string;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;  // NEW FIELD
  company: string;
  service?: string;
  preferred_date: string;
  message: string;
}