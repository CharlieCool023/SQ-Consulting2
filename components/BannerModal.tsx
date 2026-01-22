import React, { useState, useEffect } from 'react';

interface BannerData {
  id?: string;
  title: string;
  description?: string;
  image_url?: string;
  link?: string;
  active: boolean;
  show_delay?: number;
}

interface BannerModalProps {
  banner: BannerData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BannerModal: React.FC<BannerModalProps> = ({ banner, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isOpen || !banner) {
      setIsVisible(false);
      return;
    }

    // Set up timer based on show_delay
    const delay = (banner.show_delay || 0) * 1000;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, banner]);

  if (!isOpen || !banner || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-[10000] bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <span className="material-icons text-gray-600">close</span>
        </button>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          {banner.image_url && (
            <div className="hidden md:block">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Text Content */}
          <div className={`p-8 md:p-10 flex flex-col justify-center ${!banner.image_url ? 'md:col-span-2' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {banner.title}
            </h2>
            
            {banner.description && (
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {banner.description}
              </p>
            )}

            {/* Mobile Image */}
            {banner.image_url && (
              <img
                src={banner.image_url}
                alt={banner.title}
                className="md:hidden w-full h-48 object-cover rounded-xl mb-6"
              />
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition"
              >
                Close
              </button>
              {banner.link && (
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition text-center"
                >
                  Learn More
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
