-- Admin Dashboard Revamp - Database Setup SQL
-- Copy and paste these SQL commands into your Supabase SQL editor

-- ============ TABLE SETUP ============

-- 1. Site Settings Table (NEW)
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  hero_enabled BOOLEAN DEFAULT true,
  services_enabled BOOLEAN DEFAULT true,
  testimonials_enabled BOOLEAN DEFAULT true,
  careers_enabled BOOLEAN DEFAULT true,
  blog_enabled BOOLEAN DEFAULT true,
  team_members JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT site_settings_single_row CHECK (id = 1)
);

-- 2. Blogs Table (ensure exists and has all fields)
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  author VARCHAR(255),
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Careers Table (ensure exists and has all fields)
CREATE TABLE IF NOT EXISTS careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  type VARCHAR(50) DEFAULT 'Full-time',
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Banners Table (ensure exists with delay_seconds)
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  delay_seconds INTEGER DEFAULT 3,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Submissions Table (ensure exists)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Admin Users Table (ensure exists)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  verification_code VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============ INDEXES FOR PERFORMANCE ============

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_careers_department ON careers(department);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON careers(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(is_active);
CREATE INDEX IF NOT EXISTS idx_banners_order ON banners("order");

CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_is_read ON submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- ============ INSERT DEFAULT SETTINGS ============

-- Insert default site settings (only if doesn't exist)
INSERT INTO site_settings (id, hero_enabled, services_enabled, testimonials_enabled, careers_enabled, blog_enabled)
VALUES (1, true, true, true, true, true)
ON CONFLICT (id) DO NOTHING;

-- ============ ENABLE ROW LEVEL SECURITY ============

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============ CREATE RLS POLICIES ============

-- Site Settings - Public read, Admin only write
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin write" ON site_settings FOR UPDATE USING (true);

-- Blogs - Public read published, Admin CRUD all
CREATE POLICY "Allow public read published" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Allow admin read all" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow admin create" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update" ON blogs FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete" ON blogs FOR DELETE USING (true);

-- Careers - Public read, Admin CRUD
CREATE POLICY "Allow public read" ON careers FOR SELECT USING (true);
CREATE POLICY "Allow admin create" ON careers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update" ON careers FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete" ON careers FOR DELETE USING (true);

-- Banners - Public read active, Admin CRUD all
CREATE POLICY "Allow public read active" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin read all" ON banners FOR SELECT USING (true);
CREATE POLICY "Allow admin create" ON banners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update" ON banners FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete" ON banners FOR DELETE USING (true);

-- Submissions - Admin only
CREATE POLICY "Allow admin read" ON submissions FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update" ON submissions FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete" ON submissions FOR DELETE USING (true);

-- Admin Users - Admin only
CREATE POLICY "Allow admin read" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Allow admin write" ON admin_users FOR UPDATE USING (true);

-- ============ SAMPLE DATA ============

-- Insert sample team members (optional)
UPDATE site_settings 
SET team_members = jsonb_build_array(
  jsonb_build_object(
    'id', '1',
    'name', 'John Smith',
    'position', 'Lead Consultant',
    'image', '',
    'bio', 'Expert in digital transformation'
  ),
  jsonb_build_object(
    'id', '2',
    'name', 'Sarah Johnson',
    'position', 'Strategy Director',
    'image', '',
    'bio', 'Specializes in business strategy'
  )
)
WHERE id = 1;

-- ============ VERIFICATION QUERIES ============

-- Check if all tables exist and have data
SELECT 'site_settings' as table_name, COUNT(*) as row_count FROM site_settings
UNION ALL
SELECT 'blogs', COUNT(*) FROM blogs
UNION ALL
SELECT 'careers', COUNT(*) FROM careers
UNION ALL
SELECT 'banners', COUNT(*) FROM banners
UNION ALL
SELECT 'submissions', COUNT(*) FROM submissions
UNION ALL
SELECT 'admin_users', COUNT(*) FROM admin_users;

-- Verify site_settings has been created
SELECT * FROM site_settings WHERE id = 1;

-- Check indexes
SELECT schemaname, tablename, indexname FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- ============ BACKUP IMPORTANT DATA ============

-- To backup important data before making changes:
-- 1. Export current data:
--    SELECT * FROM blogs;
--    SELECT * FROM careers;
--    SELECT * FROM banners;
--    SELECT * FROM submissions;

-- 2. Save as CSV for external backup

-- ============ NOTES ============

/*
IMPORTANT NOTES:

1. Replace 'true' in RLS policies with actual authentication check if needed:
   auth.uid() = user_id  -- if storing user_id in tables

2. Adjust RLS policies based on your security requirements

3. Enable database webhooks in Supabase for real-time updates:
   - Go to Database > Webhooks
   - Create webhook for blogs table (insert, update, delete)
   - Create webhook for careers table (insert, update, delete)
   - Create webhook for banners table (insert, update, delete)

4. Set up automatic backups in Supabase project settings

5. Test all CRUD operations after setup:
   - Create new blog post
   - Edit blog post
   - Delete blog post
   - Create career opening
   - Edit/delete career
   - Create banner
   - Edit/delete banner

6. Monitor database usage and performance

7. Keep track of database size growth

8. Regular maintenance:
   - Vacuum tables monthly
   - Analyze query performance
   - Check for unused indexes
*/
