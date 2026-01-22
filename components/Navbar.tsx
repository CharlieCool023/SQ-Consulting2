import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onBookCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }
  }, [isOpen]);

  const isHome = location.pathname === '/';
  const isDarkText = scrolled || !isHome || isOpen;

  const navClass = `fixed w-full z-[200] transition-all duration-500 ${
    scrolled || isOpen ? 'bg-white shadow-xl py-2' : 'bg-transparent py-5'
  }`;

  const textClass = isDarkText ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-secondary';
  const logoTextClass = isDarkText ? 'text-primary' : 'text-white';
  const mottoClass = isDarkText ? 'text-secondary' : 'text-orange-300';

  const menuItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Services', path: '/services', icon: 'business_center' },
    { name: 'Blog', path: '/blog', icon: 'article' },
    { name: 'Results', path: '/success-stories', icon: 'auto_graph' },
    { name: 'About', path: '/about', icon: 'info' },
    { name: 'Contact', path: '/contact', icon: 'alternate_email' }
  ];

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 z-[210] group">
            <div className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden ${isDarkText ? 'bg-primary/10' : 'bg-white/10'}`}>
              <img src="/logo.png" alt="SQ Consulting" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className={`text-lg md:text-xl font-black tracking-tight transition-colors ${logoTextClass}`}>SQ</span>
              <span className={`text-xs md:text-sm font-bold tracking-widest transition-colors ${mottoClass}`}>CONSULTING</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-secondary after:transition-all hover:after:w-full ${textClass}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center z-[210]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${isOpen ? 'bg-primary text-white' : isDarkText ? 'text-primary bg-primary/5' : 'text-white bg-white/10'}`}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              <span className="material-icons text-3xl">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Solid High-Contrast Mobile Menu */}
      <div className={`fixed inset-0 z-[190] bg-white transition-all duration-500 ease-in-out lg:hidden flex flex-col ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="h-24 md:h-20 flex-shrink-0 border-b border-gray-100"></div>
          
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 overflow-y-auto pt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-3">
              <span className="w-6 h-px bg-gray-300"></span>
              Menu
            </p>
            <div className="flex flex-col space-y-0">
              {menuItems.map((item, idx) => (
                 <Link 
                  key={item.name}
                  to={item.path} 
                  className={`group flex items-center justify-between py-4 px-4 border-b border-gray-100 rounded-xl transition-all duration-500 hover:bg-gray-50 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                 >
                   <div className="flex items-center gap-5">
                     <span className="material-icons text-primary/50 text-2xl group-hover:text-primary transition-colors">{item.icon}</span>
                     <span className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-all">
                       {item.name}
                     </span>
                   </div>
                   <span className="material-icons text-gray-300 group-hover:text-primary transition-all transform group-hover:translate-x-2">arrow_forward</span>
                 </Link>
              ))}
            </div>

            <div className={`mt-8 mb-8 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="text-center text-gray-500 text-sm font-semibold">
                <p>Lagos, Nigeria</p>
                <p className="text-xs mt-1">📞 +234 (0) 123 456 7890</p>
              </div>
            </div>
          </div>
          
          <div className={`p-8 border-t border-gray-100 flex flex-col items-center bg-gradient-to-b from-white to-gray-50 transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
             <span className="font-script text-3xl text-secondary">Delivering Values...</span>
             <p className="text-gray-500 text-[10px] mt-3 font-bold uppercase tracking-[0.25em] flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
               Lagos, Nigeria • Scaling MSMEs
             </p>
          </div>
      </div>
    </nav>
  );
};