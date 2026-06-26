package com.NotificationListener.mobile;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.provider.Settings;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NotificationModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "NotificationModule";
    
    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    
    @Override
    public String getName() {
        return MODULE_NAME;
    }
    
    @ReactMethod
    public void requestPermission(Promise promise) {
        try {
            // Check if notification listener permission is granted
            if (!isNotificationServiceEnabled()) {
                // Open notification listener settings
                Intent intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getReactApplicationContext().startActivity(intent);
                promise.resolve("Please enable notification access for GastoTrack");
            } else {
                promise.resolve("Notification access already granted");
            }
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
    
    @ReactMethod
    public void saveToken(String token, Promise promise) {
        try {
            SharedPreferences prefs = getReactApplicationContext()
                .getSharedPreferences("RCTAsyncLocalStorage_V1", Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString("auth_token", token);
            editor.apply();
            promise.resolve("Token saved");
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
    
    @ReactMethod
    public void checkPermission(Promise promise) {
        promise.resolve(isNotificationServiceEnabled());
    }
    
    private boolean isNotificationServiceEnabled() {
        String pkgName = getReactApplicationContext().getPackageName();
        final String flat = Settings.Secure.getString(
            getReactApplicationContext().getContentResolver(),
            "enabled_notification_listeners"
        );
        
        if (flat != null && !flat.isEmpty()) {
            final String[] names = flat.split(":");
            for (String name : names) {
                if (name.contains(pkgName)) {
                    return true;
                }
            }
        }
        return false;
    }
}
