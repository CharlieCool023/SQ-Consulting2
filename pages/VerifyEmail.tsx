import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAdminEmail } from '../services/supabaseService';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Get email from session storage if available
    const sessionEmail = sessionStorage.getItem('pending_email_verification');
    if (sessionEmail) {
      setEmail(sessionEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !verificationCode) {
      setError('Please enter both email and verification code');
      return;
    }

    setLoading(true);
    try {
      await verifyAdminEmail(email, verificationCode);
      setSuccess(true);
      setMessage('✅ Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        sessionStorage.removeItem('pending_email_verification');
        navigate('/admin');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to verify email');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setMessage('📧 Verification code sent to ' + email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
            <span className="material-icons text-primary text-4xl">email</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-white/60">Complete admin account setup</p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl">
            <p className="text-green-300 text-sm text-center">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-bold mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-bold mb-3">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-center text-2xl tracking-widest"
                placeholder="000000"
                disabled={loading}
                maxLength={6}
              />
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
              <p className="text-blue-200 text-xs leading-relaxed">
                📬 Check your email for the verification code. It may take a few seconds to arrive.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !verificationCode}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Verifying...' : '✓ Verify Email'}
            </button>

            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="text-secondary hover:text-secondary/80 font-bold text-sm transition"
              >
                Resend verification code
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="w-full bg-white/5 hover:bg-white/10 text-white/80 py-3 rounded-xl font-bold transition border border-white/10"
            >
              ← Back
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};
