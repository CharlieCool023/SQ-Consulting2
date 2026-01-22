import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

export const InsightsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        {/* Header */}
        <div className="mb-16">
          <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-4">Intellectual Capital</span>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-8">Latest <span className="text-primary">Insights.</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
            Thought leadership engineered to provide clarity in the complex Nigerian business landscape.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20 group relative rounded-[3rem] overflow-hidden shadow-2xl bg-white flex flex-col lg:flex-row">
          <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
            <img src={BLOG_POSTS[0].cover_image} className="w-full h-full object-cover group-hover:scale-105 transition duration-[2000ms]" alt={BLOG_POSTS[0].title} />
          </div>
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-6 w-fit">{BLOG_POSTS[0].category}</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors cursor-pointer">
              {BLOG_POSTS[0].title}
            </h2>
            <p className="text-gray-500 text-lg mb-8 line-clamp-2">{BLOG_POSTS[0].excerpt}</p>
            <div className="flex items-center gap-6 mt-auto pt-8 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="font-black text-gray-900 text-sm">{BLOG_POSTS[0].author}</span>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{BLOG_POSTS[0].created_at.toLocaleDateString()} • {BLOG_POSTS[0].readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div className="h-64 overflow-hidden relative">
                <img src={post.cover_image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={post.title} />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                  {post.category}
                </div>
              </div>
              <div className="p-10 flex flex-col h-full">
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 mb-8 line-clamp-3 font-medium">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.created_at.toLocaleDateString()}</span>
                  <span className="material-icons text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};