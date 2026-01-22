import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PolicyModal } from './PolicyModal';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const privacyContent = (
    <div className="space-y-4 text-sm md:text-base">
      <p className="font-bold text-gray-900">Effective Date: January 1, 2025</p>
      <p>At SQ Consulting, we value your privacy. This policy outlines how we handle your personal information when you use our website and services.</p>
      <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mt-6">1. Data We Collect</h4>
      <p>We collect information you provide directly through our contact and booking forms, including your name, email address, company name, and project details.</p>
      <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mt-6">2. How We Use Data</h4>
      <p>Your data is used solely to respond to inquiries, schedule strategy sessions, and provide our consulting services. We do not sell your data to third parties.</p>
    </div>
  );

  const termsContent = (
    <div className="space-y-4 text-sm md:text-base">
      <p className="font-bold text-gray-900">Last Updated: January 2025</p>
      <p>By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
      <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mt-6">1. Consulting Services</h4>
      <p>SQ Consulting provides strategic advisory services. Our recommendations are based on available data and professional expertise.</p>
      <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mt-6">2. Intellectual Property</h4>
      <p>All content including logos, text, and proprietary methodologies are the sole property of SQ Consulting.</p>
    </div>
  );

  return (
    <>
      <footer className="bg-primary-dark text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20">
            <div className="space-y-6 md:space-y-8 text-center sm:text-left">
              <Link to="/" className="flex items-center gap-2 md:gap-3 justify-center sm:justify-start">
                <div className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-2xl flex-shrink-0">
                  <img src="/logo.png" alt="SQ Consulting" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col hidden sm:block">
                  <span className="text-lg md:text-xl font-black tracking-tighter">SQ</span>
                  <span className="font-script text-secondary text-sm md:text-lg leading-none">CONSULTING</span>
                </div>
              </Link>
              <p className="text-purple-100/60 text-xs md:text-sm leading-relaxed max-w-xs font-medium italic mx-auto sm:mx-0">
                Strategic advisory engineered for the unique pressures of the Nigerian market.
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-secondary font-black mb-4 md:mb-8 tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Solutions</h4>
              <ul className="space-y-3 md:space-y-4 text-purple-100/50 text-xs md:text-sm font-bold uppercase tracking-widest">
                <li><Link to="/service/business-intelligence" className="hover:text-white transition">Data Analytics</Link></li>
                <li><Link to="/service/software-transition" className="hover:text-white transition">Digital Transformation</Link></li>
                <li><Link to="/service/accounting-operations" className="hover:text-white transition">Fiscal Strategy</Link></li>
                <li><Link to="/service/business-strategy" className="hover:text-white transition">Growth Engineering</Link></li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="text-secondary font-black mb-4 md:mb-8 tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Corporate</h4>
              <ul className="space-y-3 md:space-y-4 text-purple-100/50 text-xs md:text-sm font-bold uppercase tracking-widest">
                <li><Link to="/blog" className="hover:text-white transition">Blog & Insights</Link></li>
                <li><Link to="/success-stories" className="hover:text-white transition">Our Impact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About SQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Get in Touch</Link></li>
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8 text-center sm:text-left">
              <h4 className="text-secondary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">Connect</h4>
              <div className="space-y-3 md:space-y-4 text-xs md:text-sm text-purple-100/60 font-medium">
                <p className="flex items-center gap-3 justify-center sm:justify-start"><span className="material-icons text-secondary text-lg">location_on</span> Lagos, Nigeria</p>
                <p className="flex items-center gap-3 justify-center sm:justify-start"><span className="material-icons text-secondary text-lg">phone</span> 09037551127</p>
                <p className="flex items-center gap-3 break-all justify-center sm:justify-start"><span className="material-icons text-secondary text-lg flex-shrink-0">email</span> sqconsultinginc@gmail.com</p>
              </div>
              <div className="flex gap-4 justify-center sm:justify-start">
                {['linkedin', 'instagram', 'facebook'].map(platform => (
                  <a key={platform} href={`#${platform}`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary transition-all hover:-translate-y-1 border border-white/5">
                    <span className="material-icons text-lg">public</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
            <p className="text-purple-100/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] order-3 md:order-1 w-full md:w-auto">© 2025 SQ Consulting Group. All Rights Reserved.</p>
            <div className="flex gap-6 md:gap-10 text-purple-100/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] order-2">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition">Privacy</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition">Terms</button>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Privacy Policy" content={privacyContent} />
      <PolicyModal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Terms of Service" content={termsContent} />
    </>
  );
};