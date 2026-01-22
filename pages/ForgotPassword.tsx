import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../services/supabaseService';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSuccess(true);
      setMessage('✅ Password reset link sent! Check your email.');
      setTimeout(() => {
        navigate('/admin');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-secondary/30">
            <span className="material-icons text-secondary text-4xl">mail_outline</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
          <p className="text-white/60">Don't worry, we'll help you reset it.</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-xl">
            <p className="text-green-300 text-sm text-center">{message}</p>
            <p className="text-green-200/70 text-xs text-center mt-2">
              Redirecting to login...
            </p>
          </div>
        )}

        {/* Error Message */}
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
                Admin Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
              <p className="text-blue-200 text-xs leading-relaxed">
                📧 Enter the email address associated with your admin account. 
                We'll send you a link to reset your password.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Sending...' : '📧 Send Reset Link'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="w-full bg-white/5 hover:bg-white/10 text-white/80 py-3 rounded-xl font-bold transition border border-white/10"
            >
              ← Back to Login
            </button>
          </form>
        ) : null}

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/50 text-xs text-center">
            Don't have an account yet? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};
