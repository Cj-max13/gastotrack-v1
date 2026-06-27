// IMPORTANT: Replace 192.168.0.11 with YOUR laptop's local IP
// To find: Open CMD and type 'ipconfig', look for IPv4 Address
export const API_BASE_URL = 'http://192.168.0.11:8000/api';

export const config = {
  apiBaseUrl: API_BASE_URL,
  apiTimeout: 30000,
};

export default config;
