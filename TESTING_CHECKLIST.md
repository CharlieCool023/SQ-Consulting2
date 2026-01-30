# Testing Checklist - Admin Dashboard & Banner Fixes

## Pre-Testing Setup
- [ ] Restart your development server (npm run dev or yarn dev)
- [ ] Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- [ ] Close all browser tabs with the app and reopen in fresh tab
- [ ] Open browser DevTools (F12) and go to Console tab

## Critical: Database Schema Verification

**BEFORE running any tests**, verify your Supabase banners table has these columns:**

```
- id (UUID)
- title (VARCHAR)
- description (TEXT)
- image_url (TEXT)
- link_url (VARCHAR)
- is_active (BOOLEAN) ← CRITICAL
- delay_seconds (INTEGER) ← MUST EXIST (not "show_delay")
- order (INTEGER) ← MUST EXIST
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**If any column is missing**, run this in Supabase SQL Editor:
```sql
-- Add missing delay_seconds column (if missing)
ALTER TABLE banners ADD COLUMN IF NOT EXISTS delay_seconds INTEGER DEFAULT 3;

-- Add missing order column (if missing)
ALTER TABLE banners ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;

-- Ensure is_active exists and has default
ALTER TABLE banners ALTER COLUMN is_active SET DEFAULT true;
```

---

## Test Suite 1: Banner Creation Flow

### Test 1.1: Create First Banner
**Steps:**
1. Navigate to Admin Dashboard: `http://localhost:5173/#/admin`
2. Enter password: `admin123` and login
3. Click "Banners" in the sidebar
4. Fill in the form:
   - Title: `Welcome Banner`
   - Description: `This is a test banner`
   - Leave image and link optional
5. Click "Create Banner" button

**Expected Results:**
- [ ] Toast notification shows: "Banner created successfully"
- [ ] No errors in browser console
- [ ] Banner count below "Banners" heading changes from 0 to 1
- [ ] New banner appears in the list with title "Welcome Banner"
- [ ] Form fields reset/clear

**If Failed:**
- Check browser Console for JavaScript errors
- Check Network tab - look for POST request to `/banners`
- Check response status (should be 200 or 201)

---

### Test 1.2: Create Second Banner with Image
**Steps:**
1. Stay on Banners tab
2. Fill in form:
   - Title: `Holiday Sale`
   - Description: `Special holiday promotion`
   - Add an image (or any small image file)
   - Link URL: `https://example.com/sale` (optional)
3. Click "Create Banner"

**Expected Results:**
- [ ] Toast shows success
- [ ] Banner count increases to 2
- [ ] New banner shows in list with image thumbnail

---

### Test 1.3: Verify Banners Persist on Reload
**Steps:**
1. After creating banners (Test 1.1 and 1.2)
2. Refresh the page (F5)
3. Login again if needed

**Expected Results:**
- [ ] Banner count shows 2
- [ ] Both banners still appear in the list
- [ ] All banner data (title, description, images) loaded correctly

---

### Test 1.4: Edit Banner
**Steps:**
1. Click edit icon on first banner
2. Change title to: `Updated Welcome Banner`
3. Click "Save Banner"

**Expected Results:**
- [ ] Toast shows: "Banner updated successfully"
- [ ] Banner list reflects the new title immediately

---

### Test 1.5: Delete Banner
**Steps:**
1. Click delete icon on the first banner
2. Confirm deletion in dialog

**Expected Results:**
- [ ] Toast shows: "Banner deleted successfully"
- [ ] Banner count decreases to 1
- [ ] Deleted banner no longer appears in list

---

## Test Suite 2: Admin Layout (Navbar/Footer Removal)

### Test 2.1: Navbar Not Showing on Admin Page
**Steps:**
1. Navigate to Admin Dashboard: `http://localhost:5173/#/admin`
2. Login

**Expected Results:**
- [ ] Public navbar is NOT visible at the top
- [ ] No logo/menu items from public navbar visible
- [ ] Sidebar is the only navigation element
- [ ] Page doesn't have the public header styling

---

### Test 2.2: Footer Not Showing on Admin Page
**Steps:**
1. On Admin Dashboard, scroll to bottom of page

**Expected Results:**
- [ ] Public footer (with company info, links, etc.) is NOT visible
- [ ] Admin footer IS visible with text like "Admin Dashboard", "Need Help?", "Documentation"
- [ ] Admin footer has a different style than public footer

---

### Test 2.3: Navbar Shows on Public Pages
**Steps:**
1. Click Home in browser history or navigate to: `http://localhost:5173/#/`
2. Or use any public page like `/services`, `/about`, `/contact`

**Expected Results:**
- [ ] Public navbar IS visible at top
- [ ] Logo, menu items visible
- [ ] Public footer IS visible at bottom
- [ ] Public footer has company info and links

