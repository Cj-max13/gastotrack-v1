package com.NotificationListener.mobile;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ApiSender {
    private static final String TAG = "ApiSender";
    private static final ExecutorService executor = Executors.newSingleThreadExecutor();
    
    public static void sendTransaction(Context context, JSONObject transactionData) {
        executor.execute(() -> {
            try {
                // Get JWT token from SharedPreferences
                SharedPreferences prefs = context.getSharedPreferences("RCTAsyncLocalStorage_V1", Context.MODE_PRIVATE);
                String token = prefs.getString("auth_token", null);
                
                if (token == null) {
                    Log.e(TAG, "No auth token found");
                    return;
                }
                
                // Get API URL from config
                String apiUrl = "http://192.168.0.11:8000/api/transactions"; // Update this with your backend URL
                
                URL url = new URL(apiUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept", "application/json");
                conn.setRequestProperty("Authorization", "Bearer " + token);
                conn.setDoOutput(true);
                conn.setConnectTimeout(10000);
                conn.setReadTimeout(10000);
                
                // Add category_id (default to 1 for now, you can make this smarter later)
                transactionData.put("category_id", 1);
                transactionData.put("description", "Auto-captured from " + transactionData.getString("source"));
                
                // Send request
                OutputStream os = conn.getOutputStream();
                os.write(transactionData.toString().getBytes("UTF-8"));
                os.flush();
                os.close();
                
                int responseCode = conn.getResponseCode();
                Log.d(TAG, "Response code: " + responseCode);
                
                if (responseCode == HttpURLConnection.HTTP_OK || responseCode == HttpURLConnection.HTTP_CREATED) {
                    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    String inputLine;
                    StringBuilder response = new StringBuilder();
                    
                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    in.close();
                    
                    Log.d(TAG, "Transaction sent successfully: " + response.toString());
                } else {
                    Log.e(TAG, "Failed to send transaction. Response code: " + responseCode);
                }
                
                conn.disconnect();
                
            } catch (Exception e) {
                Log.e(TAG, "Error sending transaction: " + e.getMessage());
                e.printStackTrace();
            }
        });
    }
}
