import React from 'react';

export const AdminFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-slate-900 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              © 2026 Admin Dashboard. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#help" className="text-slate-400 hover:text-white transition">Need Help?</a>
            <a href="#docs" className="text-slate-400 hover:text-white transition">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition">Privacy</a>
          </div>
          <div className="text-right text-slate-500 text-xs">
            <p>Version 2.0 | Last updated Jan 30, 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
