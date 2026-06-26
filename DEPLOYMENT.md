# GastoTrack Backend Deployment Guide

## 🎯 Deploy to Render.com (FREE)

### Why Render?
- ✅ FREE tier (with limitations)
- ✅ PostgreSQL included
- ✅ Auto-deploy from GitHub
- ✅ HTTPS included
- ⚠️ Spins down after 15 min inactivity (acceptable for testing/thesis)

---

## 📋 Pre-Deployment Checklist

### 1. Get Your Laravel APP_KEY
From your local `.env`:
```bash
# Look for this line:
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Get Your Gemini API Key
From your local `.env`:
```bash
GEMINI_API_KEY=your_key_here
```

---

## 🚀 Deployment Steps

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render

### Step 2: Create PostgreSQL Database
1. Dashboard → "New +" → "PostgreSQL"
2. Fill in:
   - **Name:** `gastotrack-db`
   - **Database:** `gastotrack`
   - **User:** (auto-generated, copy it)
   - **Region:** Singapore (closest to Philippines)
3. Click "Create Database"
4. **Wait 2-3 minutes** for provisioning
5. **Copy credentials:**
   - Internal Database URL: `postgresql://user:pass@host:5432/gastotrack`
   - Or copy individual fields: host, database, username, password

### Step 3: Deploy Web Service (Laravel)
1. Dashboard → "New +" → "Web Service"
2. Click "Connect" next to your GitHub account
3. Find and select: `Cj-max13/gastotrack-v1-backend`
4. Configure:

**Basic Settings:**
- **Name:** `gastotrack-api`
- **Region:** Singapore
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Runtime:** Detected automatically (PHP)
- **Instance Type:** Free

**Build Settings:**
- **Build Command:**
  ```bash
  composer install --no-dev --optimize-autoloader
  ```
- **Start Command:**
  ```bash
  php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
  ```

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable" for each:

```env
APP_NAME=GastoTrack
APP_ENV=production
APP_KEY=base64:YOUR_KEY_FROM_STEP_1
APP_DEBUG=false
APP_URL=https://gastotrack-api.onrender.com

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=YOUR_POSTGRES_HOST_FROM_STEP_2
DB_PORT=5432
DB_DATABASE=gastotrack
DB_USERNAME=YOUR_POSTGRES_USER_FROM_STEP_2
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_FROM_STEP_2

GEMINI_API_KEY=YOUR_GEMINI_KEY_FROM_STEP_1
```

**IMPORTANT:** Replace:
- `YOUR_KEY_FROM_STEP_1` with your actual APP_KEY
- `YOUR_POSTGRES_HOST_FROM_STEP_2` with PostgreSQL host
- `YOUR_POSTGRES_USER_FROM_STEP_2` with PostgreSQL username
- `YOUR_POSTGRES_PASSWORD_FROM_STEP_2` with PostgreSQL password
- `YOUR_GEMINI_KEY_FROM_STEP_1` with your Gemini API key

### Step 5: Deploy!
1. Click "Create Web Service"
2. Wait 5-10 minutes for first deployment
3. Watch the logs for any errors

---

## ✅ Verify Deployment

### Check if API is working:

**Method 1: Browser**
Visit: `https://gastotrack-api.onrender.com/api/categories`

Should return JSON list of categories.

**Method 2: Test Registration**
```bash
curl -X POST https://gastotrack-api.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","password_confirmation":"password123"}'
```

Should return user data and token.

---

## 📱 Update Mobile App

After deployment, update mobile app to use production URL:

### Already Updated Files (commit these):
1. ✅ `mobile/constants/config.js` - React Native API calls
2. ✅ `mobile/android/.../ApiSender.java` - Notification capture

### Push Changes to GitHub:
```bash
cd c:\Users\Chris\Documents\Gastotrack
git add -A
git commit -m "Update API URLs to production (Render.com)"
git push origin main
```

### Rebuild APK:
GitHub Actions will automatically build new APK with production URLs.

Download from: https://github.com/Cj-max13/gastotrack-v1/actions

---

## 🐛 Troubleshooting

### Issue: Service won't start
**Check logs in Render dashboard for errors.**

Common fixes:
- Make sure APP_KEY is set correctly (must start with `base64:`)
- Verify database credentials are correct
- Check if migrations failed

### Issue: Database connection failed
- Go to your PostgreSQL service in Render
- Copy "Internal Database URL"
- Parse it into individual env vars:
  ```
  postgresql://USER:PASSWORD@HOST:5432/DATABASE
  ```

### Issue: 503 Error on first request
- Normal! Render spins down free services after 15 min inactivity
- First request wakes it up (~30 seconds wait)
- Subsequent requests are fast

### Issue: Migrations failed
In Render web service dashboard:
1. Go to "Shell" tab
2. Run manually:
   ```bash
   php artisan migrate:fresh --seed --force
   ```

---

## 💡 Testing with Multiple People

Once deployed to Render:
- ✅ Anyone can access the API (internet required)
- ✅ Share APK file with testers
- ✅ They can register/login from anywhere
- ✅ No need for your laptop to be on
- ✅ Works on different WiFi networks

**Test User Accounts:**
Create some test accounts for your testers:
```
Email: tester1@gastotrack.com / Password: Test123!
Email: tester2@gastotrack.com / Password: Test123!
Email: tester3@gastotrack.com / Password: Test123!
```

---

## 🔄 Keeping Local XAMPP MySQL

Your local development stays unchanged:
- XAMPP still uses MySQL
- Local `.env` points to MySQL
- Production `.env` on Render points to PostgreSQL
- Laravel handles both automatically!

**Local .env (don't change):**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=gastotrack
```

**Production .env (on Render dashboard):**
```env
DB_CONNECTION=pgsql
DB_HOST=dpg-xxx.singapore-postgres.render.com
DB_DATABASE=gastotrack
```

---

## 📊 Render Free Tier Limits

- ✅ 750 hours/month (enough for testing)
- ✅ Spins down after 15 min inactivity
- ✅ 1GB RAM
- ✅ Shared CPU
- ⚠️ Slow cold starts (~30 sec first request)

**For thesis demonstration:**
- Open API URL 1 minute before demo (to wake it up)
- It will stay fast during your presentation
- This is completely acceptable for thesis defense

---

## 🎓 For Thesis Defense

When panelists ask: "How did you deploy the backend?"

**Answer:**
"I deployed the Laravel backend to Render.com, a cloud platform with free tier suitable for testing and demonstration. It uses PostgreSQL database in production while maintaining MySQL for local development. The deployment is automated via GitHub integration and includes automatic migrations. The API is accessible via HTTPS, allowing testers from different locations to access the application."

**If they ask about database difference:**
"Laravel's Eloquent ORM abstracts database-specific syntax, allowing the same codebase to work with both MySQL locally and PostgreSQL in production. This is a standard practice in Laravel development and demonstrates the framework's flexibility."

---

Good luck! 🚀
