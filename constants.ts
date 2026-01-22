import { Service, BlogPost, CareerOpening, TeamMember, Project } from './types';

// ==================== SERVICES ====================
export const SERVICES: Service[] = [
  {
    id: 'business-intelligence',
    title: 'Business Intelligence & Data Analytics',
    icon: 'insights',
    shortDescription: 'Transform data into actionable insights with advanced analytics, predictive modeling, and real-time dashboards.',
    fullDescription: 'In today\'s data-driven economy, making decisions without comprehensive analytics is like navigating without a map. We transform your fragmented data into strategic roadmaps that drive growth. Our Business Intelligence solutions go far beyond simple charts and graphs—we build living, breathing data ecosystems in PowerBI, Tableau, and custom platforms that predict market shifts before they happen. Whether you\'re a retail chain in Lagos, a pan-African logistics firm, or a rapidly scaling fintech startup, we help you find the "signal" within the "noise." Our approach combines advanced statistical modeling, machine learning algorithms, and intuitive visualization to give you the competitive edge you need. From revenue leakage detection to customer lifetime value optimization, we turn your data into your most valuable strategic asset.',
    features: [
      'Interactive ROI Dashboards & Executive Reporting',
      'Revenue Leakage Detection & Financial Health Monitoring',
      'Automated Inventory Forecasting & Supply Chain Optimization',
      'Customer Lifetime Value (CLV) Analytics & Segmentation',
      'Predictive Market Analysis & Trend Forecasting',
      'Real-time KPI Tracking & Performance Monitoring',
      'Custom Data Integration from Multiple Sources',
      'Machine Learning-powered Business Insights'
    ],
    color: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-50',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'software-transition',
    title: 'Digital Transformation & Software Transition',
    icon: 'transform',
    shortDescription: 'Seamless ERP migrations, cloud adoption, and process automation that empowers your team and accelerates growth.',
    fullDescription: 'Technology should empower your business, not hinder it. Yet too many organizations struggle with legacy systems that slow them down, creating bottlenecks and frustrating employees. We specialize in the delicate art of digital transformation—managing the complex transition from outdated legacy systems to modern ERPs, cloud platforms, and custom software solutions. What sets us apart is our focus on "The Human Element." Technology is only as good as the people using it, which is why our approach centers on ensuring your staff—whether in Lagos, Abuja, or across Nigeria—are trained, motivated, and productive from day one. We handle everything: legacy data migration and cleaning, custom ERP/CRM configuration and prototyping, comprehensive User Acceptance Testing (UAT), and ongoing staff training and knowledge transfer. We don\'t just install software; we transform how your organization works, making you more efficient, agile, and competitive.',
    features: [
      'Legacy System Assessment & Migration Strategy',
      'Complete Data Migration & Quality Assurance',
      'Custom ERP/CRM Implementation (SAP, Oracle, Odoo, etc.)',
      'Cloud Migration & Infrastructure Modernization',
      'Business Process Re-engineering & Automation',
      'Comprehensive UAT (User Acceptance Testing) Management',
      'Staff Training Programs & Change Management',
      'Post-Implementation Support & Optimization'
    ],
    color: 'text-cyan-600',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-50',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'accounting-operations',
    title: 'Accounting Operations & Financial Strategy',
    icon: 'account_balance_wallet',
    shortDescription: 'Achieve financial clarity with expert accounting, audit readiness, tax optimization, and fractional CFO services.',
    fullDescription: 'Financial clarity isn\'t just about keeping accurate books—it\'s the bedrock of sustainable scalability and investor confidence. We don\'t just "do books"; we engineer your financial health from the ground up. Our team of chartered accountants and financial strategists acts as your internal audit team, compliance officer, and strategic advisor all rolled into one. From ensuring full IFRS and local GAAP compliance to optimizing your tax position for the Nigerian regulatory environment, we cover every aspect of financial management. Need to prepare for an audit? We\'ll make sure you\'re ready. Looking to secure funding? We\'ll present your financials in a way that builds investor confidence. Struggling with cash flow management? We\'ll implement systems that give you real-time visibility and control. Our fractional CFO services give you access to senior financial leadership without the full-time cost, providing strategic guidance on everything from capital allocation to M&A preparation. We help you build the financial foundation that supports ambitious growth.',
    features: [
      'Full IFRS & Local GAAP Compliance Management',
      'Monthly Financial Reporting & Management Accounts',
      'Strategic Tax Planning, Optimization & Remittance',
      'Fractional CFO & Executive Financial Advisory',
      'Audit Preparation & Regulatory Compliance',
      'Internal Control Systems & Fraud Prevention',
      'Cash Flow Forecasting & Working Capital Management',
      'Financial Modeling for Fundraising & Investor Relations',
      'Payroll Management & HR Accounting Integration',
      'Cost Optimization & Profitability Analysis'
    ],
    color: 'text-green-600',
    borderColor: 'border-green-600',
    iconBg: 'bg-green-50',
    heroImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1920&auto=format&fit=crop'
  },
  {
    id: 'business-strategy',
    title: 'Business Strategy & Operational Excellence',
    icon: 'campaign',
    shortDescription: 'Position your business for sustainable growth with investor-ready plans, operational SOPs, and strategic roadmaps.',
    fullDescription: 'The difference between a business and an institution is strategy. Most businesses operate reactively, fighting fires and chasing opportunities without a clear roadmap. We help you build something that lasts—a business positioned not just for this year, but for the next decade. Our strategic consulting goes deep. We craft rigorous business strategies that survive real-world pressures, from market volatility to competitive threats. Whether you\'re seeking capital and need investor-ready business plans and pitch decks, looking to scale operations and need documented SOPs that allow your business to run without you, navigating complex regulatory requirements for licensing in Lagos or across Nigeria, or planning expansion and need growth scenarios with stress testing—we\'ve got you covered. We don\'t offer cookie-cutter solutions. Every strategy we develop is tailored to your specific market position, competitive landscape, and growth ambitions. We work alongside you to identify opportunities, mitigate risks, and build the operational excellence that turns vision into reality. The result? An institution that generates value, not just a job for its founder.',
    features: [
      'Comprehensive Business Plan Development',
      'Investor-Ready Pitch Decks & Financial Projections',
      'Market Research & Competitive Analysis',
      'Institutional SOP Development & Documentation',
      'Business Model Innovation & Revenue Optimization',
      'Regulatory Licensing Support (CAC, FIRS, Industry-specific)',
      'Strategic Partnership & M&A Advisory',
      'Growth Scenarios, Stress Testing & Risk Management',
      'Performance Management Systems & KPI Frameworks',
      'Go-to-Market Strategy & Product Launch Planning'
    ],
    color: 'text-violet-600',
    borderColor: 'border-violet-200',
    iconBg: 'bg-violet-50',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop'
  }
];

