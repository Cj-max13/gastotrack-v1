import {create} from 'zustand';
import * as SecureStore from 'expo-secure-store';

// Helper function to convert string booleans from backend to actual booleans
const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    is_active: user.is_active === true || user.is_active === 1 || user.is_active === '1' ? true : false,
    email_verified_at: user.email_verified_at ? true : false,
  };
};

export const useAuthStore = create((set) => ({
  user:null,
  token:null,
  isLoading:true,

  loadAuth: async () => {
    const token = await SecureStore.getItemAsync('auth_token');
    set({token, isLoading:false});
  }, 

  setAuth: async (user, token) => {
    await SecureStore.setItemAsync('auth_token',token);
    const normalizedUser = normalizeUser(user);
    set({user: normalizedUser, token});
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync('auth_token');
    set({user:null, token:null});
  },
}));
