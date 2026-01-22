# Supabase Database Setup Instructions

Your application is ready, but the database tables need to be created first. Follow these steps:

## Step 1: Go to Supabase Dashboard
- Visit https://app.supabase.com
- Click on your project

## Step 2: Open SQL Editor
- Click on **SQL Editor** in the left sidebar
- Click **+ New Query**

## Step 3: Copy and Execute SQL
- Open the file `SUPABASE_SETUP.sql` in this project
- Copy **ALL** the content
- Paste it into the SQL Editor in Supabase
- Click the **Run** button (or press Ctrl+Enter)

## Step 4: Verify Tables Created
After execution completes:
- Go to **Table Editor** in the left sidebar
- You should see these new tables:
  - `submissions` ✅ (already exists)
  - `blogs` ✅ (NEW)
  - `careers` ✅ (NEW)
  - `banners` ✅ (NEW)
  - `admin_users` ✅ (already exists)

## Step 5: Test the Application
- Go back to your app at http://localhost:5173
- Create a new blog post in Admin Dashboard
- Create a new career opening
- Create a new banner with a show_delay (seconds)
- Everything should now work! 🎉

## Why This is Needed

The frontend code is fully functional and can insert/update data into these tables. However, the tables don't exist yet in Supabase, so:

- ✅ Blog form submits without error
- ❌ But data doesn't persist (no table to store it)
- ❌ Existing posts section stays empty
- ❌ Blog page shows "No articles found"

Once you run the SQL, everything will work perfectly!

## Troubleshooting

If you get errors:
- Make sure you're in the correct Supabase project
- Check that your `.env.local` has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Try executing the SQL line by line if there are errors

For any issues, the `SUPABASE_SETUP.sql` file has comprehensive error handling with `CREATE TABLE IF NOT EXISTS`.
