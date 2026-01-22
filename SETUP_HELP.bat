@echo off
REM SQ Consulting - Database Setup Helper for Windows

cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║  SQ Consulting - Database Setup Helper                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🔍 DIAGNOSING YOUR APPLICATION...
echo.

if not exist "SUPABASE_SETUP.sql" (
    echo ❌ ERROR: SUPABASE_SETUP.sql not found
    echo    Make sure you're in the project root directory
    pause
    exit /b 1
)

echo ✅ Found SUPABASE_SETUP.sql
echo.
echo 📋 HERE'S WHAT YOU NEED TO DO:
echo.
echo 1️⃣  WHY BLOGS ^& CAREERS AREN'T WORKING:
echo    ├─ The blogs table doesn't exist in Supabase
echo    ├─ The careers table doesn't exist in Supabase
echo    ├─ The banners table doesn't exist in Supabase
echo    └─ Everything else is configured correctly!
echo.
echo 2️⃣  HOW TO FIX IT ^(5 MINUTES^):
echo.
echo    STEP A: Go to Supabase
echo    ├─ Open: https://app.supabase.com
echo    └─ Select your project
echo.
echo    STEP B: Open SQL Editor
echo    ├─ Click 'SQL Editor' in left sidebar
echo    └─ Click '+ New Query'
echo.
echo    STEP C: Copy the SQL
echo    ├─ Open file: SUPABASE_SETUP.sql ^(in this directory^)
echo    └─ Copy ALL the content
echo.
echo    STEP D: Execute in Supabase
echo    ├─ Paste into the SQL Editor
echo    └─ Click 'Run' ^(or Ctrl+Enter^)
echo.
echo    STEP E: Verify Success
echo    ├─ Go to 'Table Editor' in Supabase
echo    └─ Check these tables exist:
echo       ✓ submissions ^(already existed^)
echo       ✓ blogs ^(NEW^)
echo       ✓ careers ^(NEW^)
echo       ✓ banners ^(NEW^)
echo       ✓ admin_users ^(already existed^)
echo.
echo 3️⃣  TEST YOUR APPLICATION:
echo    ├─ Visit: http://localhost:5173/#/diagnostics
echo    └─ Should show ✅ for all tables
echo.
echo 4️⃣  CREATE CONTENT:
echo    ├─ Go to http://localhost:5173/#/admin
echo    ├─ Create a blog post
echo    ├─ Create a career opening
echo    ├─ Create a banner with delay timer
echo    └─ Everything should now work! 🎉
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo ❓ TROUBLESHOOTING:
echo.
echo Q: I got a SQL error
echo A: That's normal! The SQL handles errors gracefully.
echo    Just run it again or try one section at a time.
echo.
echo Q: Still no tables showing
echo A: Check your .env.local has correct credentials:
echo    - VITE_SUPABASE_URL
echo    - VITE_SUPABASE_ANON_KEY
echo.
echo Q: Diagnostics page shows tables missing
echo A: The SQL didn't execute. Repeat steps 2A-2E above.
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo ✨ After running the SQL, your app will support:
echo    ✓ Blog creation and publishing
echo    ✓ Career openings with rich text requirements
echo    ✓ Banner modals with configurable delay timers
echo    ✓ Full admin dashboard functionality
echo    ✓ Toast notifications for all actions
echo    ✓ Data refresh buttons for each section
echo.
pause
