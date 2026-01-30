# Admin Dashboard - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Start the Application
```bash
npm run dev
```

### Step 2: Go to Admin Panel
Open your browser and navigate to:
```
http://localhost:5173/#/admin
```

### Step 3: Login
- **Password**: `admin123`
- Click "Unlock Dashboard"

### Step 4: You're In! 🎉
You now have access to the admin control panel.

---

## 📝 Quick Tasks

### Create a Blog Post
1. Click **"Blog Posts"** in sidebar
2. Click **"Create Blog Post"** form
3. Fill in:
   - Title (e.g., "My First Blog")
   - Author (e.g., "John Doe")
   - Category (e.g., "Technology")
   - Excerpt (short summary)
   - Content (full article)
   - Upload featured image
4. Click **"Create Blog"**
5. ✅ Blog created! See green notification

### Edit a Blog Post
1. Go to **Blog Posts** tab
2. Click **Edit** button on any blog
3. Modify any field
4. Click **"Update Blog"**
5. ✅ Blog updated!

### Delete a Blog Post
1. Go to **Blog Posts** tab
2. Click **Delete** button
3. Confirm deletion
4. ✅ Blog deleted!

### Create a Career Opening
1. Click **"Careers"** in sidebar
2. Fill in:
   - Job Title (e.g., "Senior Developer")
   - Department (e.g., "Engineering")
   - Type: Select from dropdown
   - Location (e.g., "New York, NY")
   - Description (job details)
   - Requirements (one per line)
3. Click **"Create Career Opening"**
4. ✅ Job posted!

### Create a Banner Popup
1. Click **"Banners"** in sidebar
2. Fill in:
   - Title (e.g., "Special Offer")
   - Delay (seconds before showing)
   - Description
   - Upload image
   - Optional link URL
   - Check "Active" checkbox
3. Click **"Create Banner"**
4. ✅ Banner created!
5. Visit website to see popup after delay

### Change Your Password
1. Click **"Change Password"** in sidebar
2. Enter current password (admin123)
3. Enter new password (min 8 characters)
4. Confirm new password
5. Click **"Change Password"**
6. ✅ Password changed!

### Manage Team Members
1. Click **"Settings"** in sidebar
2. Scroll to **"Team Members"** section
3. Fill in:
   - Name
   - Position
   - Bio (optional)
   - Upload photo
4. Click **"+ Add Team Member"**
5. ✅ Team member added!
6. Click X to remove any member

### Toggle Sections
1. Click **"Settings"** in sidebar
2. Toggle switches for:
   - Hero Section
   - Services
   - Testimonials
   - Careers
   - Blog
3. Click **"Save Section Settings"**
4. ✅ Website updated! Sections show/hide immediately

---

## 🎯 Common Workflows

### Add Multiple Blog Posts
```
1. Click Blog Posts
2. Fill form
3. Click Create Blog ✅
4. Repeat steps 2-3 as needed
```

### Manage Inquiries
```
1. Click Messages
2. View all inquiries
3. Click email icon to reply
4. Click checkmark to mark as read
5. Delete old messages with delete icon
```

### Schedule a Promotion
```
1. Click Banners
2. Create banner with offer text
3. Set delay to show after specific time
4. Upload banner image
5. Add link to promotion page
6. Check "Active"
7. Click Create Banner ✅
```

---

## 🎨 Design Features

### Dashboard Overview
- **Stats Cards**: See total messages, blogs, jobs, banners
- **Recent Messages**: Quick peek at latest messages
- **Navigation Sidebar**: Easy access to all sections

### Responsive Design
- **Desktop**: Full sidebar visible
- **Tablet**: Sidebar collapses to hamburger menu
- **Mobile**: Touch-optimized interface

### Visual Feedback
- **Toast Notifications**: Green for success, red for errors
- **Loading States**: Spinner while saving
- **Confirmations**: Double-check before deleting

---

## ⚙️ System Requirements

### Minimum
- Modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- JavaScript enabled

### Recommended
- Chrome 90+
- 4GB RAM
- 1280x720 resolution

---

## 🆘 Troubleshooting

### Problem: Can't login
**Solution**: 
- Check password is exactly `admin123`
- Clear browser cookies (Ctrl+Shift+Del)
- Try incognito/private window

### Problem: Changes not saving
**Solution**:
- Check internet connection
- Wait for green notification
- Refresh page (F5)
- Check browser console (F12) for errors

### Problem: Banner not showing
**Solution**:
- Ensure banner is set to "Active"
- Check delay is correct (in seconds)
- Visit website in new incognito window
- Check if already dismissed in session

### Problem: Images not uploading
**Solution**:
- Check file size (max 5MB)
- Ensure image format (JPG, PNG, GIF)
- Try different image
- Check browser console for errors

### Problem: Modals won't close
**Solution**:
- Click X button in top-right corner
- Click outside modal area
- Try Escape key

---

## 📱 Mobile Tips

### Accessing on Mobile
1. Use the same URL: `http://localhost:5173/#/admin`
2. Or type IP address if remote: `http://[YOUR_IP]:5173/#/admin`

### Mobile Navigation
- Tap **☰** (hamburger) icon to open sidebar
- Tap menu item to go to section
- Tap again to close sidebar

### Mobile Forms
- Use keyboard shortcuts (Tab to next field)
- Use autocomplete for email addresses
- Take photos directly from phone camera

---

## 🔒 Security Tips

### Protect Your Admin Access
1. ✅ Change password after first login
2. ✅ Use strong password (8+ chars, numbers, symbols)
3. ✅ Don't share password
4. ✅ Logout when finished (click Logout button)
5. ✅ Clear browser history if on shared computer

### Backup Data
1. Regularly download blog posts as backup
2. Export important data
3. Keep database backups current
4. Monitor for unusual activity

---

## 📚 Learn More

For detailed documentation, see:
- `ADMIN_DASHBOARD_GUIDE.md` - Complete feature guide
- `DATABASE_SETUP_ADMIN_REVAMP.sql` - Database setup
- `ADMIN_REVAMP_SUMMARY.md` - What's new
- `FEATURE_CHECKLIST.md` - All features

---

## 💬 Need Help?

### Common Questions

**Q: How do I make a blog post visible to users?**
A: Check the "Publish Immediately" checkbox in blog form

**Q: Can I schedule a banner to show later?**
A: Not yet, but you can create it as inactive and activate later

**Q: What happens to data if I delete something?**
A: It's permanently removed. There's no undo. (Confirmation prevents accidents)

**Q: Can multiple people access admin panel?**
A: Currently one password for all. Future versions will support multiple users.

**Q: How do I backup my data?**
A: Use Supabase dashboard to export CSV files

---

## ✅ First-Time Checklist

- [ ] Login to admin panel
- [ ] Change admin password
- [ ] Add team members
- [ ] Create first blog post
- [ ] Create career opening
- [ ] Create test banner
- [ ] Test banner appears on website
- [ ] Toggle sections on/off
- [ ] View messages
- [ ] Logout and login again

---

**Version**: 1.0
**Last Updated**: January 30, 2026
**Status**: ✅ Ready to Use
