import React, { useState } from 'react';
import { changeAdminPassword, requestPasswordReset, getAdminEmail } from '../services/supabaseService';

interface AdminSettingsProps {
  onClose: () => void;
  onLogout: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'password' | 'security'>('password');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Change Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Forgot Password State
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  const adminEmail = getAdminEmail();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await changeAdminPassword(adminEmail!, passwordForm.currentPassword, passwordForm.newPassword);
      setMessage('✅ Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!forgotPasswordEmail) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(forgotPasswordEmail);
      setMessage('✅ Password reset link sent to your email!');
      setForgotPasswordSent(true);
      setTimeout(() => {
        setForgotPasswordEmail('');
        setForgotPasswordSent(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 px-8 py-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              activeTab === 'password'
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="material-icons inline mr-2">lock</span>
            Change Password
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              activeTab === 'security'
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="material-icons inline mr-2">security</span>
            Security
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Messages */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
              <span className="material-icons">check_circle</span>
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
              <span className="material-icons">error</span>
              {error}
            </div>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter current password"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter new password (min 8 characters)"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="material-icons">info</span>
                  Account Information
                </h3>
                <p className="text-blue-800 mb-4">
                  <strong>Email:</strong> {adminEmail}
                </p>
                <p className="text-blue-800 mb-4">
                  <strong>Account Type:</strong> Administrator
                </p>
                <p className="text-blue-800 text-sm">
                  Your account has full access to all site management features.
                </p>
              </div>

              <div className="border-t-2 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-icons text-orange-500">warning</span>
                  Forgot Your Password?
                </h3>
                <p className="text-slate-600 mb-4">
                  Don't worry! We can help you reset your password. Enter your email address and we'll send you a password reset link.
                </p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                      disabled={loading || forgotPasswordSent}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || forgotPasswordSent}
                    className="bg-secondary hover:bg-secondary/80 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50"
                  >
                    {forgotPasswordSent ? '✅ Link Sent!' : loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-8 py-4 flex gap-3 justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-100 transition"
          >
            Close
          </button>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition flex items-center gap-2"
          >
            <span className="material-icons">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
