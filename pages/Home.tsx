import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, TEAM_MEMBERS, PROJECTS, COMPANY_INFO } from '../constants';
import { ServiceCard } from '../components/ServiceCard';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';
import { TeamMember, Project, BlogPost } from '../types';
import { getBlogs } from '../services/supabaseService';

interface HomeProps {
  onBookCall?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onBookCall = () => {} }) => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load featured blogs from Supabase
        const allBlogs = (await getBlogs()).filter(b => b.published).slice(0, 3);
        setBlogs(allBlogs);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();

    // Fetch live projects from API
    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api/projects`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) setProjects(data);
        })
        .catch(() => console.log('Using default projects'));
    } catch (e) {
      console.log('Using default projects');
    }

    // Fetch team from API
    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/api/team`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) setTeam(data);
        })
        .catch(() => console.log('Using default team'));
    } catch (e) {
      console.log('Using default team');
    }
  }, []);

  return (
    <div id="home">
      <Hero onBookCall={onBookCall} />

      {/* Who We Are Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="who-we-are">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">About SQ Consulting</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-gray-900">Who We Are</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are Nigeria's premier business consulting firm, dedicated to empowering growth-stage companies with world-class strategic advisory, data intelligence, and operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="material-icons text-primary text-2xl">flag</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-15">
                    {COMPANY_INFO.about.mission}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <span className="material-icons text-secondary text-2xl">visibility</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-15">
                    {COMPANY_INFO.about.vision}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20 group-hover:opacity-30 transition"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {COMPANY_INFO.about.values.map((value, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition group">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <span className="material-icons text-primary text-3xl">{value.icon}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{value.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-gray-900">Our Expertise</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive business solutions designed to drive growth, efficiency, and sustainable competitive advantage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-3 font-bold text-primary hover:text-secondary transition text-lg group">
              Explore All Services
              <span className="material-icons group-hover:translate-x-2 transition">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">Competitive Advantage</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-gray-900">Why Choose SQ Consulting</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_INFO.whyChooseUs.map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition shadow-lg">
                  <span className="material-icons text-white text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6">Featured Projects</h2>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Real results for real businesses. See how we've helped Nigerian companies achieve transformative growth.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project) => (
              <div key={project.id} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition group">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                    <span className="material-icons text-white text-3xl">business_center</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{project.client_name}</h3>
                    <p className="text-purple-200 text-sm">{project.industry}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                      <span className="material-icons text-sm">info</span>
                      Challenge
                    </h4>
                    <p className="text-purple-100 text-sm leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                      <span className="material-icons text-sm">emoji_objects</span>
                      Solution
                    </h4>
                    <p className="text-purple-100 text-sm leading-relaxed">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                      <span className="material-icons text-sm">trending_up</span>
                      Results
                    </h4>
                    <p className="text-purple-100 text-sm leading-relaxed font-medium">{project.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/success-stories" className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl">
              View All Success Stories
              <span className="material-icons">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">Meet The Team</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-gray-900">Expert Consultants</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our team of seasoned professionals brings decades of combined experience in strategy, finance, data, and digital transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition">
                          <span className="material-icons text-sm">business_center</span>
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition">
                          <span className="material-icons text-sm">email</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center gap-3 font-bold text-primary hover:text-secondary transition text-lg group">
              Learn More About Us
              <span className="material-icons group-hover:translate-x-2 transition">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Featured Blogs Section */}
      {blogs.length > 0 && (
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-wider uppercase text-sm">Insights & Knowledge</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 text-gray-900">Latest Blog Posts</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stay informed with insights on business strategy, data analytics, and digital transformation in the Nigerian market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-primary uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="font-medium">{blog.author}</span>
                      <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link to="/blog" className="inline-flex items-center gap-3 font-bold text-primary hover:text-secondary transition text-lg group bg-white px-8 py-4 rounded-xl border border-primary/20 hover:border-primary/50">
                View All Articles
                <span className="material-icons group-hover:translate-x-2 transition">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-3 text-secondary">50+</div>
              <div className="text-purple-200 text-sm md:text-base font-medium uppercase tracking-wider">Businesses Scaled</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-3 text-secondary">100%</div>
              <div className="text-purple-200 text-sm md:text-base font-medium uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-3 text-secondary">7+</div>
              <div className="text-purple-200 text-sm md:text-base font-medium uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-3 text-secondary">24/7</div>
              <div className="text-purple-200 text-sm md:text-base font-medium uppercase tracking-wider">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 rounded-lg text-secondary text-xs font-black uppercase tracking-widest mb-6">
              🚀 Limited Availability
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Schedule a free 30-minute consultation with our senior consultants. Let's discuss your challenges and explore how we can help you achieve breakthrough results.
            </p>
            <button
              onClick={onBookCall}
              className="inline-flex items-center gap-3 bg-secondary hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl transition transform hover:scale-105 text-lg"
            >
              <span className="material-icons">calendar_today</span>
              Book Free Consultation
            </button>
            <p className="text-sm text-gray-500 mt-6">No commitment required • Speak with senior consultants • Get actionable insights</p>
          </div>
        </div>
      </section>
    </div>
  );
};