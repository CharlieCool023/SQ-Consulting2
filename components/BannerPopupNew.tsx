import React, { useState, useEffect } from 'react';
import { Banner } from '../types';

interface BannerPopupProps {
  banner: Banner;
}

export const BannerPopup: React.FC<BannerPopupProps> = ({ banner }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if banner has already been closed in this session
    const closedBanners = JSON.parse(sessionStorage.getItem('closed_banners') || '[]');
    if (closedBanners.includes(banner.id)) {
      setIsClosed(true);
      return;
    }

    // Show banner after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Auto-hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          const closedBanners = JSON.parse(sessionStorage.getItem('closed_banners') || '[]');
          closedBanners.push(banner.id);
          sessionStorage.setItem('closed_banners', JSON.stringify(closedBanners));
        }, 300);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, (banner.delay_seconds || 0) * 1000);

    return () => clearTimeout(showTimer);
  }, [banner.id, banner.delay_seconds]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      const closedBanners = JSON.parse(sessionStorage.getItem('closed_banners') || '[]');
      closedBanners.push(banner.id);
      sessionStorage.setItem('closed_banners', JSON.stringify(closedBanners));
    }, 300);
  };

  if (isClosed || !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className={`bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden ${isFadingOut ? 'animate-scale-out' : 'animate-scale-in'} border border-white/80`}>
        
        {/* Image Section with Close Button */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
          {banner.image_url ? (
            <img
              src={banner.image_url}
              alt={banner.title}
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="w-full h-72 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center">
              <span className="material-icons text-white text-8xl opacity-40">image</span>
            </div>
          )}
          
          {/* Close Button - Top Right */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 flex items-center justify-center transition shadow-lg hover:shadow-xl hover:scale-110"
            title="Close"
          >
            <span className="material-icons text-xl font-bold">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6 bg-gradient-to-b from-white to-slate-50">
          {/* Title */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {banner.title}
            </h2>
          </div>
          
          {/* Description */}
          {banner.description && (
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-none">
              {banner.description}
            </p>
          )}

          {/* Action Button */}
          {banner.link_url && (
            <div className="pt-4">
              <a
                href={banner.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-lg"
              >
                Learn More →
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-out {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.85);
          }
        }

        .animate-fade-in {
          animation: fade-in 300ms ease-out;
        }

        .animate-fade-out {
          animation: fade-out 300ms ease-out;
        }

        .animate-scale-in {
          animation: scale-in 300ms ease-out;
        }

        .animate-scale-out {
          animation: scale-out 300ms ease-out;
        }
      `}</style>
    </div>
  );
};

export default BannerPopup;
