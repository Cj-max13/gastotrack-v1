package com.NotificationListener.mobile;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.json.JSONObject;

public class NotificationParser {
    
    public static JSONObject parse(String text, String packageName) {
        try {
            if (packageName.equals("com.globe.gcash.android")) {
                return parseGCash(text);
            } else if (packageName.equals("com.paymaya")) {
                return parseMaya(text);
            } else if (packageName.equals("com.grabtaxi.passenger")) {
                return parseGrabPay(text);
            }
            
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    private static JSONObject parseGCash(String text) {
        try {
            JSONObject result = new JSONObject();
            
            // Extract amount: ₱150.00
            Pattern amountPattern = Pattern.compile("₱([0-9,]+\\.?[0-9]*)");
            Matcher amountMatcher = amountPattern.matcher(text);
            
            if (amountMatcher.find()) {
                String amountStr = amountMatcher.group(1).replace(",", "");
                result.put("amount", Double.parseDouble(amountStr));
            }
            
            // Extract merchant: "to 7-Eleven"
            Pattern merchantPattern = Pattern.compile("to (.+?)(?:\\s+via|\\s+using|$)");
            Matcher merchantMatcher = merchantPattern.matcher(text);
            
            if (merchantMatcher.find()) {
                result.put("merchant", merchantMatcher.group(1).trim());
            } else {
                result.put("merchant", "GCash Transaction");
            }
            
            result.put("source", "gcash");
            result.put("type", "expense");
            
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    private static JSONObject parseMaya(String text) {
        try {
            JSONObject result = new JSONObject();
            
            // Extract amount: PHP 200.00
            Pattern amountPattern = Pattern.compile("PHP ([0-9,]+\\.?[0-9]*)");
            Matcher amountMatcher = amountPattern.matcher(text);
            
            if (amountMatcher.find()) {
                String amountStr = amountMatcher.group(1).replace(",", "");
                result.put("amount", Double.parseDouble(amountStr));
            }
            
            // Extract merchant
            Pattern merchantPattern = Pattern.compile("to (.+)$");
            Matcher merchantMatcher = merchantPattern.matcher(text);
            
            if (merchantMatcher.find()) {
                result.put("merchant", merchantMatcher.group(1).trim());
            } else {
                result.put("merchant", "Maya Transaction");
            }
            
            result.put("source", "maya");
            result.put("type", "expense");
            
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    private static JSONObject parseGrabPay(String text) {
        try {
            JSONObject result = new JSONObject();
            
            // Extract amount
            Pattern amountPattern = Pattern.compile("₱([0-9,]+\\.?[0-9]*)");
            Matcher amountMatcher = amountPattern.matcher(text);
            
            if (amountMatcher.find()) {
                String amountStr = amountMatcher.group(1).replace(",", "");
                result.put("amount", Double.parseDouble(amountStr));
            }
            
            result.put("merchant", "Grab");
            result.put("source", "grabpay");
            result.put("type", "expense");
            
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
