import React, { useEffect } from 'react';
import { SERVICES } from '../constants';
import { ServiceCard } from '../components/ServiceCard';

interface ServicesPageProps {
  onBookCall: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookCall }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-background-light">
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Expertise</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Comprehensive solutions tailored to streamline operations, maximize compliance, and accelerate growth.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
                <div key={service.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <ServiceCard service={service} />
                </div>
            ))}
         </div>

         <div className="mt-20 bg-white rounded-3xl p-8 md:p-16 shadow-xl text-center border border-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Every business is unique. If you don't see exactly what you're looking for, let's discuss your specific challenges.
            </p>
            <button 
                onClick={onBookCall}
                className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition"
            >
                Schedule a Free Consultation
            </button>
         </div>
      </div>
    </div>
  );
};
