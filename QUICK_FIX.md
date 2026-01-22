# ⚡ QUICK FIX - 5 Minutes

## Problem
- Blogs don't show up after creating them
- Careers page is blank
- Banners don't work

## Why
**Supabase tables don't exist yet!**

## Solution

### 1. Open Supabase
https://app.supabase.com → Click your project

### 2. SQL Editor
Click "SQL Editor" → "New Query"

### 3. Copy & Paste
Open `SUPABASE_SETUP.sql` → Copy ALL → Paste in Supabase

### 4. Run
Click "Run" button (or Ctrl+Enter)

### 5. Verify
Go to "Table Editor" → Should see these tables:
- ✅ submissions
- ✅ blogs (NEW)
- ✅ careers (NEW)
- ✅ banners (NEW)
- ✅ admin_users

## Done! 🎉

Now create content in: http://localhost:5173/#/admin (password: admin123)

---

## Verify It Worked

Visit: http://localhost:5173/#/diagnostics

Should show ✅ for all tables

---

## If Something Goes Wrong

1. **Still see ❌ on diagnostics?**
   - Run the SQL again
   - Wait 10 seconds
   - Refresh page

2. **Got SQL errors?**
   - That's OK! Errors are handled gracefully
   - Just run again

3. **Tables don't show in Table Editor?**
   - Refresh page
   - Make sure you're logged into Supabase
   - Check you're in the right project

---

## What Gets Created

| Table | Purpose | Rows |
|-------|---------|------|
| blogs | Store blog posts | 0 (you add them) |
| careers | Store job openings | 0 (you add them) |
| banners | Store popups/announcements | 0 (you add them) |
| submissions | Contact form messages | (auto) |
| admin_users | Admin accounts | (auto) |

---

**Questions?** See `DATABASE_SETUP_GUIDE.md` for detailed troubleshooting
