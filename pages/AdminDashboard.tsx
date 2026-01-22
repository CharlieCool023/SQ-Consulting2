import React, { useState, useEffect } from 'react';
import { getSubmissions, markSubmissionAsRead, deleteSubmission, getBlogs, saveBlog, updateBlog, deleteBlog, getBlogById, getCareers, saveCareer, updateCareer, deleteCareer, getCareerById, getBanners, saveBanner, updateBanner, deleteBanner, getBannerById } from '../services/supabaseService';
import { BlogPost, CareerOpening, Banner } from '../types';
import { AdminSettings } from './AdminSettings';
import { RichTextEditor } from '../components/RichTextEditor';
import { ToastContainer, ToastMessage, ToastType } from '../components/Toast';
import { generateSlug } from '../utils/slugGenerator';

// Message interface
export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

type TabType = 'messages' | 'blogs' | 'careers' | 'banners';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'inquiry' | 'booking'>('all');
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Blog state
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    cover_image: '',
    published: false,
    comments: [],
  });

  // Career state
  const [careers, setCareers] = useState<CareerOpening[]>([]);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [loadingCareers, setLoadingCareers] = useState(false);
  const [careerForm, setCareerForm] = useState<Partial<CareerOpening>>({
    title: '',
    department: '',
    type: 'Full-time',
    location: '',
    description: '',
    requirements: [],
  });

  // Banner state
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [bannerForm, setBannerForm] = useState<Partial<Banner>>({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    is_active: true,
    order: 0,
  });

  const [blogImagePreview, setBlogImagePreview] = useState<string>('');
  const [bannerImagePreview, setBannerImagePreview] = useState<string>('');

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const auth = sessionStorage.getItem('sq_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sq_admin_auth', 'true');
      loadAllData();
      setError('');
    } else {
      setError('Unauthorized Access');
    }
  };

  const loadAllData = async () => {
    try {
      setLoadingMessages(true);
      setLoadingBlogs(true);
      setLoadingCareers(true);
      setLoadingBanners(true);

      const [submissionsData, blogsData, careersData, bannersData] = await Promise.all([
        getSubmissions(),
        getBlogs(),
        getCareers(),
        getBanners(),
      ]);
      setMessages(submissionsData as Message[]);
      setBlogs(blogsData);
      setCareers(careersData);
      setBanners(bannersData as Banner[]);
    } catch (error) {
      console.error('Error loading data:', error);
      addToast('Failed to load data', 'error');
    } finally {
      setLoadingMessages(false);
      setLoadingBlogs(false);
      setLoadingCareers(false);
      setLoadingBanners(false);
    }
  };

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const data = await getSubmissions();
      setMessages(data as Message[]);
      addToast('Messages loaded', 'success');
    } catch (error) {
      console.error('Error loading messages:', error);
      addToast('Failed to load messages', 'error');
    } finally {
      setLoadingMessages(false);
    }
  };

  const loadBlogsData = async () => {
    try {
      setLoadingBlogs(true);
      const data = await getBlogs();
      setBlogs(data);
      addToast('Blogs loaded', 'success');
    } catch (error) {
      console.error('Error loading blogs:', error);
      addToast('Failed to load blogs', 'error');
    } finally {
      setLoadingBlogs(false);
    }
  };

  const loadCareersData = async () => {
    try {
      setLoadingCareers(true);
      const data = await getCareers();
      setCareers(data);
      addToast('Careers loaded', 'success');
    } catch (error) {
      console.error('Error loading careers:', error);
      addToast('Failed to load careers', 'error');
    } finally {
      setLoadingCareers(false);
    }
  };

  const loadBannersData = async () => {
    try {
      setLoadingBanners(true);
      const data = await getBanners();
      setBanners(data);
      addToast('Banners loaded', 'success');
    } catch (error) {
      console.error('Error loading banners:', error);
      addToast('Failed to load banners', 'error');
    } finally {
      setLoadingBanners(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sq_admin_auth');
    setPassword('');
  };

  // MESSAGE HANDLERS
  const handleDeleteMessage = async (id: string) => {
    if (confirm('Permanently delete this entry?')) {
      try {
        await deleteSubmission(id);
        const updated = await getSubmissions();
        setMessages(updated as Message[]);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleToggleRead = async (id: string) => {
    try {
      await markSubmissionAsRead(id);
      const updated = await getSubmissions();
      setMessages(updated as Message[]);
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // BLOG HANDLERS
  const handleSaveBlog = async () => {
    if (!blogForm.title) {
      addToast('Please fill in the blog title', 'warning');
      return;
    }

    try {
      // Auto-generate slug from title if not editing
      const blogToSave = {
        ...blogForm,
        slug: generateSlug(blogForm.title!),
      };

      if (editingBlogId) {
        await updateBlog(editingBlogId, blogToSave);
        addToast('Blog post updated successfully', 'success');
      } else {
        await saveBlog(blogToSave as Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>);
        addToast('Blog post created successfully', 'success');
      }
      const updated = await getBlogs();
      setBlogs(updated);
      resetBlogForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      addToast('Error saving blog post', 'error');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
      cover_image: '',
      published: false,
      comments: [],
    });
    setEditingBlogId(null);
  };

  const handleEditBlog = async (id: string) => {
    try {
      const blog = await getBlogById(id);
      if (blog) {
        setBlogForm(blog);
        setEditingBlogId(id);
      }
    } catch (error) {
      console.error('Error loading blog:', error);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Delete this blog post?')) {
      try {
        await deleteBlog(id);
        const updated = await getBlogs();
        setBlogs(updated);
        addToast('Blog post deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting blog:', error);
        addToast('Error deleting blog post', 'error');
      }
    }
  };

  // CAREER HANDLERS
  const handleSaveCareer = async () => {
    if (!careerForm.title || !careerForm.department || !careerForm.location) {
      addToast('Please fill in title, department, and location', 'warning');
      return;
    }

    try {
      if (editingCareerId) {
        await updateCareer(editingCareerId, careerForm);
        addToast('Career opening updated successfully', 'success');
      } else {
        await saveCareer(careerForm as Omit<CareerOpening, 'id'>);
        addToast('Career opening created successfully', 'success');
      }
      const updated = await getCareers();
      setCareers(updated);
      resetCareerForm();
    } catch (error) {
      console.error('Error saving career:', error);
      addToast('Error saving career opening', 'error');
    }
  };

  const resetCareerForm = () => {
    setCareerForm({
      title: '',
      department: '',
      type: 'Full-time',
      location: '',
      description: '',
      requirements: [],
    });
    setEditingCareerId(null);
  };

  const handleEditCareer = async (id: string) => {
    try {
      const career = await getCareerById(id);
      if (career) {
        setCareerForm(career);
        setEditingCareerId(id);
      }
    } catch (error) {
      console.error('Error loading career:', error);
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (confirm('Delete this career opening?')) {
      try {
        await deleteCareer(id);
        const updated = await getCareers();
        setCareers(updated);
        addToast('Career opening deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting career:', error);
        addToast('Error deleting career opening', 'error');
      }
    }
  };

  // IMAGE UPLOAD HANDLERS
  const handleBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setBlogForm({ ...blogForm, cover_image: base64 });
        setBlogImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setBannerForm({ ...bannerForm, image_url: base64 });
        setBannerImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // BANNER HANDLERS
  const handleSaveBanner = async () => {
    if (!bannerForm.title) {
      addToast('Please fill in banner title', 'warning');
      return;
    }

    try {
      if (editingBannerId) {
        await updateBanner(editingBannerId, bannerForm);
        addToast('Banner updated successfully', 'success');
      } else {
        await saveBanner(bannerForm as Omit<Banner, 'id' | 'created_at'>);
        addToast('Banner created successfully', 'success');
      }
      const updated = await getBanners();
      setBanners(updated);
      resetBannerForm();
    } catch (error) {
      console.error('Error saving banner:', error);
      addToast('Error saving banner', 'error');
    }
  };

  const resetBannerForm = () => {
    setBannerForm({
      title: '',
      description: '',
      image_url: '',
      link_url: '',
      is_active: true,
      order: 0,
    });
    setEditingBannerId(null);
  };

  const handleEditBanner = async (id: string) => {
    try {
      const banner = await getBannerById(id);
      if (banner) {
        setBannerForm(banner);
        setEditingBannerId(id);
      }
    } catch (error) {
      console.error('Error loading banner:', error);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm('Delete this banner?')) {
      try {
        await deleteBanner(id);
        const updated = await getBanners();
        setBanners(updated);
        addToast('Banner deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting banner:', error);
        addToast('Error deleting banner', 'error');
      }
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'all') return true;
    // Filter by subject to determine type
    const isBooking = m.subject.toLowerCase().includes('booking');
    return filter === 'booking' ? isBooking : !isBooking;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1a2745] to-[#0F172A] flex items-center justify-center p-6">
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 w-full max-w-md shadow-2xl animate-fade-in">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
              <span className="material-icons text-primary text-4xl">security</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h2>
            <p className="text-white/40 text-sm">Protected Access Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white text-center text-2xl tracking-[1em] focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-400 text-xs text-center font-bold uppercase tracking-widest animate-bounce">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition shadow-2xl active:scale-95">
              Verify Credentials
            </button>
            <div className="text-center pt-2">
              <a href="/forgot-password" className="text-secondary hover:text-secondary/80 text-sm font-medium transition">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
      <ToastContainer messages={toasts} onClose={removeToast} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tight">Admin Control</h1>
            <p className="text-slate-400 mt-2 font-medium">Manage all site content and communications</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="bg-slate-600/20 hover:bg-slate-600/30 text-slate-200 px-6 py-3 rounded-xl border border-slate-400/30 transition flex items-center gap-2"
            >
              <span className="material-icons">settings</span>
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-200 px-6 py-3 rounded-xl border border-red-400/30 transition flex items-center gap-2"
            >
              <span className="material-icons">logout</span>
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'messages' as TabType, label: 'Messages', icon: 'mail' },
            { id: 'blogs' as TabType, label: 'Blog Posts', icon: 'article' },
            { id: 'careers' as TabType, label: 'Careers', icon: 'work' },
            { id: 'banners' as TabType, label: 'Banners', icon: 'image' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="material-icons text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 bg-white/5 p-2 rounded-xl border border-white/10 w-fit">
                {(['all', 'inquiry', 'booking'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      filter === f
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}s
                  </button>
                ))}
              </div>
              <button
                onClick={loadMessages}
                disabled={loadingMessages}
                className="bg-primary/20 hover:bg-primary/30 text-primary disabled:opacity-50 px-4 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
              >
                <span className={`material-icons ${loadingMessages ? 'animate-spin' : ''}`}>refresh</span>
                Refresh
              </button>
            </div>

            {filteredMessages.length === 0 ? (
              <div className="text-center py-32 bg-white/5 rounded-2xl border border-white/10">
                <span className="material-icons text-slate-400 text-7xl mb-6">mail_outline</span>
                <h3 className="text-2xl font-bold text-white">No Messages</h3>
                <p className="text-slate-400">The inbox is currently empty.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`group bg-white/5 backdrop-blur rounded-2xl p-6 border transition-all duration-300 ${
                      !msg.is_read ? 'border-primary/50 bg-primary/5' : 'border-white/10'
                    } hover:border-primary/30 hover:bg-white/10`}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${msg.subject.toLowerCase().includes('booking') ? 'bg-secondary/80' : 'bg-primary/80'}`}>
                            {msg.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                              {msg.subject.toLowerCase().includes('booking') ? '📅 Booking' : '❓ Inquiry'} • {new Date(msg.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3 text-slate-300">
                          <div className="flex items-center gap-3">
                            <span className="material-icons text-sm text-slate-400">email</span>
                            <span>{msg.email}</span>
                          </div>
                          {msg.phone && (
                            <div className="flex items-center gap-3">
                              <span className="material-icons text-sm text-slate-400">phone</span>
                              <span>{msg.phone}</span>
                            </div>
                          )}
                          <div className="bg-white/5 p-4 rounded-xl text-slate-200 italic border border-white/10 mt-4">
                            "{msg.message}"
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                        <button
                          onClick={() => window.open(`mailto:${msg.email}`)}
                          className="flex-1 md:w-12 md:h-12 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg flex items-center justify-center transition"
                          title="Reply"
                        >
                          <span className="material-icons">send</span>
                        </button>
                        <button
                          onClick={() => handleToggleRead(msg.id)}
                          className={`flex-1 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition ${
                            msg.is_read
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-white/10 text-slate-400 hover:bg-white/20'
                          }`}
                          title={msg.is_read ? 'Mark unread' : 'Mark read'}
                        >
                          <span className="material-icons">{msg.is_read ? 'check_circle' : 'radio_button_unchecked'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="flex-1 md:w-12 md:h-12 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center transition"
                          title="Delete"
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === 'blogs' && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={loadBlogsData}
                disabled={loadingBlogs}
                className="bg-primary/20 hover:bg-primary/30 text-primary disabled:opacity-50 px-4 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
              >
                <span className={`material-icons ${loadingBlogs ? 'animate-spin' : ''}`}>refresh</span>
                Refresh
              </button>
            </div>

            {/* Blog Form */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingBlogId ? 'Edit Blog Post' : 'New Blog Post'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={blogForm.title || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={blogForm.author || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Category"
                  value={blogForm.category || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <textarea
                placeholder="Excerpt"
                value={blogForm.excerpt || ''}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
              />

              <div className="mb-6">
                <label className="text-white text-sm font-bold mb-3 block">Full Content</label>
                <RichTextEditor
                  value={blogForm.content || ''}
                  onChange={(value) => setBlogForm({ ...blogForm, content: value })}
                  placeholder="Write your blog content here..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-bold mb-3">Cover Image</label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition bg-white/5">
                    <div className="text-center">
                      <span className="material-icons text-primary text-4xl mb-2">cloud_upload</span>
                      <span className="text-white text-sm font-bold">Upload Image</span>
                      <span className="text-slate-400 text-xs block mt-1">or drag and drop</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageUpload}
                      className="hidden"
                    />
                  </label>
                  {blogImagePreview && (
                    <img
                      src={blogImagePreview}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg mt-3 border border-white/10"
                    />
                  )}
                </div>
                <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-6 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={blogForm.published || false}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-white font-medium">Publish Now</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveBlog}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition"
                >
                  {editingBlogId ? 'Update Post' : 'Create Post'}
                </button>
                {editingBlogId && (
                  <button
                    onClick={resetBlogForm}
                    className="px-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Blog List */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Existing Posts</h2>
              {blogs.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <span className="material-icons text-slate-400 text-6xl mb-4">article</span>
                  <p className="text-slate-400">No blog posts yet. Create one above!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-primary/30 transition flex flex-col md:flex-row items-start justify-between gap-6"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                        <p className="text-slate-400 text-sm mb-3">{blog.excerpt}</p>
                        <div className="flex gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">{blog.category}</span>
                          <span className="px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs">{blog.author}</span>
                          {blog.published && <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">Published</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() => handleEditBlog(blog.id)}
                          className="flex-1 md:flex-none bg-primary/20 hover:bg-primary/40 text-primary py-2 px-4 rounded-lg transition font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="flex-1 md:flex-none bg-red-500/20 hover:bg-red-500/40 text-red-400 py-2 px-4 rounded-lg transition font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CAREERS TAB */}
        {activeTab === 'careers' && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={loadCareersData}
                disabled={loadingCareers}
                className="bg-primary/20 hover:bg-primary/30 text-primary disabled:opacity-50 px-4 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
              >
                <span className={`material-icons ${loadingCareers ? 'animate-spin' : ''}`}>refresh</span>
                Refresh
              </button>
            </div>

            {/* Career Form */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingCareerId ? 'Edit Career Opening' : 'New Career Opening'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={careerForm.title || ''}
                  onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={careerForm.department || ''}
                  onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <select
                  value={careerForm.type || 'Full-time'}
                  onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value as any })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Full-time" className="bg-slate-900">Full-time</option>
                  <option value="Contract" className="bg-slate-900">Contract</option>
                  <option value="Internship" className="bg-slate-900">Internship</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={careerForm.location || ''}
                  onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <textarea
                placeholder="Job Description"
                value={careerForm.description || ''}
                onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
              />

              {/* Requirements */}
              <div className="mb-6">
                <label className="text-white font-bold mb-3 block">Requirements</label>
                <div>
                  <RichTextEditor
                    value={(careerForm.requirements || []).join('<br>')}
                    onChange={(value) => {
                      const reqs = value.split(/<br\s*\/?>/gi).filter(r => r.trim());
                      setCareerForm({ ...careerForm, requirements: reqs });
                    }}
                    placeholder="List the job requirements. You can use bullet points, numbering, bold, italic, etc."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveCareer}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition"
                >
                  {editingCareerId ? 'Update Opening' : 'Create Opening'}
                </button>
                {editingCareerId && (
                  <button
                    onClick={resetCareerForm}
                    className="px-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Career List */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Active Openings</h2>
              {careers.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <span className="material-icons text-slate-400 text-6xl mb-4">work_outline</span>
                  <p className="text-slate-400">No career openings yet. Create one above!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {careers.map((career) => (
                    <div
                      key={career.id}
                      className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-primary/30 transition flex flex-col md:flex-row items-start justify-between gap-6"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{career.title}</h3>
                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{career.description}</p>
                        <div className="flex gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">{career.department}</span>
                          <span className="px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs">{career.type}</span>
                          <span className="px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs">📍 {career.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() => handleEditCareer(career.id)}
                          className="flex-1 md:flex-none bg-primary/20 hover:bg-primary/40 text-primary py-2 px-4 rounded-lg transition font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCareer(career.id)}
                          className="flex-1 md:flex-none bg-red-500/20 hover:bg-red-500/40 text-red-400 py-2 px-4 rounded-lg transition font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* BANNERS TAB */}
        {activeTab === 'banners' && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={loadBannersData}
                disabled={loadingBanners}
                className="bg-primary/20 hover:bg-primary/30 text-primary disabled:opacity-50 px-4 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
              >
                <span className={`material-icons ${loadingBanners ? 'animate-spin' : ''}`}>refresh</span>
                Refresh
              </button>
            </div>

            {/* Banner Form */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingBannerId ? 'Edit Banner' : 'New Banner'}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Banner Title"
                  value={bannerForm.title || ''}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="number"
                  placeholder="Display Order"
                  value={bannerForm.order || 0}
                  onChange={(e) => setBannerForm({ ...bannerForm, order: parseInt(e.target.value) })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <textarea
                placeholder="Banner Description"
                value={bannerForm.description || ''}
                onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
              />

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white text-sm font-bold mb-3">Banner Image</label>
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition bg-white/5">
                    <div className="text-center">
                      <span className="material-icons text-primary text-4xl mb-2">cloud_upload</span>
                      <span className="text-white text-sm font-bold">Upload Image</span>
                      <span className="text-slate-400 text-xs block mt-1">or drag and drop</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageUpload}
                      className="hidden"
                    />
                  </label>
                  {bannerImagePreview && (
                    <img
                      src={bannerImagePreview}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg mt-3 border border-white/10"
                    />
                  )}
                </div>
                <input
                  type="url"
                  placeholder="Link URL"
                  value={bannerForm.link_url || ''}
                  onChange={(e) => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <label className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:bg-white/10 transition mb-6">
                <input
                  type="checkbox"
                  checked={bannerForm.is_active || false}
                  onChange={(e) => setBannerForm({ ...bannerForm, is_active: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-white font-medium">Active</span>
              </label>

              {bannerImagePreview && (
                <div className="mb-6">
                  <p className="text-slate-400 text-sm mb-2">Preview:</p>
                  <img
                    src={bannerImagePreview}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-xl border border-white/10"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSaveBanner}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition"
                >
                  {editingBannerId ? 'Update Banner' : 'Create Banner'}
                </button>
                {editingBannerId && (
                  <button
                    onClick={resetBannerForm}
                    className="px-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Banner List */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Current Banners</h2>
              {banners.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <span className="material-icons text-slate-400 text-6xl mb-4">image_not_supported</span>
                  <p className="text-slate-400">No banners yet. Create one above!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {banners.map((banner) => (
                    <div
                      key={banner.id}
                      className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-primary/30 transition"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {banner.image_url && (
                          <img
                            src={banner.image_url}
                            alt={banner.title}
                            className="w-full md:w-40 h-32 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{banner.title}</h3>
                          <p className="text-slate-400 text-sm mb-3">{banner.description}</p>
                          <div className="flex gap-3 flex-wrap">
                            {banner.is_active && <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">Active</span>}
                            <span className="px-3 py-1 bg-white/10 text-slate-300 rounded-full text-xs">Order: {banner.order}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button
                            onClick={() => banner.id && handleEditBanner(banner.id)}
                            className="flex-1 md:flex-none bg-primary/20 hover:bg-primary/40 text-primary py-2 px-4 rounded-lg transition font-bold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => banner.id && handleDeleteBanner(banner.id)}
                            className="flex-1 md:flex-none bg-red-500/20 hover:bg-red-500/40 text-red-400 py-2 px-4 rounded-lg transition font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <AdminSettings
            onClose={() => setShowSettings(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};