// ==================== TEAM MEMBERS ====================
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Adebayo Ogunlesi',
    role: 'Managing Partner & Strategic Advisor',
    bio: 'With over 15 years of experience in management consulting and business strategy, Adebayo leads our strategic advisory practice. He has helped over 50 Nigerian SMEs scale successfully and has a proven track record in digital transformation.',
    image: 'https://images.unsplash.com/photo-1614928001197-55f0724d4ce4?q=80&w=2070&auto=format&fit=crop',
    linkedin: '#',
    email: 'adebayo@sqconsulting.ng',
    order: 1
  },
  {
    id: 'team-2',
    name: 'Chioma Nwosu',
    role: 'Head of Business Intelligence',
    bio: 'Chioma brings deep expertise in data analytics and business intelligence. She has designed and implemented BI solutions for organizations across retail, logistics, and fintech sectors, turning complex data into actionable insights.',
    image: 'https://images.unsplash.com/photo-1582004531597-6407189db7dd?q=80&w=2070&auto=format&fit=crop',
    linkedin: '#',
    email: 'chioma@sqconsulting.ng',
    order: 2
  },
  {
    id: 'team-3',
    name: 'Oluwaseun Adeyemi',
    role: 'Principal Financial Consultant',
    bio: 'A chartered accountant with extensive experience in audit, tax, and financial strategy. Oluwaseun ensures our clients maintain compliance while optimizing their financial operations for growth and profitability.',
    image: 'https://images.pexels.com/photos/5452233/pexels-photo-5452233.jpeg?auto=compress&cs=tinysrgb&w=800',
    linkedin: '#',
    email: 'oluwaseun@sqconsulting.ng',
    order: 3
  },
  {
    id: 'team-4',
    name: 'Funmilayo Hassan',
    role: 'Director of Digital Transformation',
    bio: 'Funmilayo specializes in leading complex ERP migrations and software transitions. Her focus on change management and staff enablement ensures technology implementations deliver real business value.',
    image: 'https://images.pexels.com/photos/20752572/pexels-photo-20752572.jpeg?auto=compress&cs=tinysrgb&w=800',
    linkedin: '#',
    email: 'funmilayo@sqconsulting.ng',
    order: 4
  }
];

