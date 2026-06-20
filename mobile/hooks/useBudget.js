import { useState, useEffect } from 'react';
import api from '../services/api';

export function useBudget() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBudgets = async (month, year) => {
    try {
      setLoading(true);
      setError(null);

      const currentMonth = month || new Date().getMonth() + 1;
      const currentYear = year || new Date().getFullYear();

      const response = await api.get(`/budgets?month=${currentMonth}&year=${currentYear}`);
      setBudgets(response.data.budgets || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  const setBudget = async (categoryId, amount, month, year) => {
    try {
      const currentMonth = month || new Date().getMonth() + 1;
      const currentYear = year || new Date().getFullYear();

      const response = await api.post('/budgets', {
        category_id: categoryId,
        limit_amount: amount,
        month: currentMonth,
        year: currentYear,
      });

      // Update local state
      const existingIndex = budgets.findIndex(
        (b) =>
          b.category_id === categoryId &&
          b.month === currentMonth &&
          b.year === currentYear
      );

      if (existingIndex >= 0) {
        const newBudgets = [...budgets];
        newBudgets[existingIndex] = response.data.budget;
        setBudgets(newBudgets);
      } else {
        setBudgets([...budgets, response.data.budget]);
      }

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return {
    budgets,
    loading,
    error,
    fetchBudgets,
    setBudget,
  };
}
