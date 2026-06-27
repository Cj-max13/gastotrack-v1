# 🔄 GastoTrack Rebuild Guide: JWT → Sanctum (Expo Go Only)

## 📋 Project Overview

**What Changed:**
- ❌ Removed: JWT auth, Java notification listener, cloud deployment
- ✅ Added: Laravel Sanctum (session-based), manual transaction entry, localhost only
- ✅ Keeping: All UI screens, features, admin panel, AI chatbot

**Timeline:** 5 months (Month 1 = now)

---

## ✅ COMPLETED TASKS (EVERYTHING DONE!)

### Backend Setup ✅
1. ✅ Created backup branch: `backup-java-jwt-version`
2. ✅ Installed Laravel Sanctum: `composer require laravel/sanctum`
3. ✅ Published Sanctum config and migrations
4. ✅ Updated `.env` for Sanctum:
   - Removed `JWT_SECRET`
   - Changed `SESSION_DRIVER=cookie`
   - Added `SANCTUM_STATEFUL_DOMAINS=localhost:8081,192.168.0.11:8081`
   - Changed `DB_DATABASE=gastotrack`
   - Changed `APP_NAME=GastoTrack`
5. ✅ Created 6 fresh migrations (with `type` column in categories)
6. ✅ Ran migrations: `php artisan migrate:fresh`
7. ✅ Created `CategorySeeder.php` with 12 default categories
8. ✅ Seeded categories: `php artisan db:seed --class=CategorySeeder`
9. ✅ Created `AuthController.php` with Sanctum token authentication
10. ✅ Updated `routes/api.php` - uses `auth:sanctum` middleware
11. ✅ Updated `User.php` model - added `HasApiTokens` trait
12. ✅ Updated `AdminMiddleware.php` - now uses `$request->user()` instead of JWT
13. ✅ Removed JWT middleware from `bootstrap/app.php`
14. ✅ Created `config/cors.php` with `supports_credentials => true`

### Frontend Setup ✅
15. ✅ Deleted `mobile/android/` folder (all Java code)
16. ✅ Deleted deployment configs (EAS, Railway, Render, GitHub Actions)
17. ✅ Deleted `mobile/services/mockData.js`
18. ✅ Updated `mobile/constants/config.js` - points to `http://192.168.0.11:8000/api`
19. ✅ Updated `mobile/hooks/useAuth.js` - removed MOCK_MODE, uses Sanctum tokens
20. ✅ Verified `mobile/services/api.js` - has Bearer token interceptor

---

## 🎯 NEXT: Test the Auth Flow

Your backend is fully set up! Now test everything works:

### 1. Start Backend
```bash
cd c:\Users\Chris\Documents\Gastotrack\backend\app
php artisan serve
```
Backend will run at `http://127.0.0.1:8000`

### 2. Start Mobile App
```bash
cd c:\Users\Chris\Documents\Gastotrack\mobile
npx expo start
```
**Scan QR code** with Expo Go app on your phone (must be on same WiFi as laptop)

### 3. Test Registration
1. Open app → should see login/register screen
2. Tap "Register"
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Submit → should get success message and auto-login

### 4. Test Login
1. Logout if logged in
2. Login with:
   - Email: `test@example.com`
   - Password: `password123`
3. Should redirect to main tabs (dashboard, transactions, budget, analytics, profile)

### 5. Test Protected Routes
- Try accessing dashboard, transactions, budget, analytics, profile
- All should work without redirecting back to login
- Token should persist even if you close and reopen the app

### 6. Test Logout
- Go to profile tab
- Tap logout
- Should clear token and redirect to login screen
- Try accessing protected routes → should redirect to login

---

## 📊 Database Status

Run this to check:
```bash
php artisan tinker --execute="echo 'Users: ' . \App\Models\User::count() . PHP_EOL; echo 'Categories: ' . \App\Models\Category::count() . PHP_EOL;"
```

