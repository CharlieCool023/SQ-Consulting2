-- ===================== SUBMISSIONS TABLE =====================
CREATE TABLE IF NOT EXISTS public.submissions (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  subject text default 'General Inquiry',
  message text,
  is_read boolean default false
);

-- Enable RLS on submissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for submissions
DROP POLICY IF EXISTS "Allow public inserts" ON public.submissions;
DROP POLICY IF EXISTS "Allow public select" ON public.submissions;
DROP POLICY IF EXISTS "Allow public update" ON public.submissions;
DROP POLICY IF EXISTS "Allow public delete" ON public.submissions;

CREATE POLICY "Allow public inserts" ON public.submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON public.submissions
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON public.submissions
  FOR DELETE USING (true);

-- ===================== BLOGS TABLE =====================
CREATE TABLE IF NOT EXISTS public.blogs (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique,
  excerpt text,
  content text,
  author text,
  category text,
  cover_image text,
  published boolean default false,
  comments jsonb default '[]'::jsonb
);

-- Enable RLS on blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blogs
DROP POLICY IF EXISTS "Allow public inserts blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public select blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public delete blogs" ON public.blogs;

CREATE POLICY "Allow public inserts blogs" ON public.blogs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select blogs" ON public.blogs
  FOR SELECT USING (true);

CREATE POLICY "Allow public update blogs" ON public.blogs
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete blogs" ON public.blogs
  FOR DELETE USING (true);

-- ===================== CAREERS TABLE =====================
CREATE TABLE IF NOT EXISTS public.careers (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text,
  department text not null,
  type text default 'Full-time',
  location text not null,
  description text,
  requirements jsonb default '[]'::jsonb
);

-- Enable RLS on careers
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for careers
DROP POLICY IF EXISTS "Allow public inserts careers" ON public.careers;
DROP POLICY IF EXISTS "Allow public select careers" ON public.careers;
DROP POLICY IF EXISTS "Allow public update careers" ON public.careers;
DROP POLICY IF EXISTS "Allow public delete careers" ON public.careers;

CREATE POLICY "Allow public inserts careers" ON public.careers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select careers" ON public.careers
  FOR SELECT USING (true);

CREATE POLICY "Allow public update careers" ON public.careers
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete careers" ON public.careers
  FOR DELETE USING (true);

-- ===================== BANNERS TABLE =====================
CREATE TABLE IF NOT EXISTS public.banners (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  image_url text,
  link text,
  active boolean default true,
  show_delay integer default 0,
  "order" integer default 0
);

-- Enable RLS on banners
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for banners
DROP POLICY IF EXISTS "Allow public inserts banners" ON public.banners;
DROP POLICY IF EXISTS "Allow public select banners" ON public.banners;
DROP POLICY IF EXISTS "Allow public update banners" ON public.banners;
DROP POLICY IF EXISTS "Allow public delete banners" ON public.banners;

CREATE POLICY "Allow public inserts banners" ON public.banners
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select banners" ON public.banners
  FOR SELECT USING (true);

CREATE POLICY "Allow public update banners" ON public.banners
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete banners" ON public.banners
  FOR DELETE USING (true);

-- ===================== ADMIN_USERS TABLE =====================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id bigint primary key generated always as identity,
  email text unique not null,
  password_hash text not null,
  email_verified boolean default false,
  verification_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
DROP POLICY IF EXISTS "Allow public select admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow public insert admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow public update admin_users" ON public.admin_users;

CREATE POLICY "Allow public select admin_users" ON public.admin_users
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert admin_users" ON public.admin_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update admin_users" ON public.admin_users
  FOR UPDATE USING (true) WITH CHECK (true);

-- ===================== INDEXES FOR PERFORMANCE =====================
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON public.submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON public.submissions(email);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON public.careers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_banners_active ON public.banners(active);
CREATE INDEX IF NOT EXISTS idx_banners_order ON public.banners("order");

-- ===================== FINAL VERIFICATION =====================
-- Run these queries to verify tables exist:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

