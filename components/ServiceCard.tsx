import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 group border-t-4 ${service.borderColor} flex flex-col h-full hover:-translate-y-2`}>
      <div className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300 flex-shrink-0`}>
        <span className={`material-icons ${service.color} text-4xl font-bold`}>{service.icon}</span>
      </div>
      <h3 className="text-xl font-black mb-4 text-gray-900 group-hover:text-primary transition duration-300 line-clamp-2">{service.title}</h3>
      <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">{service.shortDescription}</p>
      
      <div className="mt-auto">
        <Link 
            to={`/service/${service.id}`}
            className={`inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider ${service.color} hover:gap-3 transition-all duration-300`}
        >
            Learn More
            <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};