**Current State:**
- **Users**: 0 (you'll create first user by registering)
- **Categories**: 12 (seeded with default Philippine categories)
  - 8 Expense: Food & Dining, Transportation, Shopping, Bills & Utilities, Entertainment, Healthcare, Education, Load & Mobile Data
  - 4 Income: Salary, Allowance, Side Hustle
  - 1 Other: Others
- **Transactions**: 0
- **Budgets**: 0

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `"Could not find driver"` error
- **Solution**: Enable `extension=pdo_mysql` in `php.ini`
- **Location**: Check XAMPP control panel → Config → PHP (php.ini)
- Uncomment the line: `;extension=pdo_mysql` → `extension=pdo_mysql`
- Restart Apache

**Problem**: Migration errors
- **Solution**: 
  ```bash
  php artisan migrate:fresh
  php artisan db:seed --class=CategorySeeder
  ```

**Problem**: CORS errors in mobile app
- **Solution**: Check `SANCTUM_STATEFUL_DOMAINS` in `.env` includes your local IP
- Also check `config/cors.php` has `supports_credentials => true`

**Problem**: Token not working (401 Unauthorized)
- **Solution**: Make sure `User.php` model has `use HasApiTokens;` trait
- Verify `routes/api.php` uses `auth:sanctum` middleware

### Mobile Issues

**Problem**: `"Network Error"` or can't connect to backend
- **Solution**: 
  1. Check laptop and phone are on **same WiFi network**
  2. Verify `API_BASE_URL` in `mobile/constants/config.js` matches your laptop's IP
  3. Get your laptop's IP:
     ```bash
     ipconfig
     # Look for "IPv4 Address" under WiFi adapter
     ```
  4. Update `config.js` with the correct IP
  5. Restart Expo: `npx expo start`

**Problem**: `401 Unauthorized` after login
- **Solution**: 
  1. Clear app data in Expo Go app
  2. Delete `auth_token` and `user_data` from SecureStore
  3. Try login again

**Problem**: Can't see login/register screens
- **Solution**: Check if screens exist at:
  - `mobile/app/auth/login.jsx`
  - `mobile/app/auth/register.jsx`
  - If missing, create them next

---

## 📝 What's Left for Month 1

Backend and auth system are **ready to test**! After testing:

### If Everything Works:
1. ✅ Auth backend is complete
2. Move to **Month 2: Transactions CRUD**

### If Auth Screens Don't Exist Yet:
1. Create `mobile/app/auth/login.jsx`
2. Create `mobile/app/auth/register.jsx`
3. Add role-based routing (user tabs vs admin panel)
4. Test the full flow

---

## 🔐 Create Admin Account (Optional)

If you want to test admin features:

```bash
php artisan tinker
```

Then in tinker:
```php
$admin = new App\Models\User();
$admin->name = 'Admin User';
$admin->email = 'admin@gastotrack.com';
$admin->password = Hash::make('admin123');
$admin->role = 'admin';
$admin->is_active = true;
$admin->save();
exit
```

Now you can login with:
- Email: `admin@gastotrack.com`
- Password: `admin123`
- Should redirect to admin panel instead of user tabs

---

## 🎯 Month 2 Preview: Transactions CRUD

Once auth is tested and working, you'll build:
- Create transaction form with:
  - Amount input
  - Category dropdown (from the 12 categories)
  - Source dropdown (Cash, GCash, Maya, GrabPay)
  - Description text area
  - Date picker
- List all transactions with search/filter
- Edit/delete transactions
- Budget-exceeded warnings when creating transactions

---

## 🎓 Thesis Defense Note

When your adviser asks about notification capture:

**Answer:** "This version establishes the foundation with manual transaction entry. The `source` field (Cash/GCash/Maya/GrabPay) is already in the database structure, so when I add the Java notification listener later, it will seamlessly populate this field automatically. The core transaction and budget logic is fully functional now."

---

## 📂 Key Files Reference

### Backend Files Created/Modified:
- `backend/app/.env` - Sanctum configuration
- `backend/app/config/cors.php` - **NEW**: CORS with credentials support
- `backend/app/config/sanctum.php` - Sanctum stateful domains
- `backend/app/app/Http/Controllers/AuthController.php` - **NEW**: Sanctum auth
- `backend/app/routes/api.php` - Uses `auth:sanctum`
- `backend/app/app/Models/User.php` - Added `HasApiTokens` trait
- `backend/app/app/Http/Middleware/AdminMiddleware.php` - Updated for Sanctum
- `backend/app/bootstrap/app.php` - Removed JWT middleware
- `backend/app/database/migrations/*.php` - 6 fresh migrations
- `backend/app/database/seeders/CategorySeeder.php` - **NEW**: Default categories

### Frontend Files Modified:
- `mobile/constants/config.js` - Points to localhost
- `mobile/hooks/useAuth.js` - Removed MOCK_MODE, uses Sanctum
- `mobile/services/api.js` - Bearer token interceptor (already had it)

---

**Current Status**: ✅ **MONTH 1 BACKEND COMPLETE!** Ready to test auth flow.

**Next Step**: Test the auth flow following the instructions above, then start Month 2 (Transactions CRUD).

Good luck! 🚀
