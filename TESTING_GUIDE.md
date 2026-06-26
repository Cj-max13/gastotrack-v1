# GastoTrack - Notification Listener Testing Guide

## ✅ FIXES COMPLETED

### Issue 1: Hardcoded IP Address - FIXED
**What changed:**
- Moved hardcoded URL to a constant at the top of `ApiSender.java`
- Added clear comment explaining how to update it
- Single place to change: `API_BASE_URL` constant

**To update the API URL in the future:**
1. Open `mobile/android/app/src/main/java/com/gastotrack/mobile/ApiSender.java`
2. Find line ~15: `private static final String API_BASE_URL = "http://192.168.0.11:8000/api/transactions";`
3. Change the IP address to your current laptop IP
4. Rebuild the app: `npx expo run:android`

### Issue 2: Package Name Convention - FIXED
**What changed:**
- Renamed package from `com.NotificationListener.mobile` → `com.gastotrack.mobile`
- Now follows Java lowercase convention ✓
- Matches iOS bundleIdentifier ✓

**Files updated:**
- ✅ `app.json` - android.package field
- ✅ `build.gradle` - namespace and applicationId
- ✅ All 7 Java/Kotlin files - package declarations
- ✅ Folder structure renamed

---

## 🧪 TESTING WITH ADB LOGCAT

### Step 1: Build and Install the App

**Option A: Using Expo CLI (Recommended for Testing)**
```bash
# Navigate to mobile folder
cd c:\Users\Chris\Documents\Gastotrack\mobile

# Connect your Android phone via USB
# Enable USB Debugging in Developer Options

# Build and install on connected device
npx expo run:android
```

**What this does:**
- Compiles the native Java code
- Includes NotificationListener service
- Installs APK directly to your phone
- Starts Metro bundler for JS updates

**Option B: Build APK for Distribution**
```bash
cd mobile/android
./gradlew assembleRelease

# APK location:
# mobile/android/app/build/outputs/apk/release/app-release.apk
```

⚠️ **IMPORTANT:** Expo Go WILL NOT WORK because:
- Expo Go doesn't include custom native modules
- NotificationListenerService requires a custom dev build
- You MUST use `npx expo run:android` or build an APK

---

### Step 2: Enable Notification Access

After installing:
1. Open phone Settings → Apps → GastoTrack
2. Go to "Notification access" or "Special app access"
3. Enable notification access for GastoTrack
4. Grant the permission

**Verify it worked:**
```bash
adb shell dumpsys notification_listener | findstr gastotrack
```
Should show: `com.gastotrack.mobile/com.gastotrack.mobile.NotificationService`

---

### Step 3: Filter ADB Logcat for Your Service

**Basic command to see all logs:**
```bash
adb logcat
```

**Filtered command (RECOMMENDED):**
```bash
adb logcat NotificationService:D ApiSender:D *:S
```

**What this means:**
- `NotificationService:D` = Show DEBUG+ logs from NotificationService
- `ApiSender:D` = Show DEBUG+ logs from ApiSender
- `*:S` = Silence all other logs (reduces noise)

**Alternative - grep filter:**
```bash
adb logcat | findstr "NotificationService ApiSender"
```

**Save logs to file:**
```bash
adb logcat -f c:\Users\Chris\Documents\Gastotrack\notification_logs.txt
```

---

### Step 4: Trigger Test Notifications

#### **GCash Testing**
1. Open GCash app
2. Go to "Send Money"
3. Option A: Send ₱1 to a friend (real transaction, costs money)
4. Option B: Check if GCash has a "Test Mode" in Developer/Sandbox settings
5. Option C: Ask a friend to send you ₱1

**Expected notification format (to verify in logcat):**
```
Notification text: "You sent ₱50.00 to Juan Dela Cruz"
OR: "You sent PHP 50.00 to Juan Dela Cruz"
```

#### **Maya Testing**
1. Open Maya app
2. Go to "Send Money"
3. Send ₱1 to test

**Expected notification format:**
```
Notification text: "You sent ₱50.00 to merchant"
```

#### **GrabPay Testing**
1. Open Grab app
2. Make a GrabFood/GrabCar booking
3. Cancel immediately (to avoid actual charge)
4. OR: Check if Grab has test mode

**Expected notification format:**
```
Notification text: "Paid ₱150.00 to GrabCar"
```

---

### Step 5: Read and Analyze Logcat Output

**What to look for in logcat:**

```
D/NotificationService: Notification from: com.globe.gcash.android
D/NotificationService: Full notification text: You sent ₱50.00 to Juan Dela Cruz
D/NotificationParser: Parsed amount: 50.00
D/NotificationParser: Parsed merchant: Juan Dela Cruz
D/NotificationParser: Parsed source: gcash
D/ApiSender: Transaction sent successfully: {"id":123,"amount":50.00,...}
```

