import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onBookCall: () => void;
}

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
    title: "Strategy Engineered for Nigerian Growth",
    subtitle: "Bridging the gap between vision and operational excellence for modern enterprises.",
    align: "center"
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', // Replaced broken image with diverse professional team
    title: "Intelligence Driven by Your Reality",
    subtitle: "Don't guess. Know. Transform raw data into competitive advantages that win.",
    align: "left"
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    title: "Compliance Without Friction",
    subtitle: "Secure your legacy with professional accounting and strategic financial oversight.",
    align: "right"
  }
];

export const Hero: React.FC<HeroProps> = ({ onBookCall }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[100dvh] min-h-[600px] md:min-h-[700px] overflow-hidden bg-primary-dark">
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`w-full h-full transform transition-transform duration-[15000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}>
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/30 to-primary-dark/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 mix-blend-multiply"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center z-10 px-4">
        <div className="max-w-7xl mx-auto w-full">
            <div className="animate-fade-in">
              {SLIDES.map((slide, index) => {
                 if (index !== currentSlide) return null;
                 return (
                    <div key={slide.id} className={`max-w-5xl ${slide.align === 'center' ? 'mx-auto text-center' : slide.align === 'right' ? 'ml-auto text-right' : 'text-left'} animate-slide-up`}>
                        <div className={`mb-4 md:mb-8 flex ${slide.align === 'center' ? 'justify-center' : slide.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                            <span className="px-3 py-1.5 bg-secondary/20 backdrop-blur-md rounded-lg border border-secondary/30 text-secondary text-[10px] sm:text-xs font-black uppercase tracking-widest">
                                Delivering Value Since 2018
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
                          {slide.title}
                        </h1>
                        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-purple-100 mb-8 md:mb-14 font-medium leading-relaxed max-w-2xl inline-block drop-shadow-lg opacity-90">
                          {slide.subtitle}
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 ${slide.align === 'center' ? 'justify-center' : slide.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                            <button 
                                onClick={onBookCall}
                                className="group relative bg-secondary hover:bg-orange-600 text-white px-8 py-4 sm:px-10 sm:py-5 md:py-6 rounded-2xl text-base sm:text-lg font-bold shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-3 uppercase tracking-wider">
                                  <span className="material-icons text-white group-hover:rotate-12 transition">calendar_today</span>
                                  Get Started
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>
                            <Link 
                                to="/services" 
                                className="group bg-white/5 backdrop-blur-lg border border-white/20 text-white px-8 py-4 sm:px-10 sm:py-5 md:py-6 rounded-2xl text-base sm:text-lg font-bold hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-wider"
                            >
                                Our Solutions
                                <span className="material-icons group-hover:translate-x-2 transition">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                 )
              })}
            </div>
        </div>
      </div>

      {/* Trust Elements */}
      <div className="absolute bottom-12 left-0 w-full z-20 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center text-white/50 border-t border-white/10 pt-10">
              <div className="flex gap-12 items-center">
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Strategy</span>
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Data</span>
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Accounting</span>
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Growth</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-primary-dark bg-gray-200 overflow-hidden shadow-lg">
                              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" />
                          </div>
                      ))}
                  </div>
                  <span className="text-sm font-bold ml-4">Trusted by 50+ Growth-stage Firms</span>
              </div>
           </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:bottom-10 md:right-12 flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide ? 'w-10 h-2 md:w-2 md:h-10 bg-secondary' : 'w-2 h-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};