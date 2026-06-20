# 📱 Build APK Without Android Studio

## 🎯 **Build APK Using Command Line Only**

No Android Studio needed! Just PowerShell commands.

---

## **Step 1: Set Environment Variables**

Open **PowerShell** (normal window, no admin needed):

```powershell
# Set JAVA_HOME
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"

# Set ANDROID_HOME (adjust if your SDK is elsewhere)
$env:ANDROID_HOME = "C:\Users\Chris\AppData\Local\Android\Sdk"

# Add to PATH
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools;$env:PATH"
```

**Verify Java is found:**
```powershell
java -version
```
Should show: Java version 21 or similar ✅

---

## **Step 2: Navigate to Android Folder**

```powershell
cd C:\Users\Chris\Documents\Gastotrack\mobile\android
```

---

## **Step 3: Build the APK**

```powershell
.\gradlew.bat assembleDebug
```

**What happens:**
- Gradle downloads dependencies (first time: 5-10 min)
- Compiles your code
- Packages everything into APK
- Creates app-debug.apk

**Output:**
```
BUILD SUCCESSFUL in 3m 45s
```

---

## **Step 4: Find Your APK**

APK location:
```
C:\Users\Chris\Documents\Gastotrack\mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

**Check it's there:**
```powershell
ls app\build\outputs\apk\debug\
```

Should show: `app-debug.apk` ✅

---

## **Step 5: Transfer to Phone**

### **Option A: USB Cable**
```powershell
# Copy APK to easier location first
Copy-Item "app\build\outputs\apk\debug\app-debug.apk" "$env:USERPROFILE\Desktop\GastoTrack.apk"
```

Then:
1. Connect phone to PC via USB
2. Copy `GastoTrack.apk` from Desktop to phone's Downloads
3. On phone: Files → Downloads → Tap GastoTrack.apk → Install

### **Option B: Install via ADB (if USB debugging enabled)**
```powershell
# Make sure phone is connected
$env:ANDROID_HOME\platform-tools\adb devices

# Install directly
$env:ANDROID_HOME\platform-tools\adb install -r "app\build\outputs\apk\debug\app-debug.apk"
```

---

## 🎯 **All-in-One Build Script**

Save this as `build-apk.ps1` in your Gastotrack folder:

```powershell
# GastoTrack APK Builder
Write-Host "🚀 Building GastoTrack APK..." -ForegroundColor Green

# Set environment
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "C:\Users\Chris\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:PATH"

# Navigate to android folder
cd mobile\android

# Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
.\gradlew.bat clean

# Build APK
Write-Host "📦 Building APK..." -ForegroundColor Yellow
.\gradlew.bat assembleDebug

# Check if successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 APK location:" -ForegroundColor Cyan
    Write-Host "   app\build\outputs\apk\debug\app-debug.apk"
    Write-Host ""
    
    # Copy to Desktop
    $desktopPath = "$env:USERPROFILE\Desktop\GastoTrack.apk"
    Copy-Item "app\build\outputs\apk\debug\app-debug.apk" $desktopPath -Force
    Write-Host "📋 Also copied to Desktop: GastoTrack.apk" -ForegroundColor Green
    
    # Show file size
    $fileSize = (Get-Item $desktopPath).Length / 1MB
    Write-Host "📊 APK Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
} else {
    Write-Host "❌ Build failed! Check errors above." -ForegroundColor Red
}

# Return to root
cd ..\..
```

**To use:**
```powershell
# In Gastotrack folder
.\build-apk.ps1
```

---

## 🔧 **Build Release APK (For Production)**

```powershell
# Build release version (smaller, optimized)
.\gradlew.bat assembleRelease
```

**Output:**
```
app\build\outputs\apk\release\app-release-unsigned.apk
```

**Note:** Release APK needs to be signed before installing.

---

## 📊 **Build Commands Cheat Sheet**

```powershell
# Debug APK (for testing)
.\gradlew.bat assembleDebug

# Release APK (for production)
.\gradlew.bat assembleRelease

# Clean build (start fresh)
.\gradlew.bat clean

# Clean + Build
.\gradlew.bat clean assembleDebug

# Check what tasks are available
.\gradlew.bat tasks

# Build with more info
.\gradlew.bat assembleDebug --info

# Build even faster (parallel)
.\gradlew.bat assembleDebug --parallel
```

---

## 🐛 **Troubleshooting**

### **Error: "JAVA_HOME is not set"**
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
java -version  # Verify it works
```

### **Error: "SDK location not found"**
```powershell
$env:ANDROID_HOME = "C:\Users\Chris\AppData\Local\Android\Sdk"
```

Or create `local.properties` file:
```
sdk.dir=C\:\\Users\\Chris\\AppData\\Local\\Android\\Sdk
```

### **Error: "gradlew.bat not found"**
```powershell
# Make sure you're in the android folder
cd C:\Users\Chris\Documents\Gastotrack\mobile\android
ls gradlew.bat  # Should show the file
```

### **Build takes forever**
```powershell
# Enable parallel builds
.\gradlew.bat assembleDebug --parallel --max-workers=4
```

### **Build fails with "Out of memory"**
Edit `gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
```

---

## ⚡ **Quick Build Process**

```powershell
# 1. Open PowerShell
# 2. Run these commands:

cd C:\Users\Chris\Documents\Gastotrack\mobile\android
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
.\gradlew.bat assembleDebug

# 3. Wait 3-5 minutes
# 4. Get APK from: app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 **After Building**

1. **Find APK**: `app\build\outputs\apk\debug\app-debug.apk`
2. **Copy to phone** via USB or email
3. **Install** on phone
4. **Test** the app!

---

## 💡 **Pro Tips**

### **Make build script executable:**
Create `build.cmd` file:
```cmd
@echo off
echo Building GastoTrack APK...
cd mobile\android
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
gradlew.bat assembleDebug
echo.
echo Done! APK at: app\build\outputs\apk\debug\app-debug.apk
pause
```

**Usage:** Double-click `build.cmd`

### **Build faster next time:**
```powershell
# Gradle caches everything after first build
# Next builds take only 30 seconds - 2 minutes!
```

---

## ✅ **Success Indicators**

You know it worked when you see:
```
BUILD SUCCESSFUL in 3m 45s
142 actionable tasks: 142 executed
```

And file exists:
```
app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎯 **Next Steps**

1. ✅ Build APK with command line
2. ✅ Copy to phone
3. ✅ Install and test
4. ✅ Use your app!

**No Android Studio GUI needed!** 🚀
