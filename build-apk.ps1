# GastoTrack APK Builder
# No Android Studio needed!

Write-Host ""
Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "    📱 GastoTrack APK Builder" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
Write-Host "🔧 Setting up environment..." -ForegroundColor Yellow
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "C:\Users\Chris\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:PATH"

# Verify Java
Write-Host "☕ Checking Java..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "   ✓ Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Java not found! Check JAVA_HOME" -ForegroundColor Red
    exit 1
}

# Navigate to android folder
Write-Host ""
Write-Host "📂 Navigating to project..." -ForegroundColor Yellow
Set-Location "mobile\android"

# Build APK
Write-Host ""
Write-Host "📦 Building APK (this may take 3-5 minutes)..." -ForegroundColor Yellow
Write-Host "    Please wait..." -ForegroundColor Gray
Write-Host ""

.\gradlew.bat assembleDebug

# Check if successful
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "    ✅ BUILD SUCCESSFUL!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    # Show APK location
    Write-Host "📱 APK Location:" -ForegroundColor Cyan
    Write-Host "   app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor White
    Write-Host ""
    
    # Copy to Desktop for easy access
    $apkPath = "app\build\outputs\apk\debug\app-debug.apk"
    $desktopPath = "$env:USERPROFILE\Desktop\GastoTrack.apk"
    
    if (Test-Path $apkPath) {
        Copy-Item $apkPath $desktopPath -Force
        Write-Host "📋 Copied to Desktop:" -ForegroundColor Cyan
        Write-Host "   $desktopPath" -ForegroundColor White
        Write-Host ""
        
        # Show file size
        $fileSize = (Get-Item $desktopPath).Length / 1MB
        Write-Host "📊 APK Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
        Write-Host ""
    }
    
    # Next steps
    Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
    Write-Host "   1. Copy GastoTrack.apk to your phone" -ForegroundColor White
    Write-Host "   2. Install on your phone" -ForegroundColor White
    Write-Host "   3. Make sure backend is running: php artisan serve" -ForegroundColor White
    Write-Host "   4. Make sure phone is on same WiFi as PC" -ForegroundColor White
    Write-Host "   5. Open and test the app!" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "    ❌ BUILD FAILED!" -ForegroundColor Red
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check the errors above for details." -ForegroundColor Yellow
    Write-Host ""
}

# Return to root directory
Set-Location "..\..\"

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
