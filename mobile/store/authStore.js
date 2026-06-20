import {create} from 'zustand';
import * as SecureStore from 'expo-secure-store';

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
    set({user, token});
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync('auth_token');
    set({user:null, token:null});
  },
}));
