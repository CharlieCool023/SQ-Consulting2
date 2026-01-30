import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { BannerPopup } from './components/BannerPopupNew';
import { Banner } from './types';
import { getBanners } from './services/supabaseService';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetail } from './pages/ServiceDetail';
import { AdminDashboardNew } from './pages/AdminDashboardNew';
import { SuccessStories } from './pages/SuccessStories';
import { CareersPage } from './pages/CareersPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { JobApplicationPage } from './pages/JobApplicationPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC<{ isBookingOpen: boolean; openBooking: () => void; closeBooking: () => void }> = ({ isBookingOpen, openBooking, closeBooking }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const fetchedBanners = await getBanners();
        setBanners(fetchedBanners);
        // Show first active banner
        if (fetchedBanners.length > 0) {
          setActiveBanner(fetchedBanners[0]);
        }
      } catch (error) {
        console.error('Error loading banners:', error);
      }
    };
    loadBanners();
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-background-light selection:bg-primary selection:text-white min-h-screen flex flex-col">
      {activeBanner && <BannerPopup banner={activeBanner} />}
      {!isAdminPage && <Navbar onBookCall={openBooking} />}
      
      <main className="flex-grow">
          <Routes>
              <Route path="/" element={<Home onBookCall={openBooking} />} />
              <Route path="/services" element={<ServicesPage onBookCall={openBooking} />} />
              <Route path="/success-stories" element={<SuccessStories onBookCall={openBooking} />} />
              <Route path="/blog" element={<BlogListPage onBookCall={openBooking} />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/:id/apply" element={<JobApplicationPage />} />
              <Route path="/about" element={<AboutPage onBookCall={openBooking} />} />
              <Route path="/contact" element={<ContactPage onBookCall={openBooking} />} />
              <Route path="/service/:id" element={<ServiceDetail onBookCall={openBooking} />} />
              <Route path="/admin" element={<AdminDashboardNew />} />
              <Route path="/diagnostics" element={<DiagnosticsPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
      </main>

      {!isAdminPage && <Footer />}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
};

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <AppContent isBookingOpen={isBookingOpen} openBooking={openBooking} closeBooking={closeBooking} />
    </Router>
  );
};

export default App;