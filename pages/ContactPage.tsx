import React, { useEffect, useState } from 'react';
import { saveSubmission } from '../services/supabaseService';

interface ContactPageProps {
  onBookCall: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBookCall }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    try {
      // Save to Supabase
      const result = await saveSubmission({
        name: formState.name,
        email: formState.email,
        subject: "General Inquiry",
        message: formState.message,
        phone: ""
      });

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit inquiry');
      }

      // Show success UI
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMessage = error?.message || 'Error submitting form. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-background-light">
       <div className="bg-primary pb-24 pt-16">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
               <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
               <p className="text-purple-100 text-lg">We'd love to hear about your project.</p>
           </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
           <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
               {/* Contact Info */}
               <div className="bg-gray-900 text-white p-12 md:w-5/12 relative overflow-hidden flex flex-col justify-between">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   <div className="relative z-10">
                       <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                       <div className="space-y-8">
                           <div className="flex items-start gap-4">
                               <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <span className="material-icons text-secondary">phone</span>
                               </div>
                               <div>
                                   <p className="text-gray-400 text-sm mb-1">Call Us</p>
                                   <p className="font-semibold text-lg">09037551127</p>
                               </div>
                           </div>
                           <div className="flex items-start gap-4">
                               <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <span className="material-icons text-secondary">email</span>
                               </div>
                               <div>
                                   <p className="text-gray-400 text-sm mb-1">Email Us</p>
                                   <p className="font-semibold text-lg break-all">sqconsultinginc@gmail.com</p>
                               </div>
                           </div>
                           <div className="flex items-start gap-4">
                               <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <span className="material-icons text-secondary">location_on</span>
                               </div>
                               <div>
                                   <p className="text-gray-400 text-sm mb-1">Location</p>
                                   <p className="font-semibold text-lg">Lagos, Nigeria</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   
                   <div className="relative z-10 mt-12">
                        <p className="text-gray-400 mb-4 text-sm">Ready to start?</p>
                         <button 
                         onClick={onBookCall}
                         className="w-full bg-secondary hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2"
                       >
                           <span className="material-icons">calendar_today</span>
                           Book Discovery Call
                       </button>
                   </div>
               </div>

               {/* General Inquiry Form */}
               <div className="md:w-7/12 p-12 bg-white">
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                   <p className="text-gray-500 mb-8">For general inquiries, partnerships, or just to say hi.</p>
                   
                   {isSent ? (
                       <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
                           <span className="material-icons text-green-500 text-5xl mb-4">task_alt</span>
                           <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                           <p className="text-gray-600">Thanks for reaching out. Your message has been sent to our team directly. We'll be in touch soon.</p>
                           <button onClick={() => setIsSent(false)} className="mt-6 text-primary font-bold hover:underline">Send another message</button>
                       </div>
                   ) : (
                       <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
                                        placeholder="Jane Doe"
                                        value={formState.name}
                                        onChange={e => setFormState({...formState, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        required
                                        type="email" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
                                        placeholder="jane@example.com"
                                        value={formState.email}
                                        onChange={e => setFormState({...formState, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea 
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-gray-50"
                                    placeholder="How can we help you today?"
                                    value={formState.message}
                                    onChange={e => setFormState({...formState, message: e.target.value})}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-xl font-bold shadow-md transition flex items-center gap-2"
                            >
                                Send Message
                                <span className="material-icons text-sm">send</span>
                            </button>
                       </form>
                   )}
               </div>
           </div>
       </div>
    </div>
  );
};
