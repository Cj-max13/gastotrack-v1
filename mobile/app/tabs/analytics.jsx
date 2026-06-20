import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../constants/colors';
import api from '../../services/api';
import Card from '../../Components/ui/Card';
import SkeletonLoader from '../../Components/ui/SkeletonLoader';
import PieChart from '../../Components/charts/PieChart';
import BarChart from '../../Components/charts/BarChart';
import LineChart from '../../Components/charts/LineChart';

export default function AnalyticsScreen() {
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async (selectedPeriod = period) => {
    try {
      setLoading(true);
      const response = await api.get(`/analytics?period=${selectedPeriod}`);
      setData(response.data);
    } catch (error) {
      console.error('Analytics fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    fetchAnalytics(newPeriod);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
      </View>

      <View style={styles.periodSelector}>
        {['week', 'month', 'year'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodButton, period === p && styles.periodButtonActive]}
            onPress={() => handlePeriodChange(p)}
          >
            <Text
              style={[styles.periodText, period === p && styles.periodTextActive]}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View>
            <Card style={styles.chartCard}>
              <SkeletonLoader width="100%" height={200} />
            </Card>
            <Card style={styles.chartCard}>
              <SkeletonLoader width="100%" height={200} />
            </Card>
          </View>
        ) : (
          <>
            {/* Category Breakdown */}
            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Spending by Category</Text>
              <PieChart data={data?.category_breakdown || []} />
            </Card>

            {/* Daily Trend */}
            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Daily Spending</Text>
              <BarChart data={data?.daily_trend || []} />
            </Card>

            {/* Monthly Trend */}
            <Card style={styles.chartCard}>
              <Text style={styles.chartTitle}>Monthly Trend</Text>
              <LineChart data={data?.monthly_trend || []} />
            </Card>
          </>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  periodSelector: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  periodTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  chartCard: {
    marginBottom: 16,
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
});
