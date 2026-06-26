package com.NotificationListener.mobile;

import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;
import org.json.JSONObject;

public class NotificationService extends NotificationListenerService {
    private static final String TAG = "NotificationService";
    
    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        try {
            String packageName = sbn.getPackageName();
            
            // Only process e-wallet notifications
            if (!isEWalletApp(packageName)) {
                return;
            }
            
            // Extract notification text
            String title = "";
            String text = "";
            
            if (sbn.getNotification().extras != null) {
                title = sbn.getNotification().extras.getString("android.title", "");
                text = sbn.getNotification().extras.getString("android.text", "");
            }
            
            String fullText = title + " " + text;
            Log.d(TAG, "E-wallet notification from " + packageName + ": " + fullText);
            
            // Parse the notification
            JSONObject parsed = NotificationParser.parse(fullText, packageName);
            
            if (parsed != null && parsed.has("amount")) {
                Log.d(TAG, "Parsed transaction: " + parsed.toString());
                
                // Send to Laravel backend
                ApiSender.sendTransaction(getApplicationContext(), parsed);
            } else {
                Log.d(TAG, "Could not parse notification");
            }
            
        } catch (Exception e) {
            Log.e(TAG, "Error processing notification: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        // Not needed for our use case
    }
    
    private boolean isEWalletApp(String packageName) {
        return packageName.equals("com.globe.gcash.android") ||
               packageName.equals("com.paymaya") ||
               packageName.equals("com.grabtaxi.passenger");
    }
}
