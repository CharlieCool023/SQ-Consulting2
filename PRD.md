# SQ Consulting - Product Requirements Document (PRD)

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Status:** Active

---

## 1. Executive Summary

**SQ Consulting** is a modern, digital-first business consulting platform serving Nigeria and Africa's growth-stage companies. The application provides a comprehensive web presence and internal management system for a consulting firm specializing in Business Intelligence, Digital Transformation, Financial Strategy, and Operational Excellence.

The platform enables potential clients to discover services, read case studies and insights, apply for jobs, and engage with the firm through contact forms and booking systems. Internally, it provides a full admin dashboard for managing content, banners, blog posts, career openings, and analytics.

---

## 2. Product Overview

### 2.1 Company Profile
- **Name:** SQ Consulting
- **Focus:** Strategic business consulting for growth-stage companies in Nigeria and Africa
- **Core Expertise:**
  - Business Intelligence & Data Analytics
  - Digital Transformation & Software Transition
  - Accounting Operations & Financial Strategy
  - Business Strategy & Operational Excellence

### 2.2 Platform Purpose
The application serves two primary stakeholders:
1. **External Users (Clients/Prospects):** Discover services, access insights, apply for careers, and book consultations
2. **Internal Admin Users:** Manage all platform content, marketing materials, and operational data

### 2.3 Technology Stack
- **Frontend:** React 18+, TypeScript, Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL with RLS policies)
- **Routing:** React Router with hash-based navigation
- **Icons:** Material Design Icons
- **Content Editor:** React Quill for rich text editing
- **Notifications:** React Toastify for toast messages
- **Hosting:** Vite-based SPA (Single Page Application)

---

## 3. User Personas & Use Cases

### 3.1 External Users (Public Visitors)

#### Persona 1: Business Owner/Executive (Decision Maker)
- **Goal:** Find reliable consulting services for business transformation
- **Behavior:** Browses services, reads success stories, schedules consultations
- **Needs:** Clear service descriptions, proof of expertise, easy booking

#### Persona 2: HR/Operations Manager (Process Evaluator)
- **Goal:** Identify consulting firm for specific operational challenges
- **Behavior:** Reads case studies, researches team expertise, applies for talent partnerships
- **Needs:** Technical depth, case studies, contact information

#### Persona 3: Job Seeker (Career Applicant)
- **Goal:** Find and apply for consulting career opportunities
- **Behavior:** Browses open positions, submits applications with resume
- **Needs:** Clear job descriptions, easy application process, status tracking

### 3.2 Internal Users (Admin)

#### Persona: Admin/Content Manager
- **Goal:** Manage all platform content and marketing materials
- **Behavior:** Creates/edits services, blog posts, career openings; manages banners and settings
- **Needs:** Intuitive interface, rich text editing, batch operations, content scheduling

---

## 4. Core Features & Functionality

### 4.1 Public Website Features

#### 4.1.1 Home Page
- **Hero Section:** Compelling call-to-action with featured banner/image
- **Who We Are:** Company mission and vision
- **Why Choose Us:** Key differentiators and competitive advantages
- **Featured Services:** Quick links to core service offerings
- **Success Stories:** Case studies showcasing client results (carousel/grid)
- **Team Members:** Leadership and key personnel showcase
- **Featured Blog Posts:** Latest insights and thought leadership
- **Testimonials:** Client feedback and quotes
- **CTA Section:** "Schedule a Free Consultation" button

#### 4.1.2 Services Page
- **Service Catalog:** All 4 core services displayed with:
  - Service title and icon
  - Short description (teaser)
  - Full detailed description
  - Key features list (8+ features per service)
  - Service imagery
  - "Learn More" links to individual service pages

#### 4.1.3 Service Detail Page
- **Full Service Information:**
  - Comprehensive service description
  - Detailed features breakdown
  - Use cases and industries served
  - Outcomes and benefits
  - Related services recommendations
- **CTAs:** "Book Consultation" and "Get in Touch"

#### 4.1.4 Blog/Insights Page
- **Blog Listing:**
  - Published blog posts in chronological order
  - Post cards with: title, excerpt, author, publication date, category, cover image
  - Read time estimate
  - Filtering by category (optional)
  - Pagination or load-more functionality
- **Individual Blog Post View:**
  - Full post content with rich formatting
  - Author information
  - Publication metadata
  - Related posts (optional)
  - Share buttons

#### 4.1.5 Success Stories/Case Studies Page
- **Case Study Showcase:**
  - Project gallery with: client name, industry, challenge, solution, results
  - Filterable by industry or outcome
  - Individual case study detail pages

#### 4.1.6 Careers Page
- **Job Listings:**
  - Open positions with: title, department, location, employment type, key requirements
  - "Apply Now" button for each position
  - Search/filter functionality

