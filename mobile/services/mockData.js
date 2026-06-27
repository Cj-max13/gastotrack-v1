// 🎭 Mock Data Service for Testing Without Backend
// Set MOCK_MODE = true in useAuth.js and other hooks to use this

export const mockCategories = [
  { id: 1, name: 'Food', icon: '🍔', color: '#FF6B6B', transactions_count: 15 },
  { id: 2, name: 'Transport', icon: '🚗', color: '#4ECDC4', transactions_count: 8 },
  { id: 3, name: 'Shopping', icon: '🛍️', color: '#95E1D3', transactions_count: 5 },
  { id: 4, name: 'Entertainment', icon: '🎮', color: '#F38181', transactions_count: 3 },
  { id: 5, name: 'Bills', icon: '💡', color: '#AA96DA', transactions_count: 4 },
  { id: 6, name: 'Health', icon: '💊', color: '#FCBAD3', transactions_count: 2 },
  { id: 7, name: 'Education', icon: '📚', color: '#FFFFD2', transactions_count: 1 },
  { id: 8, name: 'Others', icon: '📦', color: '#A8D8EA', transactions_count: 6 },
];

export const mockTransactions = [
  {
    id: 1,
    amount: 250.00,
    merchant: 'Jollibee',
    description: 'Lunch with friends',
    type: 'expense',
    source: 'gcash',
    transaction_date: '2026-06-27',
    category_id: 1,
    category: { id: 1, name: 'Food', icon: '🍔', color: '#FF6B6B' },
    created_at: '2026-06-27T10:30:00Z',
  },
  {
    id: 2,
    amount: 150.00,
    merchant: 'Grab',
    description: 'Ride to work',
    type: 'expense',
    source: 'grabpay',
    transaction_date: '2026-06-26',
    category_id: 2,
    category: { id: 2, name: 'Transport', icon: '🚗', color: '#4ECDC4' },
    created_at: '2026-06-26T08:15:00Z',
  },
  {
    id: 3,
    amount: 500.00,
    merchant: 'Lazada',
    description: 'New headphones',
    type: 'expense',
    source: 'maya',
    transaction_date: '2026-06-25',
    category_id: 3,
    category: { id: 3, name: 'Shopping', icon: '🛍️', color: '#95E1D3' },
    created_at: '2026-06-25T14:20:00Z',
  },
  {
    id: 4,
    amount: 1000.00,
    merchant: 'Meralco',
    description: 'Monthly electric bill',
    type: 'expense',
    source: 'manual',
    transaction_date: '2026-06-24',
    category_id: 5,
    category: { id: 5, name: 'Bills', icon: '💡', color: '#AA96DA' },
    created_at: '2026-06-24T16:00:00Z',
  },
  {
    id: 5,
    amount: 180.00,
    merchant: 'Mercury Drug',
    description: 'Medicine',
    type: 'expense',
    source: 'gcash',
    transaction_date: '2026-06-23',
    category_id: 6,
    category: { id: 6, name: 'Health', icon: '💊', color: '#FCBAD3' },
    created_at: '2026-06-23T11:00:00Z',
  },
];

export const mockBudgets = [
  {
    id: 1,
    category_id: 1,
    limit_amount: 5000.00,
    spent_amount: 2750.00,
    month: 6,
    year: 2026,
    category: { id: 1, name: 'Food', icon: '🍔', color: '#FF6B6B' },
  },
  {
    id: 2,
    category_id: 2,
    limit_amount: 2000.00,
    spent_amount: 1200.00,
    month: 6,
    year: 2026,
    category: { id: 2, name: 'Transport', icon: '🚗', color: '#4ECDC4' },
  },
  {
    id: 3,
    category_id: 5,
    limit_amount: 3000.00,
    spent_amount: 1000.00,
    month: 6,
    year: 2026,
    category: { id: 5, name: 'Bills', icon: '💡', color: '#AA96DA' },
  },
];

export const mockDashboardData = {
  total_expenses: 4280.00,
  total_income: 0,
  transactions_count: 38,
  top_category: {
    name: 'Food',
    total: 2750.00,
    icon: '🍔',
    color: '#FF6B6B',
  },
  recent_transactions: mockTransactions.slice(0, 5),
};

