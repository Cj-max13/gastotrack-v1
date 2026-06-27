# 🎭 Mock Mode - Testing Without Backend

## Current Status: MOCK MODE ENABLED ✅

Your app is now configured to work **without a backend server** using realistic mock data.

---

## 🎯 What Works in Mock Mode

### ✅ Authentication
- **Login:** Use any email/password
  - Regular user: `user@test.com` / any password
  - Admin user: `admin@test.com` / any password
- **Register:** Creates mock account (doesn't save)
- **Logout:** Works normally

### ✅ Dashboard
- Shows mock expense statistics
- Displays recent transactions
- Top spending category
- All UI elements functional

### ✅ Transactions
- View list of mock transactions
- Add new transactions (stored locally, resets on restart)
- Filter by category, date, type
- View transaction details

### ✅ Budgets
- View existing budgets with progress bars
- Set new budgets
- Update budget limits
- Visual indicators (green/yellow/red)

### ✅ Analytics
- Pie charts (spending by category)
- Bar charts (daily spending trend)
- Line charts (monthly trend)
- Source distribution (GCash, Maya, GrabPay, Manual)

### ✅ Admin Screens
- Admin dashboard with statistics
- User management (view list, toggle active, delete)
- Category management (add, edit, delete)
- System settings (app name, toggles, limits)

### ✅ AI Chatbot
- Note: Requires real Gemini API key (not mocked)
- Other features work without backend

---

## 🔧 How to Toggle Mock Mode

### Enable Mock Mode (Current Setting)
```javascript
// In mobile/hooks/useAuth.js
const MOCK_MODE = true;  // ✅ Currently enabled
```

### Disable Mock Mode (Use Real Backend)
```javascript
// In mobile/hooks/useAuth.js
const MOCK_MODE = false;  // When backend is deployed
```

Then update API URL in `mobile/constants/config.js`:
```javascript
export const API_BASE_URL = 'https://your-backend-url.com/api';
```

---

## 📱 Testing Scenarios

### Test Regular User Flow
1. Open app
2. Register with: `testuser@gmail.com`
3. Login with same email (any password works)
4. Navigate through:
   - Dashboard (see mock data)
   - Transactions (view/add transactions)
   - Budgets (set/view budgets)
   - Analytics (see charts)
   - Profile (view settings)

### Test Admin User Flow
1. Open app
2. Login with: `admin@test.com` (any password)
3. App navigates to Admin Dashboard
4. Test admin features:
   - View statistics
   - Manage users
   - Manage categories
   - Update system settings

---

## 🎓 For Thesis Defense

### When to Use Mock Mode:
- ✅ Initial UI/UX demonstration
- ✅ Testing with classmates/friends
- ✅ Showing app flow without internet
- ✅ Pre-defense practice runs

### When to Use Real Backend:
- ✅ Final thesis defense
- ✅ Demonstrating notification capture feature
- ✅ Showing data persistence
- ✅ Testing with multiple real users

---

## 📊 Mock Data Details

### Mock Categories (8 total):
- 🍔 Food
- 🚗 Transport
- 🛍️ Shopping
- 🎮 Entertainment
- 💡 Bills
- 💊 Health
- 📚 Education
- 📦 Others

### Mock Transactions (5 sample):
- GCash payment to Jollibee (₱250)
- GrabPay ride (₱150)
- Maya payment to Lazada (₱500)
- Manual bill payment (₱1,000)
- GCash pharmacy purchase (₱180)

### Mock Budgets (3 set):
- Food: ₱5,000 limit / ₱2,750 spent
- Transport: ₱2,000 limit / ₱1,200 spent
- Bills: ₱3,000 limit / ₱1,000 spent

### Mock Admin Data:
- 25 total users
- 156 transactions this month
- ₱125,000 total amount processed
- 4 sample users in management list

---

## ⚠️ Limitations of Mock Mode

### What Doesn't Work:
- ❌ **Notification capture** (requires backend + real device)
- ❌ **Data persistence** (transactions reset on app restart)
- ❌ **Multi-user sync** (each device has own mock data)
- ❌ **AI Chatbot** (requires real Gemini API key)
- ❌ **Real-time updates** (no backend polling)

### What to Tell Panelists:
"For this demonstration, I'm using mock data to showcase the UI and user flow. The backend with notification capture, database persistence, and real-time sync will be demonstrated in the final defense."

---

## 🚀 Switching to Real Backend Later

### Step 1: Deploy Backend
Follow `DEPLOYMENT.md` to deploy Laravel backend to Railway/Render.

### Step 2: Update Config
1. Open `mobile/hooks/useAuth.js`
2. Change: `const MOCK_MODE = false;`

3. Open `mobile/constants/config.js`
4. Update: `export const API_BASE_URL = 'https://your-deployed-backend.com/api';`

5. Open `mobile/android/.../ApiSender.java`
6. Update: `private static final String API_BASE_URL = "https://your-deployed-backend.com/api/transactions";`

### Step 3: Rebuild APK
```bash
# Push changes to GitHub
git add -A
git commit -m "Switch to production backend"
git push origin main

# GitHub Actions builds new APK
# Download from: https://github.com/Cj-max13/gastotrack-v1/actions
```

### Step 4: Test With Real Backend
- Register real users
- Test notification capture
- Verify data persistence
- Test across multiple devices

---

## 💡 Tips for Demo

### Make It Look Real:
- ✅ Mock data uses realistic Philippine amounts (₱)
- ✅ Transaction dates are recent (today, yesterday, etc.)
- ✅ Sources include GCash, Maya, GrabPay (popular in PH)
- ✅ Categories are common Filipino expenses

### Practice Your Pitch:
"This is a fully functional expense tracking app with AI-powered insights and automatic transaction capture from e-wallet notifications. Currently running in demonstration mode with realistic mock data. The production version connects to a Laravel backend with MySQL database and captures real GCash, Maya, and GrabPay notifications."

---

## 📝 Current Build Status

**Version:** Mock Mode v1.0  
**Last Updated:** June 27, 2026  
**Backend:** Disabled (Mock Mode)  
**APK:** Ready for download from GitHub Actions  
**Status:** ✅ Ready for testing and initial demonstrations  

---

## 🔄 Quick Reference

| Feature | Mock Mode | Real Backend |
|---------|-----------|--------------|
| Login/Register | ✅ Works | ✅ Works |
| View Transactions | ✅ Works | ✅ Works |
| Add Transactions | ✅ Local only | ✅ Saved to DB |
| Budgets | ✅ Works | ✅ Works |
| Analytics | ✅ Works | ✅ Works |
| Admin Screens | ✅ Works | ✅ Works |
| Notification Capture | ❌ Disabled | ✅ Works |
| Data Persistence | ❌ No | ✅ Yes |
| Multi-device Sync | ❌ No | ✅ Yes |
| AI Chatbot | ❌ Needs key | ✅ Works |

---

Good luck with your testing and thesis defense! 🎓🚀
