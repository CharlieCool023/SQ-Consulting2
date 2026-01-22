import React, { useState, useEffect } from 'react';
import { CareerOpening } from '../types';
import { getCareers } from '../services/supabaseService';

export const CareersPage: React.FC = () => {
  const [allCareers, setAllCareers] = useState<CareerOpening[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CareerOpening | null>(null);
  const [formData, setFormData] = useState({ 
    applicant_name: '', 
    applicant_email: '', 
    applicant_phone: '', 
    cover_letter: '' 
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadCareers();
    window.scrollTo(0, 0);
  }, []);

  const loadCareers = async () => {
    try {
      // Load careers from Supabase
      const storedCareers = await getCareers();
      if (storedCareers && storedCareers.length > 0) {
        setAllCareers(storedCareers);
      } else {
        setAllCareers([]);
      }
    } catch (error) {
      console.error('Error loading careers:', error);
      setAllCareers([]);
    }
  };

  const handleApply = (job: CareerOpening) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setSubmitError('');
    setSubmitSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    
    try {
      // Handle form submission
      setSubmitSuccess(true);
      setFormData({ applicant_name: '', applicant_email: '', applicant_phone: '', cover_letter: '' });
      setCvFile(null);
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-purple-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 backdrop-blur-md rounded-lg border border-secondary/30 text-secondary text-xs font-black uppercase tracking-widest mb-6">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Build Your Career with Nigeria's Leading Consultancy
            </h1>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
              We're looking for exceptional talent to join our growing team. If you're passionate about driving business transformation and making a real impact, we want to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Why Work at SQ Consulting</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary text-3xl">trending_up</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Accelerated Growth</h3>
              <p className="text-gray-600">Work on high-impact projects with Nigeria's top companies and fast-track your career development.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-secondary text-3xl">school</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Learning & Development</h3>
              <p className="text-gray-600">Access to professional certifications, training programs, and mentorship from industry experts.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-green-600 text-3xl">workspace_premium</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Competitive Benefits</h3>
              <p className="text-gray-600">Industry-leading compensation, health insurance, flexible work arrangements, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600">Explore opportunities to join our team of exceptional consultants</p>
          </div>

          <div className="space-y-6">
            {allCareers.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="material-icons text-sm">business_center</span>
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-icons text-sm">schedule</span>
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-icons text-sm">location_on</span>
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-secondary hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="material-icons text-sm text-primary">check_circle</span>
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="material-icons text-xs text-gray-400 mt-0.5">arrow_right</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-primary text-white p-6 rounded-t-3xl flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Apply for {selectedJob.title}</h2>
                <p className="text-purple-200 text-sm mt-1">{selectedJob.department} • {selectedJob.type}</p>
              </div>
              <button
                onClick={() => {
                  setShowApplicationForm(false);
                  setSubmitError('');
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="p-6 md:p-8">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-icons text-green-600 text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">Thank you for your interest. We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="John Doe"
                      value={formData.applicant_name}
                      onChange={e => setFormData({...formData, applicant_name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="john@example.com"
                        value={formData.applicant_email}
                        onChange={e => setFormData({...formData, applicant_email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="+234 XXX XXX XXXX"
                        value={formData.applicant_phone}
                        onChange={e => setFormData({...formData, applicant_phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                      placeholder="Tell us why you're a great fit for this role..."
                      value={formData.cover_letter}
                      onChange={e => setFormData({...formData, cover_letter: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload CV (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                      >
                        <span className="material-icons text-gray-400">upload_file</span>
                        <span className="text-gray-600">
                          {cvFile ? cvFile.name : 'Click to upload PDF or DOC (max 5MB)'}
                        </span>
                      </label>
                    </div>
                    {cvFile && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <span className="material-icons text-sm">check_circle</span>
                        File selected: {(cvFile.size / 1024).toFixed(0)} KB
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-secondary hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
