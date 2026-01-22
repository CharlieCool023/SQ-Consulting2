import React from 'react';

const TESTIMONIALS = [
    {
        id: 1,
        name: "Emmanuel Adebayo",
        role: "CEO, FinTech Solutions",
        content: "SQ Consulting transformed our financial operations. Their audit revealed inefficiencies we didn't know existed, saving us millions in the long run.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        role: "Director, EduGlobal",
        content: "The Business Intelligence dashboard they built gave us clarity on our student demographics. We can now target our marketing with surgical precision.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Michael Okonkwo",
        role: "Founder, GreenAgro",
        content: "Their strategic guidance during our expansion phase was invaluable. The business plan they drafted helped us secure our Series A funding.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section className="py-20 bg-background-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm">Testimonials</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6 text-gray-900">What Our Clients Say</h2>
                    <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative hover:shadow-xl transition duration-300">
                            <div className="absolute top-6 right-8 opacity-10">
                                <span className="material-icons text-6xl text-primary">format_quote</span>
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic leading-relaxed relative z-10">"{t.content}"</p>
                            <div className="flex text-yellow-400 mt-4">
                                {[1,2,3,4,5].map(star => <span key={star} className="material-icons text-sm">star</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};