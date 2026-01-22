import { BlogPost, CareerOpening } from '../types';

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'inquiry' | 'booking';
  details?: any; // For booking specific fields
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
  order: number;
  created_at: Date;
}

const STORAGE_KEY = 'sq_consulting_data';
const BLOGS_KEY = 'sq_blogs';
const CAREERS_KEY = 'sq_careers';
const BANNERS_KEY = 'sq_banners';

export const saveSubmission = (data: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
  const currentData = getSubmissions();
  const newItem: Message = {
    ...data,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    read: false
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...currentData]));
  return newItem;
};

export const getSubmissions = (): Message[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const markAsRead = (id: number) => {
  const current = getSubmissions();
  const updated = current.map(msg => msg.id === id ? { ...msg, read: true } : msg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteSubmission = (id: number) => {
  const current = getSubmissions();
  const updated = current.filter(msg => msg.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// ===== BLOG OPERATIONS =====
export const saveBlog = (blog: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): BlogPost => {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: Date.now().toString(),
    created_at: new Date(),
    updated_at: new Date(),
  };
  localStorage.setItem(BLOGS_KEY, JSON.stringify([newBlog, ...blogs]));
  return newBlog;
};

export const getBlogs = (): BlogPost[] => {
  try {
    const data = localStorage.getItem(BLOGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const getBlogById = (id: string): BlogPost | undefined => {
  const blogs = getBlogs();
  return blogs.find(blog => blog.id === id);
};

export const updateBlog = (id: string, blog: Partial<BlogPost>) => {
  const blogs = getBlogs();
  const updated = blogs.map(b => 
    b.id === id ? { ...b, ...blog, updated_at: new Date() } : b
  );
  localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
};

export const deleteBlog = (id: string) => {
  const blogs = getBlogs();
  const updated = blogs.filter(b => b.id !== id);
  localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
};

// ===== CAREER OPERATIONS =====
export const saveCareer = (career: Omit<CareerOpening, 'id'>): CareerOpening => {
  const careers = getCareers();
  const newCareer: CareerOpening = {
    ...career,
    id: Date.now().toString(),
  };
  localStorage.setItem(CAREERS_KEY, JSON.stringify([newCareer, ...careers]));
  return newCareer;
};

export const getCareers = (): CareerOpening[] => {
  try {
    const data = localStorage.getItem(CAREERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const getCareerById = (id: string): CareerOpening | undefined => {
  const careers = getCareers();
  return careers.find(c => c.id === id);
};

export const updateCareer = (id: string, career: Partial<CareerOpening>) => {
  const careers = getCareers();
  const updated = careers.map(c => 
    c.id === id ? { ...c, ...career } : c
  );
  localStorage.setItem(CAREERS_KEY, JSON.stringify(updated));
};

export const deleteCareer = (id: string) => {
  const careers = getCareers();
  const updated = careers.filter(c => c.id !== id);
  localStorage.setItem(CAREERS_KEY, JSON.stringify(updated));
};

// ===== BANNER OPERATIONS =====
export const saveBanner = (banner: Omit<Banner, 'id' | 'created_at'>): Banner => {
  const banners = getBanners();
  const newBanner: Banner = {
    ...banner,
    id: Date.now().toString(),
    created_at: new Date(),
  };
  localStorage.setItem(BANNERS_KEY, JSON.stringify([newBanner, ...banners]));
  return newBanner;
};

export const getBanners = (): Banner[] => {
  try {
    const data = localStorage.getItem(BANNERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const getBannerById = (id: string): Banner | undefined => {
  const banners = getBanners();
  return banners.find(b => b.id === id);
};

export const updateBanner = (id: string, banner: Partial<Banner>) => {
  const banners = getBanners();
  const updated = banners.map(b => 
    b.id === id ? { ...b, ...banner } : b
  );
  localStorage.setItem(BANNERS_KEY, JSON.stringify(updated));
};

export const deleteBanner = (id: string) => {
  const banners = getBanners();
  const updated = banners.filter(b => b.id !== id);
  localStorage.setItem(BANNERS_KEY, JSON.stringify(updated));
};