---

### Test 2.4: All Admin Tabs Work (Layout Check)
**Steps:**
1. Go to each tab in admin sidebar:
   - Dashboard
   - Messages
   - Blog Posts
   - Careers
   - Banners
   - Settings
2. Check each page

**Expected Results:**
- [ ] No public navbar on any admin tab
- [ ] No public footer on any admin tab
- [ ] Admin footer visible on all admin tabs
- [ ] Content doesn't overlap with navbar/footer

---

## Test Suite 3: Banner Display on Homepage

### Test 3.1: Banner Shows as Popup on Homepage
**Prerequisites:** At least 1 active banner created in admin

**Steps:**
1. Create a banner in admin (if not done)
2. Ensure banner has `is_active: true` (default)
3. Navigate to homepage: `http://localhost:5173/#/`
4. Wait for 3 seconds (default delay_seconds)

**Expected Results:**
- [ ] Banner popup appears after 3 seconds
- [ ] Popup shows banner title and description
- [ ] If image exists, image displays in popup
- [ ] Close button (X) works and closes popup
- [ ] If link exists, clicking banner navigates to link

---

### Test 3.2: Banner Doesn't Show When Inactive
**Steps:**
1. Go to Admin → Banners
2. Edit a banner and toggle `is_active` to OFF/false
3. Navigate to homepage

**Expected Results:**
- [ ] Banner popup does NOT appear
- [ ] Only active banners appear on homepage

---

## Test Suite 4: Console Error Checking

**Throughout all tests, keep browser DevTools Console open and verify:**

- [ ] NO red error messages
- [ ] NO warnings about missing fields
- [ ] NO 404 errors for resources
- [ ] Messages about banner operations should be logged:
  - "Banner saved successfully"
  - "Banner updated successfully"
  - "Banner deleted successfully"

**If you see errors, document them:**
- Screenshot the error
- Note the exact error message
- Check which action triggered it

---

## Test Suite 5: Settings Tab (Optional - Related Feature)

### Test 5.1: Toggle Sections
**Steps:**
1. Go to Admin → Settings
2. Toggle various section checkboxes (Hero, Services, Blogs, Careers, Testimonials)
3. Go to homepage and verify sections appear/disappear

**Expected Results:**
- [ ] Toggles save successfully
- [ ] Homepage reflects the section visibility changes
- [ ] Settings persist on reload

---

## Troubleshooting Guide

### Problem: "Banner created" toast shows but count = 0

**Diagnosis Steps:**
1. Open DevTools Network tab
2. Create a banner
3. Look for POST request to `/banners`
4. Check response:
   - Status should be 200/201
   - Response should include created banner with ID
   - Response should have `is_active: true`, `delay_seconds`, `order`

**Common Fixes:**
```sql
-- Fix 1: Ensure columns exist
ALTER TABLE banners ADD COLUMN IF NOT EXISTS delay_seconds INTEGER DEFAULT 3;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;

-- Fix 2: Check RLS policies exist
-- (Check Supabase → banners table → Policies)

-- Fix 3: Clear cache
-- Run in browser console:
localStorage.removeItem('banners:all');
location.reload();
```

---

### Problem: Public navbar/footer still showing on admin page

**Diagnosis:**
1. Check browser URL: should be `http://localhost:5173/#/admin`
2. Check DevTools: Elements tab, search for `<nav` - should NOT find public navbar

**Solution:**
1. Restart dev server completely
2. Clear browser cache (Ctrl+Shift+Delete)
3. Close ALL tabs and reopen in fresh tab

---

### Problem: Admin footer not showing

**Diagnosis:**
1. Check Elements panel for `<footer>` tag
2. Search for "Admin Dashboard" text in page

**Solution:**
1. Verify file exists: `components/AdminFooter.tsx`
2. Verify import in AdminDashboardNew.tsx
3. Check AdminDashboardNew.tsx ends with `<AdminFooter />`

---

## Success Criteria

✅ **All tests pass if:**
1. Banners create, update, delete without errors
2. Banner count updates immediately after creation
3. Banners persist on page reload
4. Banners display on homepage with correct delay
5. Admin dashboard has NO public navbar/footer
6. Admin dashboard has custom admin footer
7. Public pages have navbar and footer
8. No console errors

---

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium (recommended)
- [ ] Firefox
- [ ] Edge
- [ ] Safari (if on Mac)

---

## Performance Notes

- First banner creation might take 2-3 seconds (backend)
- Subsequent operations should be instant
- Page reload should load banners in under 1 second
- No excessive network requests in Network tab

---

## Final Sign-Off

When all tests pass, the system is ready for deployment:

- [ ] All Test Suites 1-4 passed
- [ ] No console errors
- [ ] No unfinished operations
- [ ] Ready for production use
