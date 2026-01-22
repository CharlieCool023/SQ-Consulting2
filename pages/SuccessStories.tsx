import React, { useEffect } from 'react';
import { SUCCESS_STORIES } from '../constants';

interface SuccessStoriesProps {
  onBookCall: () => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onBookCall }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Proven Results.</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto font-light leading-relaxed">
                Explore how we've helped diverse organizations overcome complex obstacles and achieve sustainable growth.
            </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {SUCCESS_STORIES.map((story, index) => (
                    <div key={story.id} className="group animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="relative h-[400px] overflow-hidden rounded-3xl mb-8 shadow-2xl">
                            <img src={story.image} alt={story.client} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" />
                            <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-xl text-sm font-bold text-primary shadow-lg">
                                {story.industry}
                            </div>
                        </div>
                        <div className="px-2">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">{story.client}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                                <div>
                                    <h5 className="text-primary font-bold uppercase text-xs tracking-widest mb-3">The Challenge</h5>
                                    <p className="text-gray-600 leading-relaxed">{story.challenge}</p>
                                </div>
                                <div>
                                    <h5 className="text-primary font-bold uppercase text-xs tracking-widest mb-3">Our Solution</h5>
                                    <p className="text-gray-600 leading-relaxed">{story.solution}</p>
                                </div>
                            </div>
                            <div className="bg-primary/5 p-8 rounded-2xl border-l-4 border-primary">
                                <h5 className="text-primary font-bold uppercase text-xs tracking-widest mb-3">Real-World Impact</h5>
                                <p className="text-2xl font-bold text-gray-900">{story.impact}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-background-light">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to be our next success story?</h2>
              <p className="text-xl text-gray-600 mb-12">
                  Let's sit down and discuss how our customized strategy can work for you.
              </p>
              <button 
                onClick={onBookCall}
                className="bg-secondary text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:bg-orange-600 transition-all active:scale-95"
              >
                  Book Your Discovery Call
              </button>
          </div>
      </section>
    </div>
  );
};