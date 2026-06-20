# 📱 How to Test Your APK - Complete Guide

## 🎯 **3 Ways to Test Your APK**

---

## **Method 1: Test on Physical Phone (Recommended)**

### **Step 1: Build the APK**

In Android Studio:
1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait 3-5 minutes
3. Click **"locate"** when you see "APK(s) generated successfully"

APK location:
```
C:\Users\Chris\Documents\Gastotrack\mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

### **Step 2: Transfer APK to Phone**

**Option A - USB Cable:**
```
1. Connect phone to PC via USB
2. Copy app-debug.apk to phone's Downloads folder
3. Disconnect phone
```

**Option B - Email/Drive:**
```
1. Email the APK to yourself
2. Open email on phone
3. Download APK
```

### **Step 3: Install on Phone**

```
1. On phone: Open Files app → Downloads
2. Tap "app-debug.apk"
3. If asked, enable "Install from unknown sources"
4. Tap "Install"
5. Tap "Open" when done
```

### **Step 4: Setup for Testing**

**IMPORTANT:** Phone and PC must be on same WiFi!

```
1. Connect your phone to same WiFi as your PC
2. On PC: Make sure backend is running
   cd C:\Users\Chris\Documents\Gastotrack\backend\app
   php artisan serve
3. Keep terminal open
```

### **Step 5: Test the App**

#### **Test 1: Can App Open?**
```
✓ App icon appears in app drawer
✓ Tap icon
✓ App opens to Login/Register screen
✓ No crashes
```
**If passes:** ✅ Basic installation works!

#### **Test 2: Can Connect to Backend?**
```
Before testing app, test connection:

1. On phone: Open Chrome browser
2. Go to: http://192.168.0.11:8000
3. Should see Laravel page or JSON

If doesn't load:
→ Check same WiFi
→ Check backend running
→ Check Windows Firewall
```
**If passes:** ✅ Network connection works!

#### **Test 3: Can Register User?**
```
1. Open GastoTrack app
2. Tap "Register" tab
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@1234
4. Tap "Register" button
5. Should see success message or navigate to dashboard
```
**If passes:** ✅ API communication works!

#### **Test 4: Can Login?**
```
1. Tap "Login" tab (if not auto-logged in)
2. Enter:
   - Email: test@example.com
   - Password: Test@1234
3. Tap "Login"
4. Should navigate to Dashboard
5. Should see:
   - Total Spent: ₱0
   - Total Income: ₱0
   - Budget Health: 100%
```
**If passes:** ✅ Authentication works!

#### **Test 5: Can Add Transaction?**
```
1. On Dashboard, tap "+" button (floating button bottom right)
2. Fill in:
   - Amount: 100
   - Category: Food
   - Type: Expense
   - Note: Test lunch
3. Tap "Add Transaction"
4. Should close modal
5. Go to Transactions tab
6. Should see transaction in list
```
**If passes:** ✅ Core functionality works!

#### **Test 6: Can Set Budget?**
```
1. Tap "Budget" tab at bottom
2. Select category: Food
3. Enter amount: 500
4. Tap "Set Budget"
5. Should see progress bar
6. Should show: ₱100 / ₱500 (20%)
```
**If passes:** ✅ Budget feature works!

#### **Test 7: Can View Analytics?**
```
1. Tap "Analytics" tab at bottom
2. Should see:
   - Pie chart (Food: ₱100)
   - Bar chart showing today's spending
   - Period selector (Week/Month/Year)
3. Try changing period
4. Charts should update
```
**If passes:** ✅ Analytics works!

#### **Test 8: Can Chat with AI?**
```
1. Tap "Profile" tab
2. Scroll down
3. Tap "Chat with AI" or chatbot icon
4. Type: "How much did I spend?"
5. Send message
6. Should see AI response
```
**If passes:** ✅ AI chatbot works!

#### **Test 9: Can Logout?**
```
1. Go to Profile tab
2. Tap "Logout"
3. Should return to Login screen
4. Try logging in again
5. Should remember your data
```
**If passes:** ✅ Session management works!

---

## **Method 2: Test on Android Emulator**

If you don't want to use your phone yet:

### **Step 1: Start Emulator**
```
1. In Android Studio: Tools → Device Manager
2. Click ▶️ next to any emulator
3. Wait for emulator to boot
```

### **Step 2: Install APK on Emulator**
```
Option A - Drag & Drop:
1. Open File Explorer
2. Navigate to: C:\Users\Chris\Documents\Gastotrack\mobile\android\app\build\outputs\apk\debug\
3. Drag app-debug.apk onto emulator window
4. Wait for "App installed" message