**Common issues and what they mean:**

| Log Message | What It Means | Fix |
|-------------|---------------|-----|
| `No auth token found` | User not logged in | Login first in the app |
| `Response code: 401` | JWT token expired | Re-login |
| `Response code: 404` | Backend URL wrong | Update `API_BASE_URL` |
| `Connection refused` | Backend not running | Start Laravel server |
| `Regex didn't match` | Notification text format different | Update regex in NotificationParser |

---

### Step 6: Adjust Regex Patterns Based on Real Data

**Current regex patterns in `NotificationParser.java`:**

```java
// GCash - Line ~15
Pattern.compile("₱([0-9,]+\\.?[0-9]*)")
```

**If real GCash uses "PHP" instead of "₱", update to:**
```java
Pattern.compile("(?:₱|PHP\\s?)([0-9,]+\\.?[0-9]*)")
```
This matches BOTH `₱` and `PHP` formats.

**How to update the regex:**

1. Open `mobile/android/app/src/main/java/com/gastotrack/mobile/NotificationParser.java`
2. Find the `parseGCash()` method
3. Update the Pattern.compile() line
4. Save file
5. Rebuild: `npx expo run:android`

**Regex breakdown:**
- `(?:₱|PHP\\s?)` = Match either ₱ OR "PHP" with optional space
- `([0-9,]+` = Capture digits and commas
- `\\.?[0-9]*)` = Optional decimal point and cents

**Do the same for Maya and GrabPay** based on what you see in logcat.

---

### Step 7: Verify End-to-End Flow

**Complete test checklist:**

1. ✅ Login to GastoTrack app (to get JWT token)
2. ✅ Enable notification access in phone settings
3. ✅ Start adb logcat in terminal
4. ✅ Trigger a real e-wallet notification
5. ✅ Check logcat for parsed data
6. ✅ Open GastoTrack app → Check if transaction appears in transactions list
7. ✅ Open Laravel backend → Check database for new transaction record

**SQL query to verify in backend:**
```sql
SELECT * FROM transactions 
WHERE source IN ('gcash', 'maya', 'grabpay') 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 🐛 DEBUGGING TIPS

### Check if service is running:
```bash
adb shell dumpsys activity services | findstr NotificationService
```

### Check app permissions:
```bash
adb shell dumpsys package com.gastotrack.mobile | findstr permission
```

### Clear app data and reinstall:
```bash
adb uninstall com.gastotrack.mobile
npx expo run:android
```

### Check your laptop's IP address:
```bash
ipconfig | findstr IPv4
```

### Test backend is accessible from phone:
```bash
# On phone browser, visit:
http://YOUR_IP:8000/api/transactions
# Should show "Unauthenticated" message (means backend is reachable)
```

---

## 📝 FOR THESIS DEFENSE

**Questions panelists might ask:**

**Q: How did you verify the notification listener works?**
A: "I used adb logcat to monitor real-time logs from NotificationService. I triggered actual e-wallet transactions and verified the parsed data matched the notification content. I also checked the Laravel database to confirm transactions were saved correctly."

**Q: What if the notification format changes?**
A: "The regex patterns are isolated in NotificationParser.java. I can easily update them based on the actual notification text format. I tested with multiple e-wallet apps to ensure compatibility."

**Q: Why did you use NotificationListenerService instead of SMS?**
A: "NotificationListenerService is more reliable and doesn't require SMS permission, which is considered dangerous by Google. It works for all e-wallet apps regardless of whether they send SMS."

**Q: How do you handle authentication?**
A: "The JWT token is saved to SharedPreferences when the user logs in. ApiSender.java reads it before each API request. If the token is missing or expired, the transaction is logged but not sent until the user re-authenticates."

---

## 🚀 NEXT STEPS AFTER TESTING

1. Update `API_BASE_URL` with your production domain when backend is deployed
2. Add more e-wallet apps if needed (add more package names to NotificationService.java)
3. Improve regex patterns based on real notification formats discovered during testing
4. Add error notifications to show user when auto-capture fails
5. Build final release APK with signed keystore

---

## 📞 QUICK REFERENCE

**ADB Connect Device:**
```bash
adb devices
```

**View Logs:**
```bash
adb logcat NotificationService:D ApiSender:D *:S
```

**Rebuild App:**
```bash
cd c:\Users\Chris\Documents\Gastotrack\mobile
npx expo run:android
```

**Check IP:**
```bash
ipconfig | findstr IPv4
```

**Update API URL:**
Edit line ~15 in `mobile/android/app/src/main/java/com/gastotrack/mobile/ApiSender.java`

---

Good luck with your thesis! 🎓