// ==================== PROJECTS ====================
export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Enterprise BI Dashboard Implementation',
    client_name: 'Zenith Retail Group',
    industry: 'Retail & Distribution',
    challenge: 'Zenith Retail Group, operating 23 stores across Lagos and Abuja, struggled with inventory visibility and revenue leakage. Manual tracking led to stockouts, overstocking, and inability to identify top-performing products. Management lacked real-time insights to make data-driven decisions.',
    solution: 'We designed and deployed a comprehensive Business Intelligence solution integrating their POS systems, inventory databases, and financial records into a unified PowerBI dashboard. The solution included automated daily reporting, predictive inventory forecasting, and real-time sales analytics accessible to regional managers via mobile devices.',
    results: 'Within 6 months: 28% reduction in inventory carrying costs, 34% improvement in stock availability, 15% increase in gross margins through better product mix optimization, and real-time visibility enabling faster decision-making. The solution has now been expanded to cover all 23 locations.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop',
    featured: true,
    completed_date: 'December 2024'
  },
  {
    id: 'project-2',
    title: 'Complete Digital Transformation & ERP Migration',
    client_name: 'ProLogistics Nigeria',
    industry: 'Logistics & Supply Chain',
    challenge: 'ProLogistics was running on a patchwork of outdated software systems—spreadsheets for dispatch, a legacy DOS-based system for fleet management, and paper-based invoicing. This created inefficiencies, errors, and limited their ability to scale beyond 50 vehicles.',
    solution: 'We led a comprehensive 9-month digital transformation project, migrating them to a modern cloud-based ERP system (Odoo). This included complete data migration from legacy systems, custom module development for Nigerian compliance requirements, integration with their accounting software, and intensive staff training programs conducted across 3 regional hubs.',
    results: 'The transformation delivered remarkable outcomes: 45% reduction in dispatch errors, 60% faster invoice processing, 100% real-time fleet visibility, and successful scaling from 50 to 120 vehicles within 12 months. Staff adoption rate exceeded 90% thanks to our comprehensive training program, and the client secured Series A funding shortly after implementation.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop',
    featured: true,
    completed_date: 'October 2024'
  }
];

// ==================== CAREER OPENINGS ====================
export const CAREER_OPENINGS: CareerOpening[] = [];

// ==================== BLOG POSTS (Initial Sample) ====================
// ==================== BLOG POSTS (Initial Sample) ====================
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'nigerian-tax-2025',
    title: 'Navigating the 2025 Nigerian Tax Landscape: What MSMEs Need to Know',
    slug: 'nigerian-tax-2025',
    excerpt: 'The Nigerian fiscal landscape is undergoing significant changes in 2025. Key updates to digital tax collection, VAT thresholds, and compliance requirements every business owner needs to prepare for.',
    content: `<h2>Introduction</h2><p>The Nigerian fiscal landscape is undergoing a radical shift in 2025. With new digital tax collection mandates and changes to VAT thresholds, small and medium enterprises must audit their books to avoid heavy penalties.</p><h2>Key Changes</h2><ul><li><strong>Digital Tax Mandates:</strong> All businesses with annual revenue above ₦25 million must now file taxes electronically through the FIRS portal.</li><li><strong>VAT Threshold Adjustments:</strong> New VAT registration thresholds and compliance requirements.</li><li><strong>Transfer Pricing:</strong> Stricter enforcement for businesses with related-party transactions.</li></ul><h2>What You Need to Do</h2><p>Ensure your accounting systems are up-to-date, maintain proper documentation, and consider professional tax advisory to optimize your tax position while remaining compliant.</p>`,
    category: 'Finance',
    author: 'Oluwaseun Adeyemi',
    published: true,
    cover_image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1770&auto=format&fit=crop',
    created_at: new Date('2025-01-15'),
    updated_at: new Date('2025-01-15'),
    comments: [],
    readTime: '5 min read'
  },
  {
    id: 'bi-for-msmes',
    title: 'Why Data is the New Oil for Lagos Retailers',
    slug: 'data-driven-retail',
    excerpt: 'How local businesses are using predictive analytics to double their seasonal revenue. Real-world examples from Nigerian retailers leveraging data for competitive advantage.',
    content: `<h2>The Data Revolution in Retail</h2><p>Data is no longer a luxury reserved for big corporations. Local retailers in areas like Ikeja, Lekki, and Victoria Island are increasingly leveraging customer purchase patterns to optimize inventory and predict demand.</p><h2>Real Success Stories</h2><p>One fashion retailer in Lekki used basic sales analytics to identify their top-performing products by season, reducing dead stock by 40% and increasing profitability significantly.</p><h2>Getting Started</h2><p>You don't need expensive tools to start. Even a well-maintained Excel spreadsheet with daily sales data can reveal powerful insights when analyzed correctly.</p>`,
    category: 'Data',
    author: 'Chioma Nwosu',
    published: true,
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop',
    created_at: new Date('2025-01-10'),
    updated_at: new Date('2025-01-10'),
    comments: [],
    readTime: '4 min read'
  }
];

