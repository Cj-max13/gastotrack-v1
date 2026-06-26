import { useState } from 'react';
import { useRouter } from 'expo-router';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { saveToken } from '../modules/NotificationModule';

export function useAuth() {
  const router = useRouter();
  const { user, setAuth, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/login', { email, password });
      const { token, user: userData } = response.data;

      await setAuth(userData, token);
      
      // Save token for notification module
      try {
        await saveToken(token);
      } catch (err) {
        console.log('Could not save token to notification module:', err);
      }

      // Navigate based on role
      if (userData.role === 'admin') {
        router.replace('/admin/admin-dashboard');
      } else {
        router.replace('/tabs/dashboard');
      }

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/register', { name, email, password });
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearAuth();
    router.replace('/auth/login');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
    error,
  };
}
