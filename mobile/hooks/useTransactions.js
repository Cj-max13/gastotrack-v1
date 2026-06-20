import { useState, useEffect } from 'react';
import api from '../services/api';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category_id) params.append('category_id', filters.category_id);
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);
      if (filters.type) params.append('type', filters.type);

      const response = await api.get(`/transactions?${params.toString()}`);
      setTransactions(response.data.data || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (data) => {
    try {
      const response = await api.post('/transactions', data);
      
      // Add to local state
      setTransactions((prev) => [response.data.transaction, ...prev]);
      
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      
      // Remove from local state
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    refreshing,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    refresh,
  };
}