#### 4.1.7 Job Application Page
- **Application Form:**
  - Job position selection
  - Applicant information (name, email, phone)
  - Resume upload
  - Cover letter/motivation (optional)
  - Form validation and submission
  - Success confirmation

#### 4.1.8 About Page
- **Company Information:**
  - Full company story and background
  - Team members with bios
  - Core values and mission statement
  - Company timeline/milestones

#### 4.1.9 Contact Page
- **Contact Form:**
  - Name, email, phone, company
  - Subject line
  - Message body
  - Form submission and confirmation
  - Contact information display (email, phone, address)

#### 4.1.10 Banner Popup System
- **Promotional Banners:**
  - Auto-display when page loads
  - Configurable delay before appearing
  - Auto-fade-out after 5 seconds (if not manually closed)
  - Users can manually close with close button
  - Session-based dismissal (won't re-appear during same session)
  - Supports: title, description, image, call-to-action link

### 4.2 Booking Modal
- **"Book Consultation" Feature:**
  - Name, email, phone, company fields
  - Service selection dropdown
  - Preferred date picker
  - Message textarea
  - Form validation
  - Submission confirmation
  - Success notification

### 4.3 Admin Dashboard Features

#### 4.3.1 Dashboard Overview
- **Quick Stats:**
  - Total website submissions/inquiries
  - Recent job applications
  - Active blog posts
  - Open career positions
  - Recent visitor activity

#### 4.3.2 Blog Management
- **Create/Edit Blog Posts:**
  - Title and slug generation
  - Rich text editor (React Quill)
  - Category selection
  - Author assignment
  - Cover image upload
  - Excerpt/summary
  - Publish toggle
  - Creation and update timestamps
- **Blog List View:**
  - All posts with status (published/draft)
  - Edit and delete operations
  - Search and sort functionality

#### 4.3.3 Career Management
- **Create/Edit Career Openings:**
  - Job title and department
  - Employment type (Full-time, Contract, Internship)
  - Location
  - Detailed job description (rich text)
  - Requirements list
  - Salary range (optional)
  - Status (open/closed)
- **Career List View:**
  - All positions with applicant count
  - Edit and delete operations
  - View applications

#### 4.3.4 Banner Management
- **Create/Edit Promotional Banners:**
  - Banner title and description
  - Image upload
  - Link URL (optional call-to-action)
  - Display delay (in seconds)
  - Display order
  - Active/inactive toggle
  - Timestamps
- **Banner List View:**
  - All banners with status
  - Edit and delete operations
  - Preview functionality

#### 4.3.5 Contact Form Submissions
- **Inquiry Management:**
  - View all submitted inquiries
  - Mark as read/unread
  - Filter by status and date
  - Delete submissions
  - Export functionality (optional)

#### 4.3.6 Job Applications
- **Application Management:**
  - View all applications
  - Filter by position, date, status
  - Download resumes
  - Mark as reviewed/shortlisted/rejected
  - Send status update email (optional)

#### 4.3.7 Settings
- **System Settings:**
  - Change admin password
  - Company information
  - Contact information
  - Email settings
  - Display preferences

---

## 5. Data Models & Database Schema

### 5.1 Core Entities

#### Services (Static/Code-managed)
```
id: string
title: string
icon: string
shortDescription: string
fullDescription: string
features: string[]
color: string
borderColor: string
iconBg: string
heroImage: string
```

#### BlogPost
```
id: uuid
title: string
slug: string (auto-generated from title)
excerpt: string
content: string (rich HTML)
category: string
author: string
published: boolean
cover_image: string (URL)
created_at: timestamp
updated_at: timestamp
comments: array (future use)
readTime?: string
```

#### CareerOpening
```
id: uuid
title: string
department: string
type: 'Full-time' | 'Contract' | 'Internship'
location: string
description: string (rich HTML)
requirements: string[]
created_at: timestamp
updated_at: timestamp
```

#### Banner
```
id: uuid
title: string
description?: string
image_url?: string
link_url?: string
order?: number
is_active: boolean
delay_seconds?: number
created_at: timestamp
updated_at: timestamp
```

#### ContactSubmission
```
id: uuid
name: string
email: string
phone: string
company: string
subject: string
message: string
is_read: boolean
created_at: timestamp
```

#### BookingRequest
```
id: uuid
name: string
email: string
phone: string
company: string
service?: string
preferred_date: date
message: string
created_at: timestamp
```

#### JobApplication
```
id: uuid
job_id: uuid (references CareerOpening)
applicant_name: string
email: string
phone: string
resume_url: string (file URL)
cover_letter?: string
status: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected'
created_at: timestamp
```

---

## 6. Key Features & Requirements

### 6.1 Content Management
- ✅ Rich text editing for blog posts and job descriptions
- ✅ Image upload and management
- ✅ Auto-slug generation from titles
- ✅ Draft/publish workflow for blog posts
- ✅ Status tracking for career positions and banners
- ✅ Timestamps for audit trail

### 6.2 User Engagement
- ✅ Booking consultation modal accessible from any page
- ✅ Contact form with field validation
- ✅ Job application workflow
- ✅ Banner promotional system with auto-fade
- ✅ Toast notifications for user actions
- ✅ Form validation and error messaging

### 6.3 Performance & UX
- ✅ Fast page loads with Vite bundling
- ✅ Responsive design (mobile-first with Tailwind)
- ✅ Hash-based routing (no server-side routing needed)
- ✅ Client-side caching for banner data
- ✅ Material Design Icons for consistency
- ✅ Smooth animations and transitions

### 6.4 Security & Access Control
- ✅ Supabase Row-Level Security (RLS) policies
- ✅ Admin authentication
- ✅ Protected admin routes
- ✅ Email verification for password resets
- ✅ Session-based banner dismissal

### 6.5 Scalability
- ✅ Unlimited blog posts and content
- ✅ Multiple career positions
- ✅ Flexible banner system
- ✅ Form submission history
- ✅ Audit timestamps on all records

---

## 7. User Flows

### 7.1 Public User Journey
```
Landing → Services Page → Service Detail → Book Consultation → Contact Form
         ↓
         Blog/Insights → Read Article → Share/Bookmark
         ↓
         Success Stories → View Case Study
         ↓
         Careers → View Position → Apply for Job → Submit Application
         ↓
         About → Team Info → Contact
```

### 7.2 Admin User Journey
```
Login → Admin Dashboard → 
  ├─ Blog Management (Create/Edit/Delete Posts)
  ├─ Career Management (Post Openings, View Applications)
  ├─ Banner Management (Create Promotional Banners)
  ├─ Form Submissions (View Inquiries & Applications)
  └─ Settings (Update Company Info, Password)
```

---

## 8. Non-Functional Requirements

### 8.1 Performance
- Page load time: < 3 seconds
- Build bundle size: < 500KB (gzipped)
- Time to Interactive (TTI): < 2 seconds
- Core Web Vitals targets met

### 8.2 Reliability
- 99.5% uptime SLA (via Supabase)
- Automatic error logging and recovery
- Form submission failure handling

### 8.3 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

### 8.4 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 9. Future Roadmap (Phase 2+)

### 9.1 Phase 2 Features
- [ ] Email notification system for form submissions
- [ ] Admin email templates
- [ ] Job application status email notifications
- [ ] Advanced analytics dashboard
- [ ] Blog post scheduling
- [ ] Multi-language support
- [ ] SEO optimization enhancements
- [ ] Google Analytics integration

### 9.2 Phase 3 Features
- [ ] Client portal for project tracking
- [ ] Booking calendar system with availability
- [ ] Document management system
- [ ] Team member profiles with expertise tagging
- [ ] Client testimonial submission form
- [ ] Success metric tracking
- [ ] Integration with CRM (HubSpot/Salesforce)

### 9.3 Advanced Features
- [ ] AI-powered chatbot for common inquiries
- [ ] Video testimonials support
- [ ] Live consulting availability checker
- [ ] Multi-currency support
- [ ] Payment integration for service packages
- [ ] Client project management dashboard

---

## 10. Success Metrics

### 10.1 Business Metrics
- Number of consultation bookings per month
- Contact form submissions
- Job applications received
- Blog post engagement (views, shares)
- Client case study impact

### 10.2 Technical Metrics
- Page load performance
- Error rate and uptime
- Form submission success rate
- User retention and repeat visits
- Mobile vs desktop traffic ratio

---

## 11. Constraints & Assumptions

### 11.1 Constraints
- Single admin user (future multi-user support in Phase 2)
- No payment processing (out of scope)
- No video hosting (external links only)
- Limited to Supabase capacity limits

### 11.2 Assumptions
- Users have modern browsers
- Form submissions are from legitimate users
- Blog and career content is managed internally
- Consulting engagements happen outside platform

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **RLS** | Row-Level Security - database access control at row level |
| **SPA** | Single Page Application - app runs in browser without server-side routing |
| **UUID** | Universally Unique Identifier - random unique ID |
| **Rich Text** | Formatted text with bold, italic, links, lists, etc. |
| **CTA** | Call-To-Action - button or link encouraging user action |
| **TTI** | Time to Interactive - when page becomes fully interactive |
| **WCAG** | Web Content Accessibility Guidelines |

---

## 13. Approval & Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | [Name] | | |
| Tech Lead | [Name] | | |
| Project Manager | [Name] | | |

---

**End of Document**