Option B - ADB Command:
1. Open PowerShell
2. Run:
   cd C:\Users\Chris\AppData\Local\Android\Sdk\platform-tools
   .\adb install "C:\Users\Chris\Documents\Gastotrack\mobile\android\app\build\outputs\apk\debug\app-debug.apk"
```

### **Step 3: Test on Emulator**

Follow the same test steps as Method 1, but:
- Emulator automatically uses correct IP (10.0.2.2)
- No WiFi setup needed
- Backend must still be running

---

## **Method 3: Test While Building (Live Testing)**

Fastest way to test during development:

### **Step 1: Connect Device**
```
Physical phone:
- Enable USB debugging
- Connect via USB

OR

Emulator:
- Start any emulator
```

### **Step 2: Run from Android Studio**
```
1. Select your device from dropdown
2. Click green ▶️ Run button (or Shift+F10)
3. App builds, installs, and launches automatically
4. Changes sync in real-time (Hot Reload)
```

### **Advantages:**
```
✓ Instant updates (save file = app updates)
✓ See errors in Logcat
✓ Debug mode enabled
✓ Network inspector available
```

---

## 🧪 **Complete Testing Checklist**

Use this to verify everything works:

### **Installation Tests**
- [ ] APK installs without errors
- [ ] App icon appears in drawer
- [ ] App opens to correct screen
- [ ] No immediate crashes

### **Network Tests**
- [ ] Can reach backend URL in browser
- [ ] Backend responds to API calls
- [ ] App shows loading states correctly
- [ ] Error messages display properly

### **Authentication Tests**
- [ ] Can register new user
- [ ] Registration validation works
- [ ] Can login with credentials
- [ ] Invalid login shows error
- [ ] Session persists after closing app
- [ ] Can logout successfully

### **Transaction Tests**
- [ ] Can add expense transaction
- [ ] Can add income transaction
- [ ] Transaction appears in list
- [ ] Can search transactions
- [ ] Can filter by category
- [ ] Can delete transaction
- [ ] Amounts calculate correctly

### **Budget Tests**
- [ ] Can set budget for category
- [ ] Budget progress bar displays
- [ ] Budget percentage calculates correctly
- [ ] Can update existing budget
- [ ] Budget alerts show when exceeded

### **Dashboard Tests**
- [ ] Shows correct total spent
- [ ] Shows correct total income
- [ ] Budget health displays
- [ ] Top category shows correctly
- [ ] Recent transactions list

### **Analytics Tests**
- [ ] Pie chart displays categories
- [ ] Bar chart shows daily spending
- [ ] Line chart shows trends
- [ ] Period filter works (Week/Month/Year)
- [ ] Charts update with new data

### **Chatbot Tests**
- [ ] Chat window opens
- [ ] Can send messages
- [ ] AI responds with relevant answers
- [ ] Chat history persists
- [ ] Can scroll through messages

### **Profile Tests**
- [ ] User info displays correctly
- [ ] Notification toggle works
- [ ] Settings can be changed
- [ ] Logout works
- [ ] Can navigate to admin (if admin user)

### **UI/UX Tests**
- [ ] All screens load without errors
- [ ] Navigation works smoothly
- [ ] Buttons respond to taps
- [ ] Forms validate input
- [ ] Loading spinners show
- [ ] Toast notifications appear
- [ ] Empty states display correctly
- [ ] Pull-to-refresh works

### **Performance Tests**
- [ ] App launches in <3 seconds
- [ ] Screens transition smoothly
- [ ] No lag when scrolling
- [ ] Charts render quickly
- [ ] API calls complete in reasonable time

---

## 🐛 **Common Issues & Fixes**

### **Issue: APK Won't Install**
```
Solution:
1. Settings → Security → Enable "Unknown sources"
2. Or: Settings → Apps → Special access → Install unknown apps
3. Enable for Files or Chrome
```

### **Issue: App Crashes on Open**
```
Possible causes:
1. Backend not running
2. Wrong API URL in config
3. Network not accessible