export const mockAnalytics = {
  spending_by_category: [
    { category: 'Food', total: 2750.00, icon: '🍔', color: '#FF6B6B' },
    { category: 'Transport', total: 1200.00, icon: '🚗', color: '#4ECDC4' },
    { category: 'Bills', total: 1000.00, icon: '💡', color: '#AA96DA' },
    { category: 'Shopping', total: 750.00, icon: '🛍️', color: '#95E1D3' },
    { category: 'Health', total: 380.00, icon: '💊', color: '#FCBAD3' },
    { category: 'Entertainment', total: 450.00, icon: '🎮', color: '#F38181' },
  ],
  daily_trend: [
    { date: '2026-06-21', total: 450.00 },
    { date: '2026-06-22', total: 320.00 },
    { date: '2026-06-23', total: 580.00 },
    { date: '2026-06-24', total: 1000.00 },
    { date: '2026-06-25', total: 750.00 },
    { date: '2026-06-26', total: 430.00 },
    { date: '2026-06-27', total: 750.00 },
  ],
  monthly_trend: [
    { month: 'Jan 2026', value: 8500 },
    { month: 'Feb 2026', value: 7200 },
    { month: 'Mar 2026', value: 9100 },
    { month: 'Apr 2026', value: 6800 },
    { month: 'May 2026', value: 8900 },
    { month: 'Jun 2026', value: 4280 },
  ],
  source_distribution: [
    { source: 'gcash', count: 15, percentage: 39.5 },
    { source: 'maya', count: 10, percentage: 26.3 },
    { source: 'grabpay', count: 8, percentage: 21.1 },
    { source: 'manual', count: 5, percentage: 13.1 },
  ],
};

export const mockAdminAnalytics = {
  total_users: 25,
  transactions_today: 8,
  transactions_this_month: 156,
  total_amount: 125000.00,
  most_used_source: { source: 'gcash', count: 78 },
  top_category: { id: 1, name: 'Food', total: 45000.00 },
  new_users_by_month: [
    { month: 'Jan 2026', count: 5 },
    { month: 'Feb 2026', count: 3 },
    { month: 'Mar 2026', count: 7 },
    { month: 'Apr 2026', count: 4 },
    { month: 'May 2026', count: 6 },
  ],
};

export const mockUsers = [
  { id: 2, name: 'Juan Dela Cruz', email: 'juan@example.com', role: 'user', is_active: true, transactions_count: 15, total_spent: 8500.00 },
  { id: 3, name: 'Maria Santos', email: 'maria@example.com', role: 'user', is_active: true, transactions_count: 22, total_spent: 12300.00 },
  { id: 4, name: 'Pedro Garcia', email: 'pedro@example.com', role: 'user', is_active: false, transactions_count: 8, total_spent: 4200.00 },
  { id: 5, name: 'Ana Reyes', email: 'ana@example.com', role: 'user', is_active: true, transactions_count: 31, total_spent: 15600.00 },
];

export const mockSystemSettings = {
  app_name: 'GastoTrack',
  registration_enabled: 'true',
  ai_enabled: 'true',
  max_budget_categories: '10',
};

// Helper function to simulate API delay
export const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApi = {
  // Categories
  getCategories: async () => {
    await delay();
    return { categories: mockCategories };
  },
  
  // Transactions
  getTransactions: async () => {
    await delay();
    return { transactions: mockTransactions };
  },
  
  createTransaction: async (data) => {
    await delay();
    const newTransaction = {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString(),
      category: mockCategories.find(c => c.id === data.category_id),
    };
    return { transaction: newTransaction };
  },
  
  // Budgets
  getBudgets: async () => {
    await delay();
    return { budgets: mockBudgets };
  },
  
  setBudget: async (data) => {
    await delay();
    return { budget: { id: Date.now(), ...data } };
  },
  
  // Dashboard
  getDashboard: async () => {
    await delay();
    return mockDashboardData;
  },
  
  // Analytics
  getAnalytics: async () => {
    await delay();
    return mockAnalytics;
  },
  
  // Admin
  getAdminAnalytics: async () => {
    await delay();
    return mockAdminAnalytics;
  },
  
  getUsers: async () => {
    await delay();
    return { data: mockUsers };
  },
  
  getAdminCategories: async () => {
    await delay();
    return { categories: mockCategories };
  },
  
  getSettings: async () => {
    await delay();
    return { settings: mockSystemSettings };
  },
};
