import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/formatCurrency';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import Card from '../../Components/ui/Card';
import SkeletonLoader from '../../Components/ui/SkeletonLoader';
import TransactionCard from '../../Components/transaction/TransactionCard';

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard');
      setData(response.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboard();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <SkeletonLoader width="60%" height={24} />
          <SkeletonLoader width="40%" height={16} style={{ marginTop: 8 }} />
        </View>
        <ScrollView style={styles.content}>
          <View style={styles.statsGrid}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={styles.statCardSkeleton}>
                <SkeletonLoader width={40} height={40} borderRadius={20} />
                <SkeletonLoader width="60%" height={20} style={{ marginTop: 12 }} />
                <SkeletonLoader width="80%" height={14} style={{ marginTop: 4 }} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const budgetHealthColor =
    data?.budget_health?.percentage >= 80
      ? colors.budgetGood
      : data?.budget_health?.percentage >= 50
      ? colors.budgetWarning
      : colors.budgetDanger;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name || 'User'} 👋</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.expense + '20' }]}>
              <Ionicons name="arrow-down" size={24} color={colors.expense} />
            </View>
            <Text style={styles.statValue}>{formatCurrency(data?.total_spent || 0)}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: colors.income + '20' }]}>
              <Ionicons name="arrow-up" size={24} color={colors.income} />
            </View>
            <Text style={styles.statValue}>{formatCurrency(data?.total_income || 0)}</Text>
            <Text style={styles.statLabel}>Total Income</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: budgetHealthColor + '20' }]}>
              <Ionicons name="pie-chart" size={24} color={budgetHealthColor} />
            </View>
            <Text style={styles.statValue}>
              {data?.budget_health?.on_track || 0}/{data?.budget_health?.total || 0}
            </Text>
            <Text style={styles.statLabel}>Budgets On Track</Text>
          </Card>

          {data?.top_category && (
            <Card style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: data.top_category.color + '20' },
                ]}
              >
                <Ionicons name={data.top_category.icon} size={24} color={data.top_category.color} />
              </View>
              <Text style={styles.statValue}>
                {formatCurrency(data.top_category.amount)}
              </Text>
              <Text style={styles.statLabel}>{data.top_category.name}</Text>
            </Card>
          )}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.sectionLink}>View All</Text>
          </View>

          {data?.recent_transactions && data.recent_transactions.length > 0 ? (
            data.recent_transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <Card>
              <Text style={styles.emptyText}>No transactions yet</Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.primary,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  date: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statCard: {
    width: '48%',
    margin: '1%',
    padding: 16,
    alignItems: 'center',
  },
  statCardSkeleton: {
    width: '48%',
    margin: '1%',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
  },
});
