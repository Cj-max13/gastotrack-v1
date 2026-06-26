import { useState } from 'react';
import api from '../services/api';

export function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========== ANALYTICS ==========
  const getAdminAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/analytics');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch analytics';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========== USERS ==========
  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/users');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch users';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.patch(`/admin/users/${userId}/toggle`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to toggle user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========== CATEGORIES ==========
  const getCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/categories');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch categories';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/admin/categories', categoryData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create category';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update category';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.delete(`/admin/categories/${categoryId}`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete category';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========== SETTINGS ==========
  const getSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/settings');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch settings';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put('/admin/settings', settingsData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update settings';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Analytics
    getAdminAnalytics,
    // Users
    getUsers,
    toggleUser,
    deleteUser,
    // Categories
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    // Settings
    getSettings,
    updateSettings,
  };
}
