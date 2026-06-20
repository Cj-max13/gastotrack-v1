@echo off
REM GastoTrack APK Builder
REM No Android Studio needed!

echo.
echo ===============================================
echo     GastoTrack APK Builder
echo ===============================================
echo.

REM Set environment
echo Setting up environment...
set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set ANDROID_HOME=C:\Users\Chris\AppData\Local\Android\Sdk
set PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%

REM Navigate to android folder
echo Navigating to project...
cd mobile\android

REM Build APK
echo.
echo Building APK (this may take 3-5 minutes)...
echo Please wait...
echo.

call gradlew.bat assembleDebug

REM Check result
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===============================================
    echo     BUILD SUCCESSFUL!
    echo ===============================================
    echo.
    echo APK Location:
    echo   app\build\outputs\apk\debug\app-debug.apk
    echo.
    
    REM Copy to Desktop
    copy /Y "app\build\outputs\apk\debug\app-debug.apk" "%USERPROFILE%\Desktop\GastoTrack.apk" >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo Copied to Desktop: GastoTrack.apk
        echo.
    )
    
    echo Next Steps:
    echo   1. Copy GastoTrack.apk to your phone
    echo   2. Install on your phone
    echo   3. Make sure backend is running: php artisan serve
    echo   4. Make sure phone is on same WiFi as PC
    echo   5. Open and test the app!
    echo.
) else (
    echo.
    echo ===============================================
    echo     BUILD FAILED!
    echo ===============================================
    echo.
    echo Check the errors above for details.
    echo.
)

REM Return to root
cd ..\..

echo.
pause
