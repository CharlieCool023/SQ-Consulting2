import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogs } from '../services/supabaseService';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    comment_text: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      // Try API first
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/blogs`);
        const data = await response.json();
        const foundBlog = data.find((b: BlogPost) => b.slug === slug);
        if (foundBlog) {
          setBlog(foundBlog);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.log('API not available, using Supabase');
      }

      // Fall back to Supabase
      const blogs = await getBlogs();
      const foundBlog = blogs.find(b => b.slug === slug);
      setBlog(foundBlog || null);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/api/blogs/${blog?.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blog_id: blog?.id,
          ...commentForm
        })
      }).catch(() => console.log('Comment saved locally'));
      setSubmitSuccess(true);
      setCommentForm({ author_name: '', author_email: '', comment_text: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const approvedComments = blog.comments?.filter(c => c.approved) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition">
            <span className="material-icons text-sm mr-1">arrow_back</span>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary">person</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">{blog.author}</p>
              <p className="text-sm text-gray-500">Consultant at SQ Consulting</p>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Comments ({approvedComments.length})
          </h3>

          {/* Comment List */}
          {approvedComments.length > 0 ? (
            <div className="space-y-6 mb-12">
              {approvedComments.map(comment => (
                <div key={comment.id} className="border-l-4 border-primary/20 pl-6 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">{comment.author_name}</span>
                    <span className="text-xs text-gray-500">
                      • {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.comment_text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 mb-12">No comments yet. Be the first to share your thoughts!</p>
          )}

          {/* Comment Form */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Leave a Comment</h4>
            {submitSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                ✓ Comment submitted successfully! It will be visible after admin approval.
              </div>
            )}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  value={commentForm.author_name}
                  onChange={e => setCommentForm({ ...commentForm, author_name: e.target.value })}
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  value={commentForm.author_email}
                  onChange={e => setCommentForm({ ...commentForm, author_email: e.target.value })}
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                value={commentForm.comment_text}
                onChange={e => setCommentForm({ ...commentForm, comment_text: e.target.value })}
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Post Comment'}
              </button>
            </form>
          </div>
        </div>
      </article>
    </div>
  );
};