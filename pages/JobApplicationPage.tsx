import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCareers } from '../services/supabaseService';
import { CareerOpening } from '../types';

export const JobApplicationPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState<CareerOpening | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cv: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadCareer();
    window.scrollTo(0, 0);
  }, [id]);

  const loadCareer = async () => {
    try {
      const careers = await getCareers();
      const found = careers.find(c => c.id === id);
      if (found) {
        setCareer(found);
      } else {
        navigate('/careers');
      }
    } catch (error) {
      console.error('Error loading career:', error);
      navigate('/careers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      // Here you would submit the application
      // await saveJobApplication({...formData, career_id: id});
      setSubmitted(true);
      setTimeout(() => {
        navigate('/careers');
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-6xl text-primary animate-spin">settings</span>
          <p className="text-gray-600 mt-4">Loading position...</p>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-background-light pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Position not found</p>
          <button
            onClick={() => navigate('/careers')}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-light pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center bg-white rounded-2xl p-12 shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="material-icons text-4xl text-green-600">check_circle</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in the {career.title} position. We'll review your application and get back to you soon.
          </p>
          <p className="text-sm text-gray-500">Redirecting to careers page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/careers')}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition mb-8"
        >
          <span className="material-icons">arrow_back</span>
          Back to Careers
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Position Info */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 md:p-12">
            <h1 className="text-4xl font-bold mb-2">{career.title}</h1>
            <div className="flex flex-col md:flex-row gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <span className="material-icons">business</span>
                {career.department}
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons">location_on</span>
                {career.location}
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons">schedule</span>
                {career.type}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-8 md:p-12">
            {/* Position Details */}
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Role</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{career.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {(career.requirements || []).map((req, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-600">
                      <span className="material-icons text-primary flex-shrink-0 mt-1">check</span>
                      <span dangerouslySetInnerHTML={{ __html: req }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Apply Now</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+234..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">CV Link</label>
                    <input
                      type="url"
                      value={formData.cv}
                      onChange={(e) => setFormData({ ...formData, cv: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter</label>
                    <textarea
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Tell us why you're interested..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
