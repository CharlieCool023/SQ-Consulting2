import React from 'react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col animate-scale-in">
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400 hover:text-gray-900">
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="p-6 md:p-10 overflow-y-auto text-gray-600 leading-relaxed space-y-6">
          {content}
        </div>
        <div className="p-6 border-t border-gray-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg active:scale-95"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};