// ==================== SUCCESS STORIES ====================
export const SUCCESS_STORIES = [
  {
    id: 1,
    client: "Lagos Agri-Industrial Group",
    industry: "Agriculture & Agribusiness",
    challenge: "Manual inventory tracking across 5 regional hubs led to significant waste, untraceable losses, and inability to optimize supply chain operations.",
    solution: "Custom inventory BI dashboard with real-time tracking, automated alerts, and localized staff training in ERP basics across all hubs.",
    impact: "22% reduction in operational waste within 6 months, ₦12M in recovered losses, and secured ₦50M expansion funding based on improved financial visibility.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 2,
    client: "Sterling FinServe",
    industry: "FinTech & Digital Finance",
    challenge: "Rapid growth phase complicated by complex regulatory reporting requirements and tax compliance challenges, risking penalties and investor confidence.",
    solution: "Fractional CFO services, automated tax remittance workflow implementation, and comprehensive financial controls framework.",
    impact: "Zero-penalty audit record maintained for 18 months, 15% increase in operational efficiency, successful Series A fundraising of $2M.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 3,
    client: "Modern Spaces Ltd",
    industry: "Real Estate & Property Development",
    challenge: "Fragmented project management processes, lack of financial visibility, and difficulty tracking multiple ongoing development projects simultaneously.",
    solution: "Implemented integrated project management and financial tracking system, established SOPs for project delivery, and provided financial strategy advisory.",
    impact: "30% improvement in project delivery timelines, complete financial transparency across 8 active projects, and 40% increase in profitability per project.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop"
  }
];

// ==================== COMPANY INFO ====================
export const COMPANY_INFO = {
  name: 'SQ Consulting',
  tagline: 'Delivering Values...',
  founded: '2018',
  location: 'Lagos, Nigeria',
  email: 'hello@sqconsulting.ng',
  phone: '+234 XXX XXX XXXX',
  address: 'Lagos Island, Lagos, Nigeria',

  about: {
    mission: 'To empower Nigerian businesses with world-class consulting services that drive measurable growth, operational excellence, and sustainable competitive advantage.',
    vision: 'To be the most trusted business consulting partner for growth-stage companies across Nigeria and West Africa, known for delivering exceptional results and transformative impact.',
    values: [
      {
        title: 'Excellence',
        description: 'We hold ourselves to the highest standards of quality and professionalism in everything we do.',
        icon: 'star'
      },
      {
        title: 'Integrity',
        description: 'We operate with transparency, honesty, and ethical principles in all our client relationships.',
        icon: 'verified'
      },
      {
        title: 'Impact',
        description: 'We measure our success by the tangible results and transformative outcomes we deliver for clients.',
        icon: 'trending_up'
      },
      {
        title: 'Innovation',
        description: 'We embrace cutting-edge methodologies and technologies to solve complex business challenges.',
        icon: 'lightbulb'
      },
      {
        title: 'Partnership',
        description: 'We work alongside our clients as trusted partners, invested in their long-term success.',
        icon: 'handshake'
      }
    ]
  },

  whyChooseUs: [
    {
      title: 'Nigerian Market Expertise',
      description: 'Deep understanding of the Nigerian business environment, regulatory landscape, and market dynamics.',
      icon: 'location_on'
    },
    {
      title: 'Proven Track Record',
      description: 'Over 50 successful client engagements with measurable ROI and transformative business outcomes.',
      icon: 'verified_user'
    },
    {
      title: 'End-to-End Solutions',
      description: 'Comprehensive services from strategy to implementation, ensuring seamless execution and lasting results.',
      icon: 'settings'
    },
    {
      title: 'Senior Expertise',
      description: 'Direct access to seasoned consultants with 10+ years of experience, not junior analysts.',
      icon: 'workspace_premium'
    }
  ]
};
