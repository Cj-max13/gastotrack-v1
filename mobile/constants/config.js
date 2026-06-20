// Change this to your Laravel API URL
// For local development on Android Emulator use: http://10.0.2.2:8000
// For local development on iOS Simulator use: http://localhost:8000
// For physical device use your computer's local IP: http://192.168.x.x:8000
// For production use your deployed URL: https://your-domain.com

// CONFIGURED FOR PHYSICAL DEVICE (Same WiFi as PC)
export const API_BASE_URL = 'http://192.168.0.11:8000/api';

// FOR EMULATOR: Uncomment line below and comment line above
// export const API_BASE_URL = 'http://10.0.2.2:8000/api';

export const config = {
  apiBaseUrl: API_BASE_URL,
  apiTimeout: 30000, // 30 seconds
};

export default config;
