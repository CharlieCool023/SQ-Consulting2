import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SERVICES } from '../constants';

interface ServiceDetailProps {
  onBookCall: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ onBookCall }) => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <Navigate to="/" />;
  }

  const steps = [
    { title: "Strategic Discovery", desc: "We audit your current posture and define specific, measurable KPIs.", duration: "2 weeks" },
    { title: "Blueprint Design", desc: "Our experts design a custom solution mapped to your operational needs.", duration: "3 weeks" },
    { title: "Agile Implementation", desc: "Controlled rollout with real-time feedback loops and team training.", duration: "6-12 weeks" },
    { title: "Continuous Optimization", desc: "Post-launch support to ensure sustainability and ROI maximization.", duration: "Ongoing" }
  ];

  const expectations = [
    { icon: "schedule", title: "Realistic Timeline", desc: "Transparent timelines with clear milestones and deliverables at each stage" },
    { icon: "group_add", title: "Dedicated Team", desc: "Your own team of expert consultants assigned throughout the engagement" },
    { icon: "trending_up", title: "Measurable Results", desc: "Clear KPIs tracked throughout, with regular reporting and performance updates" },
    { icon: "school", title: "Knowledge Transfer", desc: "Full training and documentation so your team can sustain improvements independently" },
    { icon: "support_agent", title: "Ongoing Support", desc: "Post-implementation support to ensure success and continuous optimization" },
    { icon: "verified_user", title: "Full Transparency", desc: "Regular check-ins and honest communication about progress and challenges" }
  ];

  return (
    <div className="min-h-screen pt-20 bg-background-light">
        {/* Service Hero */}
        <div className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
            <div className="absolute inset-0">
                <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary-dark/85 to-primary-dark/80"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
                <div className="space-y-6">
                  <div className={`w-20 h-20 ${service.iconBg} backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl animate-float`}>
                    <span className={`material-icons text-4xl ${service.color}`}>{service.icon}</span>
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">{service.title}</h1>
                    <p className="text-xl md:text-2xl text-purple-100 max-w-3xl font-medium leading-relaxed">{service.shortDescription}</p>
                  </div>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-8 space-y-20">
                    {/* Overview */}
                    <section className="animate-fade-in">
                        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full mb-6">Service Overview</div>
                        <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 tracking-tight">Why This Matters</h2>
                        <p className="text-gray-600 leading-relaxed text-lg font-medium mb-6">{service.fullDescription}</p>
                        <div className="pt-6 border-t border-gray-200">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect For:</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <span className="material-icons text-secondary mt-0.5 flex-shrink-0">check_circle</span>
                              <span className="text-gray-700 font-medium">High-growth companies scaling rapidly</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="material-icons text-secondary mt-0.5 flex-shrink-0">check_circle</span>
                              <span className="text-gray-700 font-medium">Organizations struggling with operational efficiency</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="material-icons text-secondary mt-0.5 flex-shrink-0">check_circle</span>
                              <span className="text-gray-700 font-medium">Teams seeking competitive advantage through data and strategy</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="material-icons text-secondary mt-0.5 flex-shrink-0">check_circle</span>
                              <span className="text-gray-700 font-medium">Leaders preparing for fundraising or investor meetings</span>
                            </li>
                          </ul>
                        </div>
                    </section>

                    {/* What to Expect */}
                    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 rounded-3xl border border-primary/10">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 tracking-tight">What to Expect</h2>
                        <p className="text-gray-600 mb-8 font-medium">Our service comes with clear commitments and deliverables:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {expectations.map((exp, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                                        <span className={`material-icons ${service.color}`}>{exp.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{exp.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{exp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Execution Plan */}
                    <section>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 tracking-tight">Our Process</h2>
                        <p className="text-gray-600 mb-12 font-medium">A structured 4-stage approach designed for success</p>
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="group relative">
                                        <div className="flex items-start gap-6">
                                            <div className="flex flex-col items-center">
                                              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                                                0{idx + 1}
                                              </div>
                                              {idx < steps.length - 1 && <div className="w-1 h-12 bg-gradient-to-b from-primary/50 to-transparent mt-2"></div>}
                                            </div>
                                            <div className="pt-2">
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                                                <p className="text-gray-600 leading-relaxed mb-3 font-medium">{step.desc}</p>
                                                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                                                  <span className="material-icons text-base">schedule</span>
                                                  {step.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features List */}
                    <section>
                        <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 tracking-tight">Core Deliverables</h2>
                        <p className="text-gray-600 mb-8 font-medium">Everything included in this engagement</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all group">
                                    <div className={`w-10 h-10 ${service.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <span className={`material-icons text-base ${service.color}`}>verified</span>
                                    </div>
                                    <span className="text-gray-800 font-semibold text-base leading-snug">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Success Metrics */}
                    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 rounded-3xl border border-primary/10">
                        <h2 className="text-3xl md:text-4xl font-black mb-8 text-gray-900 tracking-tight">How Success is Measured</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-icons text-secondary">trending_up</span>
                                    Quantitative Metrics
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                        Clear ROI within defined timeframe
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                        Achievement of KPIs set during discovery
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                        Operational improvements tracked and reported
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                        Cost savings or revenue uplift achieved
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="material-icons text-primary">psychology</span>
                                    Qualitative Outcomes
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Enhanced team capability and confidence
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Improved decision-making processes
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Sustainable systems and processes
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Competitive advantage established
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar CTA */}
                <div className="lg:col-span-4">
                    <div className="sticky top-28 space-y-6">
                        {/* Main CTA Card */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-t-4 border-secondary space-y-6">
                            <div>
                                <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">Ready to Transform?</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">
                                    Let's discuss how {service.title} can drive growth for your organization.
                                </p>
                            </div>
                            
                            <button 
                                onClick={onBookCall}
                                className="w-full bg-gradient-to-r from-secondary to-orange-600 hover:shadow-xl text-white font-black py-6 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
                            >
                                Schedule Consultation
                            </button>
                            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">30 mins • No Obligation • Actionable Insights</p>
                        </div>

                        {/* Info Card */}
                        <div className="bg-gradient-to-br from-primary/5 to-purple-100/5 p-6 rounded-2xl border border-primary/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="material-icons text-primary text-2xl">info</span>
                                <h4 className="font-bold text-gray-900">Quick Facts</h4>
                            </div>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="material-icons text-primary text-lg flex-shrink-0 mt-0.5">check</span>
                                    <span className="text-gray-700"><strong>Typical Duration:</strong> 2-4 months</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-icons text-primary text-lg flex-shrink-0 mt-0.5">check</span>
                                    <span className="text-gray-700"><strong>Team Size:</strong> 2-4 consultants</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-icons text-primary text-lg flex-shrink-0 mt-0.5">check</span>
                                    <span className="text-gray-700"><strong>Avg. ROI:</strong> 3-5x within year 1</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-icons text-primary text-lg flex-shrink-0 mt-0.5">check</span>
                                    <span className="text-gray-700"><strong>Best Time:</strong> When scaling or restructuring</span>
                                </li>
                            </ul>
                        </div>

                        {/* Support Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-icons text-secondary">support_agent</span>
                                Have Questions?
                            </h4>
                            <p className="text-sm text-gray-600 font-medium">
                                Reach out to our team directly. We're here to answer any questions about this service.
                            </p>
                            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition">
                                Contact Us <span className="material-icons text-base">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};