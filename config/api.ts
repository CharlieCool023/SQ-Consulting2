// API Configuration
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://brand-refresh-sq.preview.emergentagent.com/api';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  me: `${API_BASE_URL}/auth/me`,
  
  // Settings
  settings: `${API_BASE_URL}/settings`,
  
  // Careers
  careersApply: `${API_BASE_URL}/careers/apply`,
  careersApplications: `${API_BASE_URL}/careers/applications`,
  
  // Blogs
  blogs: `${API_BASE_URL}/blogs`,
  blogComments: (blogId: string) => `${API_BASE_URL}/blogs/${blogId}/comments`,
  approveComment: (blogId: string, commentId: string) => `${API_BASE_URL}/blogs/${blogId}/comments/${commentId}/approve`,
  
  // Projects
  projects: `${API_BASE_URL}/projects`,
  project: (id: string) => `${API_BASE_URL}/projects/${id}`,
  
  // Team
  team: `${API_BASE_URL}/team`,
  teamMember: (id: string) => `${API_BASE_URL}/team/${id}`,
  
  // Bookings
  bookings: `${API_BASE_URL}/bookings`,
};
