import React, { useState, useEffect } from 'react';
import { getSubmissions, markSubmissionAsRead, deleteSubmission, getBlogs, saveBlog, updateBlog, deleteBlog, getBlogById, getCareers, saveCareer, updateCareer, deleteCareer, getCareerById, getBanners, saveBanner, updateBanner, deleteBanner, getBannerById, getSettings, updateSettings, changeAdminPassword } from '../services/supabaseService';
import { BlogPost, CareerOpening, Banner } from '../types';
import { RichTextEditor } from '../components/RichTextEditor';
import { ToastContainer, ToastMessage, ToastType } from '../components/Toast';
import { AdminFooter } from '../components/AdminFooter';
import { generateSlug } from '../utils/slugGenerator';

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

export interface SiteSettings {
  id?: string;
  hero_enabled: boolean;
  services_enabled: boolean;
  testimonials_enabled: boolean;
  careers_enabled: boolean;
  blog_enabled: boolean;
  team_members: TeamMember[];
  updated_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
}

type TabType = 'dashboard' | 'messages' | 'blogs' | 'careers' | 'banners' | 'settings';

export const AdminDashboardNew: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'inquiry' | 'booking'>('all');
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Blogs
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
  });
  const [blogImagePreview, setBlogImagePreview] = useState('');

  // Careers
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

  // Banners
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [bannerForm, setBannerForm] = useState<Partial<Banner>>({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    is_active: true,
    delay_seconds: 3,
  });
  const [bannerImagePreview, setBannerImagePreview] = useState('');

  // Settings
  const [settings, setSettings] = useState<SiteSettings>({
    hero_enabled: true,
    services_enabled: true,
    testimonials_enabled: true,
    careers_enabled: true,
    blog_enabled: true,
    team_members: [],
  });
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({ name: '', position: '', image: '', bio: '' });

  // Password Change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const auth = sessionStorage.getItem('sq_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      loadAllData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      sessionStorage.setItem('sq_admin_auth', 'true');
      loadAllData();
      setPassword('');
      setLoginError('');
      addToast('Login successful!', 'success');
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginModal(true);
    sessionStorage.removeItem('sq_admin_auth');
    setPassword('');
    setSidebarOpen(false);
  };

  const loadAllData = async () => {
    try {
      const [submissionsData, blogsData, careersData, bannersData, settingsData] = await Promise.all([
        getSubmissions(),
        getBlogs(),
        getCareers(),
        getBanners(),
        getSettings(),
      ]);
      setMessages(submissionsData as Message[]);
      setBlogs(blogsData);
      setCareers(careersData);
      setBanners(bannersData as Banner[]);
      if (settingsData) {
        setSettings(settingsData[0] || settings);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      addToast('Failed to load data', 'error');
    }
  };

  // MESSAGES HANDLERS
  const handleDeleteMessage = async (id: string) => {
    if (confirm('Permanently delete this message?')) {
      try {
        await deleteSubmission(id);
        setMessages(messages.filter(m => m.id !== id));
        addToast('Message deleted successfully', 'success');
      } catch (error) {
        addToast('Error deleting message', 'error');
      }
    }
  };

  const handleToggleRead = async (id: string) => {
    try {
      await markSubmissionAsRead(id);
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: !m.is_read } : m));
    } catch (error) {
      addToast('Error updating message', 'error');
    }
  };

  // BLOG HANDLERS
  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.content) {
      addToast('Please fill in title and content', 'warning');
      return;
    }

    try {
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
      await loadAllData();
      resetBlogForm();
    } catch (error) {
      addToast('Error saving blog post', 'error');
    }
  };

  const handleEditBlog = async (id: string) => {
    try {
      const blog = await getBlogById(id);
      if (blog) {
        setBlogForm(blog);
        setBlogImagePreview(blog.cover_image || '');
        setEditingBlogId(id);
        setActiveTab('blogs');
      }
    } catch (error) {
      addToast('Error loading blog post', 'error');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Delete this blog post permanently?')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(b => b.id !== id));
        addToast('Blog post deleted successfully', 'success');
      } catch (error) {
        addToast('Error deleting blog post', 'error');
      }
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
    });
    setBlogImagePreview('');
    setEditingBlogId(null);
  };

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
      await loadAllData();
      resetCareerForm();
    } catch (error) {
      addToast('Error saving career opening', 'error');
    }
  };

  const handleEditCareer = async (id: string) => {
    try {
      const career = await getCareerById(id);
      if (career) {
        setCareerForm(career);
        setEditingCareerId(id);
        setActiveTab('careers');
      }
    } catch (error) {
      addToast('Error loading career opening', 'error');
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (confirm('Delete this career opening permanently?')) {
      try {
        await deleteCareer(id);
        setCareers(careers.filter(c => c.id !== id));
        addToast('Career opening deleted successfully', 'success');
      } catch (error) {
        addToast('Error deleting career opening', 'error');
      }
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

  // BANNER HANDLERS
  const handleSaveBanner = async () => {
    if (!bannerForm.title) {
      addToast('Please fill in banner title', 'warning');
      return;
    }

    try {
      // Ensure order is set for new banners
      const bannerToSave = {
        ...bannerForm,
        order: bannerForm.order || banners.length + 1,
      };

      console.log('🔵 Saving banner:', bannerToSave);

      if (editingBannerId) {
        const result = await updateBanner(editingBannerId, bannerToSave);
        console.log('✏️ Update result:', result);
        if (result.success) {
          addToast('Banner updated successfully', 'success');
        } else {
          addToast(`Error updating: ${result.message}`, 'error');
          console.error('Update failed:', result.message);
          return;
        }
      } else {
        const result = await saveBanner(bannerToSave as Omit<Banner, 'id' | 'created_at'>);
        console.log('✅ Save result:', result);
        if (result.success) {
          addToast('Banner created successfully', 'success');
        } else {
          addToast(`Error creating: ${result.message}`, 'error');
          console.error('Create failed:', result.message);
          return;
        }
      }
      
      console.log('🔄 Loading all data...');
      await loadAllData();
      console.log('📊 Data loaded, banners:', banners);
      resetBannerForm();
    } catch (error) {
      console.error('❌ Banner save error:', error);
      addToast(`Error saving banner: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  };

  const handleEditBanner = async (id: string) => {
    try {
      const banner = await getBannerById(id);
      if (banner) {
        setBannerForm(banner);
        setBannerImagePreview(banner.image_url || '');
        setEditingBannerId(id);
        setActiveTab('banners');
      }
    } catch (error) {
      addToast('Error loading banner', 'error');
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm('Delete this banner permanently?')) {
      try {
        await deleteBanner(id);
        setBanners(banners.filter(b => b.id !== id));
        addToast('Banner deleted successfully', 'success');
      } catch (error) {
        addToast('Error deleting banner', 'error');
      }
    }
  };

  const resetBannerForm = () => {
    setBannerForm({
      title: '',
      description: '',
      image_url: '',
      link_url: '',
      is_active: true,
      delay_seconds: 3,
      order: banners.length + 1,
    });
    setBannerImagePreview('');
    setEditingBannerId(null);
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

  // SETTINGS HANDLERS
  const handleUpdateSettings = async () => {
    setLoadingSettings(true);
    try {
      await updateSettings(settings);
      addToast('Settings updated successfully', 'success');
    } catch (error) {
      addToast('Error updating settings', 'error');
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.position) {
      addToast('Please fill in name and position', 'warning');
      return;
    }
    const member: TeamMember = {
      id: Date.now().toString(),
      ...newTeamMember,
    };
    setSettings({
      ...settings,
      team_members: [...(settings.team_members || []), member],
    });
    setNewTeamMember({ name: '', position: '', image: '', bio: '' });
    addToast('Team member added', 'success');
  };

  const handleRemoveTeamMember = (id: string) => {
    setSettings({
      ...settings,
      team_members: (settings.team_members || []).filter(m => m.id !== id),
    });
    addToast('Team member removed', 'success');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      addToast('All password fields are required', 'warning');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast('New passwords do not match', 'warning');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      addToast('Password must be at least 8 characters', 'warning');
      return;
    }

    if (passwordForm.currentPassword !== 'admin123') {
      addToast('Current password is incorrect', 'error');
      return;
    }

    try {
      // Update password in session (in a real app, this would go to backend)
      sessionStorage.setItem('admin_password', btoa(passwordForm.newPassword));
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordModal(false);
      addToast('Password changed successfully!', 'success');
    } catch (error) {
      addToast('Error changing password', 'error');
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'all') return true;
    const isBooking = m.subject.toLowerCase().includes('booking');
    return filter === 'booking' ? isBooking : !isBooking;
  });

  if (!isAuthenticated || showLoginModal) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
              <span className="material-icons text-primary text-4xl">shield_admin</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-slate-400">Enter your admin password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                autoFocus
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-slate-500 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loginError && <p className="text-red-400 text-sm mt-2 font-bold">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition active:scale-95"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <ToastContainer messages={toasts} onClose={removeToast} />

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 h-16 flex items-center px-4 gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:text-primary transition"
        >
          <span className="material-icons">menu</span>
        </button>
        <h1 className="text-white font-bold text-lg flex-1">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 transition"
        >
          <span className="material-icons">logout</span>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 md:top-0 left-0 w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/10 p-6 overflow-y-auto transition-transform duration-300 z-30 md:z-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-slate-400 text-xs mt-1">Content Management</p>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard' as TabType, label: 'Dashboard', icon: 'dashboard' },
            { id: 'messages' as TabType, label: 'Messages', icon: 'mail' },
            { id: 'blogs' as TabType, label: 'Blog Posts', icon: 'article' },
            { id: 'careers' as TabType, label: 'Careers', icon: 'work' },
            { id: 'banners' as TabType, label: 'Banners', icon: 'image' },
            { id: 'settings' as TabType, label: 'Settings', icon: 'settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                activeTab === item.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className="material-icons text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 mt-8 pt-8 space-y-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 transition text-left"
          >
            <span className="material-icons text-lg">lock</span>
            <span className="font-medium">Change Password</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition text-left"
          >
            <span className="material-icons text-lg">logout</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8 flex-grow">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-black text-white">Dashboard</h1>
                <p className="text-slate-400 mt-2">Welcome to your admin control panel</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Messages', value: messages.length, icon: 'mail', color: 'bg-blue-500/20 text-blue-400' },
                { label: 'Blog Posts', value: blogs.length, icon: 'article', color: 'bg-purple-500/20 text-purple-400' },
                { label: 'Career Openings', value: careers.length, icon: 'work', color: 'bg-green-500/20 text-green-400' },
                { label: 'Active Banners', value: banners.filter(b => b.is_active).length, icon: 'image', color: 'bg-orange-500/20 text-orange-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                    <span className="material-icons">{stat.icon}</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Messages */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-icons">mail_outline</span>
                Recent Messages
              </h2>
              {messages.slice(0, 5).length === 0 ? (
                <p className="text-slate-400 text-center py-8">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition">
                      <div className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {msg.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{msg.name}</p>
                        <p className="text-slate-400 text-xs truncate">{msg.message.substring(0, 60)}...</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${msg.is_read ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {msg.is_read ? 'Read' : 'New'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setActiveTab('messages')}
                className="mt-4 w-full py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition font-medium"
              >
                View All Messages
              </button>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h1 className="text-4xl font-black text-white">Messages</h1>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                {(['all', 'inquiry', 'booking'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                      filter === f
                        ? 'bg-primary text-white'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'inquiry' ? 'Inquiries' : 'Bookings'} ({
                      filter === 'all' ? messages.length : filter === 'inquiry' ? messages.filter(m => !m.subject.toLowerCase().includes('booking')).length : messages.filter(m => m.subject.toLowerCase().includes('booking')).length
                    })
                  </button>
                ))}
              </div>
              <button
                onClick={() => loadAllData()}
                disabled={loadingMessages}
                className="bg-primary/20 hover:bg-primary/30 text-primary disabled:opacity-50 px-4 py-2.5 rounded-lg font-bold transition flex items-center gap-2"
              >
                <span className={`material-icons ${loadingMessages ? 'animate-spin' : ''}`}>refresh</span>
                Refresh
              </button>
            </div>

            {filteredMessages.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <span className="material-icons text-slate-400 text-6xl block mb-4">mail_outline</span>
                <h3 className="text-2xl font-bold text-white">No Messages</h3>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-primary/30 transition"
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                          <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold w-fit ${msg.is_read ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {msg.is_read ? '✓ Read' : '○ New'}
                          </span>
                        </div>
                        <div className="space-y-2 text-slate-400 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <span className="material-icons text-xs">email</span>
                            <a href={`mailto:${msg.email}`} className="hover:text-primary transition">{msg.email}</a>
                          </div>
                          {msg.phone && (
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-xs">phone</span>
                              <a href={`tel:${msg.phone}`} className="hover:text-primary transition">{msg.phone}</a>
                            </div>
                          )}
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-slate-200 italic">
                          "{msg.message}"
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto md:flex-col">
                        <button
                          onClick={() => window.open(`mailto:${msg.email}`)}
                          title="Reply"
                          className="flex-1 md:w-12 md:h-12 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg flex items-center justify-center transition"
                        >
                          <span className="material-icons">mail</span>
                        </button>
                        <button
                          onClick={() => handleToggleRead(msg.id)}
                          title={msg.is_read ? 'Mark unread' : 'Mark read'}
                          className={`flex-1 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition ${msg.is_read ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
                        >
                          <span className="material-icons">{msg.is_read ? 'check_circle' : 'radio_button_unchecked'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          title="Delete"
                          className="flex-1 md:w-12 md:h-12 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center transition"
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
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-4xl font-black text-white">Blog Posts</h1>
              {editingBlogId && (
                <button
                  onClick={resetBlogForm}
                  className="px-4 py-2 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 rounded-lg transition"
                >
                  ✕ Cancel Edit
                </button>
              )}
            </div>

            {/* Blog Form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {editingBlogId ? '✏️ Edit Blog Post' : '✚ New Blog Post'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={blogForm.title || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={blogForm.author || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Category"
                  value={blogForm.category || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.published || false}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20"
                  />
                  <span className="text-white font-medium">Publish Immediately</span>
                </label>
              </div>

              <textarea
                placeholder="Excerpt (short summary)"
                value={blogForm.excerpt || ''}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <div>
                <label className="block text-white font-bold mb-3">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBlogImageUpload}
                  className="w-full p-2 border-2 border-dashed border-white/20 rounded-lg text-slate-400 cursor-pointer hover:border-primary/50 transition"
                />
                {blogImagePreview && (
                  <img
                    src={blogImagePreview}
                    alt="Preview"
                    className="mt-4 w-full max-h-48 object-cover rounded-lg border border-white/10"
                  />
                )}
              </div>

              <div>
                <label className="block text-white font-bold mb-3">Content</label>
                <textarea
                  placeholder="Write your blog content here..."
                  value={blogForm.content || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  rows={10}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveBlog}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition active:scale-95"
                >
                  {editingBlogId ? 'Update Blog' : 'Create Blog'}
                </button>
                {editingBlogId && (
                  <button
                    onClick={resetBlogForm}
                    className="px-6 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 rounded-lg font-bold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Blog List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Published Blogs ({blogs.length})</h2>
              {blogs.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
                  <span className="material-icons text-slate-400 text-5xl block mb-4">article</span>
                  <p className="text-slate-400">No blog posts yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{blog.title}</h3>
                          <p className="text-slate-400 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                          <div className="flex gap-3 flex-wrap">
                            <span className="px-3 py-1 bg-primary/20 text-primary rounded text-xs font-bold">{blog.category}</span>
                            <span className="px-3 py-1 bg-slate-500/20 text-slate-300 rounded text-xs font-bold">By {blog.author}</span>
                            {blog.published && <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold">Published</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button
                            onClick={() => handleEditBlog(blog.id)}
                            className="flex-1 md:flex-none px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-sm">edit</span>
                            <span className="md:hidden">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="flex-1 md:flex-none px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-sm">delete</span>
                            <span className="md:hidden">Delete</span>
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

        {/* CAREERS TAB */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-4xl font-black text-white">Career Openings</h1>
              {editingCareerId && (
                <button
                  onClick={resetCareerForm}
                  className="px-4 py-2 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 rounded-lg transition"
                >
                  ✕ Cancel Edit
                </button>
              )}
            </div>

            {/* Career Form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {editingCareerId ? '✏️ Edit Career Opening' : '✚ New Career Opening'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={careerForm.title || ''}
                  onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={careerForm.department || ''}
                  onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                  value={careerForm.type || 'Full-time'}
                  onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value as 'Full-time' | 'Contract' | 'Internship' })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={careerForm.location || ''}
                  onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <textarea
                placeholder="Job Description"
                value={careerForm.description || ''}
                onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <div>
                <label className="block text-white font-bold mb-3">Requirements (one per line)</label>
                <textarea
                  placeholder="Enter requirements, each on a new line"
                  value={Array.isArray(careerForm.requirements) ? careerForm.requirements.join('\n') : ''}
                  onChange={(e) => setCareerForm({
                    ...careerForm,
                    requirements: e.target.value.split('\n').filter(r => r.trim() !== '')
                  })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveCareer}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition active:scale-95"
                >
                  {editingCareerId ? 'Update Career Opening' : 'Create Career Opening'}
                </button>
                {editingCareerId && (
                  <button
                    onClick={resetCareerForm}
                    className="px-6 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 rounded-lg font-bold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Career List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Active Career Openings ({careers.length})</h2>
              {careers.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
                  <span className="material-icons text-slate-400 text-5xl block mb-4">work_outline</span>
                  <p className="text-slate-400">No career openings yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {careers.map((career) => (
                    <div key={career.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{career.title}</h3>
                          <p className="text-slate-400 text-sm mb-3 line-clamp-2">{career.description}</p>
                          <div className="flex gap-3 flex-wrap">
                            <span className="px-3 py-1 bg-primary/20 text-primary rounded text-xs font-bold">{career.type}</span>
                            <span className="px-3 py-1 bg-slate-500/20 text-slate-300 rounded text-xs font-bold">{career.department}</span>
                            <span className="px-3 py-1 bg-secondary/20 text-secondary rounded text-xs font-bold">📍 {career.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button
                            onClick={() => handleEditCareer(career.id)}
                            className="flex-1 md:flex-none px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-sm">edit</span>
                            <span className="md:hidden">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCareer(career.id)}
                            className="flex-1 md:flex-none px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-sm">delete</span>
                            <span className="md:hidden">Delete</span>
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

        {/* BANNERS TAB */}
        {activeTab === 'banners' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-4xl font-black text-white">Banners & Popups</h1>
              {editingBannerId && (
                <button
                  onClick={resetBannerForm}
                  className="px-4 py-2 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 rounded-lg transition"
                >
                  ✕ Cancel Edit
                </button>
              )}
            </div>

            {/* Banner Form */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-white">
                {editingBannerId ? '✏️ Edit Banner' : '✚ New Banner'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Banner Title"
                  value={bannerForm.title || ''}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div>
                  <label className="block text-white text-sm font-bold mb-2">Delay Before Showing (seconds)</label>
                  <input
                    type="number"
                    min="0"
                    value={bannerForm.delay_seconds || 3}
                    onChange={(e) => setBannerForm({ ...bannerForm, delay_seconds: parseInt(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <textarea
                placeholder="Banner Description"
                value={bannerForm.description || ''}
                onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <input
                type="url"
                placeholder="Link URL (optional)"
                value={bannerForm.link_url || ''}
                onChange={(e) => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <div>
                <label className="block text-white font-bold mb-3">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageUpload}
                  className="w-full p-2 border-2 border-dashed border-white/20 rounded-lg text-slate-400 cursor-pointer hover:border-primary/50 transition"
                />
                {bannerImagePreview && (
                  <img
                    src={bannerImagePreview}
                    alt="Preview"
                    className="mt-4 w-full max-h-48 object-cover rounded-lg border border-white/10"
                  />
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bannerForm.is_active || false}
                  onChange={(e) => setBannerForm({ ...bannerForm, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20"
                />
                <span className="text-white font-medium">Active (will be displayed on site)</span>
              </label>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveBanner}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition active:scale-95"
                >
                  {editingBannerId ? 'Update Banner' : 'Create Banner'}
                </button>
                {editingBannerId && (
                  <button
                    onClick={resetBannerForm}
                    className="px-6 bg-slate-500/20 text-slate-300 hover:bg-slate-500/30 rounded-lg font-bold transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Banner List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Banners ({banners.length})</h2>
              {banners.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
                  <span className="material-icons text-slate-400 text-5xl block mb-4">image_not_supported</span>
                  <p className="text-slate-400">No banners yet</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {banners.map((banner) => (
                    <div key={banner.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{banner.title}</h3>
                          <p className="text-slate-400 text-sm mb-3">{banner.description}</p>
                          <div className="flex gap-3 flex-wrap">
                            {banner.is_active ? (
                              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-bold">🟢 Active</span>
                            ) : (
                              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">🔴 Inactive</span>
                            )}
                            <span className="px-3 py-1 bg-slate-500/20 text-slate-300 rounded text-xs font-bold">⏱️ {banner.delay_seconds || 0}s delay</span>
                            {banner.link_url && <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-bold">🔗 Has Link</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button
                            onClick={() => handleEditBanner(banner.id!)}
                            className="flex-1 md:flex-none px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-sm">edit</span>
                            <span className="md:hidden">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBanner(banner.id!)}
                            className="flex-1 md:flex-none px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <span className="material-icons text-sm">delete</span>
                            <span className="md:hidden">Delete</span>
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

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h1 className="text-4xl font-black text-white">Settings</h1>

            {/* Section Toggle */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-icons">toggle_on</span>
                Section Visibility
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'hero_enabled', label: 'Hero Section', icon: 'image' },
                  { key: 'services_enabled', label: 'Services', icon: 'handyman' },
                  { key: 'testimonials_enabled', label: 'Testimonials', icon: 'rate_review' },
                  { key: 'careers_enabled', label: 'Careers', icon: 'work' },
                  { key: 'blog_enabled', label: 'Blog', icon: 'article' },
                ].map((section) => (
                  <label key={section.key} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-white/20 transition">
                    <div className="flex-1 flex items-center gap-3">
                      <span className="material-icons text-primary">{section.icon}</span>
                      <span className="text-white font-medium">{section.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={(settings as any)[section.key] || false}
                      onChange={(e) => setSettings({
                        ...settings,
                        [section.key]: e.target.checked
                      })}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              <button
                onClick={handleUpdateSettings}
                disabled={loadingSettings}
                className="mt-6 w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
              >
                {loadingSettings ? 'Saving...' : 'Save Section Settings'}
              </button>
            </div>

            {/* Team Members */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="material-icons">people</span>
                Team Members
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Team Member Name"
                  value={newTeamMember.name}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  placeholder="Position/Title"
                  value={newTeamMember.position}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <textarea
                  placeholder="Bio (optional)"
                  value={newTeamMember.bio}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div>
                  <label className="block text-white text-sm font-bold mb-2">Photo URL or Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setNewTeamMember({ ...newTeamMember, image: event.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 border-2 border-dashed border-white/20 rounded-lg text-slate-400 cursor-pointer hover:border-primary/50 transition"
                  />
                </div>
                <button
                  onClick={handleAddTeamMember}
                  className="w-full bg-primary/20 hover:bg-primary/30 text-primary py-3 rounded-lg font-bold transition"
                >
                  + Add Team Member
                </button>
              </div>

              {/* Team List */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Current Team ({settings.team_members?.length || 0})</h3>
                {(settings.team_members || []).length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No team members added yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {settings.team_members?.map((member) => (
                      <div key={member.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex gap-4 items-start">
                          {member.image && (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="text-white font-bold">{member.name}</h4>
                            <p className="text-primary text-sm">{member.position}</p>
                            {member.bio && <p className="text-slate-400 text-xs mt-1 line-clamp-2">{member.bio}</p>}
                          </div>
                          <button
                            onClick={() => handleRemoveTeamMember(member.id)}
                            className="text-red-400 hover:text-red-300 transition p-2"
                          >
                            <span className="material-icons">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-bold mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter new password (min 8 characters)"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminDashboardNew;
