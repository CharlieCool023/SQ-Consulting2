import React, { useEffect } from 'react';

interface AboutPageProps {
  onBookCall: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBookCall }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-background-light">
       {/* Hero Header */}
       <div className="bg-white py-24 md:py-32 border-b border-gray-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
                <span className="text-secondary font-black tracking-widest uppercase text-xs mb-4 block">Engineered for Excellence</span>
                <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">Local Expertise. <br className="hidden md:block"/><span className="text-primary">Global Impact.</span></h1>
                <p className="text-xl md:text-3xl text-gray-600 leading-relaxed font-medium opacity-80 max-w-2xl">
                    SQ Consulting is an elite advisory group dedicated to scaling Nigerian MSMEs into global powerhouses.
                </p>
            </div>
         </div>
       </div>

       {/* Vision & Diverse Team Imagery */}
       <div className="py-24 md:py-32">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] opacity-20 blur-2xl"></div>
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
                            <img 
                                src="https://images.unsplash.com/photo-1542744095-291b1f67b221?q=80&w=2070&auto=format&fit=crop" 
                                alt="Diverse team working in Nigeria" 
                                className="w-full transform group-hover:scale-105 transition duration-[3000ms]"
                            />
                            <div className="absolute inset-0 bg-primary-dark/20 mix-blend-overlay"></div>
                        </div>
                   </div>
                   <div className="space-y-10">
                       <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">We build institutions, <br/>not just businesses.</h2>
                       <p className="text-gray-500 text-xl font-medium leading-relaxed">
                           Our mission is to solve the most complex operational and financial challenges facing modern enterprises in Nigeria. We combine deep local context with international best practices.
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                           <div className="space-y-4">
                               <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                   <span className="material-icons text-3xl">psychology</span>
                               </div>
                               <h4 className="text-xl font-bold text-gray-900 uppercase tracking-tighter">Strategic Clarity</h4>
                               <p className="text-gray-500 font-medium">Removing ambiguity from your growth roadmap.</p>
                           </div>
                           <div className="space-y-4">
                               <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                                   <span className="material-icons text-3xl">auto_graph</span>
                               </div>
                               <h4 className="text-xl font-bold text-gray-900 uppercase tracking-tighter">Sustainable ROI</h4>
                               <p className="text-gray-500 font-medium">Results that last longer than a single quarter.</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       {/* Our Process - Step Section */}
       <div className="py-32 bg-primary-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Our DNA: The SQ Method</h2>
                <p className="text-purple-200 text-xl max-w-2xl mx-auto font-medium opacity-80">A rigorous approach to engineering value at every touchpoint.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { title: "Deep Audit", desc: "No surface-level analysis. We go deep into your ledgers and workflows.", icon: "manage_search" },
                  { title: "Strategic Map", desc: "A bespoke roadmap with clear milestones and hard ROI targets.", icon: "map" },
                  { title: "Elite Execution", desc: "We deploy our experts alongside your team for hands-on rollout.", icon: "settings_suggest" },
                  { title: "Value Delivery", desc: "Ongoing monitoring to ensure the new state becomes the standard.", icon: "military_tech" }
                ].map((step, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition group">
                    <span className="material-icons text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform">{step.icon}</span>
                    <h4 className="text-2xl font-black mb-4 tracking-tight uppercase">{step.title}</h4>
                    <p className="text-purple-100/70 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* Values Grid */}
       <div className="py-32 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                   <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight mb-6 italic">Built on Value.</h2>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">Our culture is defined by a relentless pursuit of truth and efficiency for our clients.</p>
                   </div>
                   <button onClick={onBookCall} className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-dark transition shadow-2xl active:scale-95 text-sm">Join the Elite</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {[
                       { icon: 'verified_user', title: 'Radical Integrity', desc: 'In Nigeria\'s market, trust is currency. We provide unvarnished truth in every financial audit.' },
                       { icon: 'psychology', title: 'Infinite Growth', desc: 'We never stop learning. We bring the world\'s latest BI and Strategy tools to your doorstep.' },
                       { icon: 'handshake', title: 'Deep Partnership', desc: 'We don\'t just consult; we co-author your success story. Your win is our reputation.' }
                   ].map((item, i) => (
                       <div key={i} className="group p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                           <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform text-primary border border-gray-100">
                               <span className="material-icons text-4xl">{item.icon}</span>
                           </div>
                           <h3 className="text-2xl font-black mb-4 text-gray-900 tracking-tight uppercase">{item.title}</h3>
                           <p className="text-gray-500 font-medium leading-relaxed italic">"{item.desc}"</p>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    </div>
  );
};