Solution:
1. Check backend: php artisan serve
2. Check config: mobile/constants/config.js
3. Check phone on same WiFi
```

### **Issue: Can't Connect to Backend**
```
Checklist:
1. ✓ Backend running? (php artisan serve)
2. ✓ Same WiFi?
3. ✓ Correct IP in config? (192.168.0.11)
4. ✓ Firewall allows PHP?
5. ✓ Test in browser first: http://192.168.0.11:8000
```

### **Issue: Register/Login Fails**
```
Check:
1. Backend logs: backend/app/storage/logs/laravel.log
2. Network tab in browser dev tools
3. API endpoint working: POST http://192.168.0.11:8000/api/login

Test API manually:
curl -X POST http://192.168.0.11:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'
```

### **Issue: Transactions Don't Save**
```
Check:
1. JWT token received after login
2. Authorization header sent with requests
3. Backend database has transactions table
4. Check backend logs for errors
```

---

## 📊 **Testing Metrics**

### **What to Measure:**
```
✓ Install success rate: 100%
✓ App launch time: <3 seconds
✓ API response time: <500ms
✓ Screen load time: <1 second
✓ Crash rate: 0%
✓ Network success rate: >95%
```

---

## 🎯 **Quick Testing Script**

Test these in order (5 minutes total):

```
1. Install APK → 1 min
2. Open app → 10 sec
3. Register user → 30 sec
4. Add transaction → 30 sec
5. Set budget → 20 sec
6. View analytics → 20 sec
7. Chat with AI → 1 min
8. Logout → 10 sec

Total: ~5 minutes
```

**If all pass:** ✅ Your app is working perfectly!

---

## 📱 **Test on Different Scenarios**

### **Network Scenarios:**
- [ ] WiFi connection
- [ ] Mobile data (requires deployed backend)
- [ ] Slow connection
- [ ] No connection (should show error)

### **Device Scenarios:**
- [ ] Different Android versions
- [ ] Different screen sizes
- [ ] Different manufacturers

### **Usage Scenarios:**
- [ ] New user registration
- [ ] Existing user login
- [ ] Multiple transactions
- [ ] Budget exceeded
- [ ] Empty states (no data)

---

## 💡 **Pro Testing Tips**

1. **Test on Clean Install:**
   - Uninstall app completely
   - Clear app data
   - Reinstall and test fresh

2. **Test Offline Behavior:**
   - Turn off WiFi
   - Try using app
   - Should show appropriate errors

3. **Test Edge Cases:**
   - Very large amounts
   - Special characters in notes
   - Long text inputs
   - Rapid button taps

4. **Check Logs:**
   ```
   Backend logs: backend/app/storage/logs/laravel.log
   Android logs: Android Studio → Logcat
   ```

---

## ✅ **Final Checklist**

Before considering testing complete:

- [ ] Tested on physical device
- [ ] All core features work
- [ ] No crashes encountered
- [ ] Network communication works
- [ ] Data persists correctly
- [ ] UI looks good
- [ ] Performance is acceptable
- [ ] Ready for real-world use!

---

## 🎉 **Success!**

If you've completed all tests and everything works:

**Congratulations!** 🎊

You have a fully functional expense tracking app:
- ✅ Working on real device
- ✅ Connected to backend
- ✅ All features operational
- ✅ Ready for daily use

**Next Steps:**
1. Use it daily for real expense tracking
2. Get feedback from friends/family
3. Deploy backend to production server
4. Build release APK for Play Store

---

**Start testing now!** Install the APK and go through the test checklist. 🚀
