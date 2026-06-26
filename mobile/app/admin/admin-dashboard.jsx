import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useAdmin } from '../../hooks/useAdmin';

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { getAdminAnalytics, loading } = useAdmin();
  const [stats, setStats] = useState({
    total_users: 0,
    transactions_today: 0,
    transactions_this_month: 0,
    total_amount: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (user?.role !== 'admin') {
      Alert.alert('Unauthorized', 'You do not have admin access', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    try {
      const data = await getAdminAnalytics();
      setStats(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load analytics');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const AdminSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const AdminButton = ({ title, onPress, icon }) => (
    <TouchableOpacity style={styles.adminButton} onPress={onPress}>
      <Text style={styles.adminButtonText}>{icon} {title}</Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing && stats.total_users === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, {user?.name}</Text>
      </View>

      <AdminSection title="Statistics">
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.total_users}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.transactions_today}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.transactions_this_month}</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>
        <View style={[styles.statCard, { marginTop: 10 }]}>
          <Text style={styles.statValue}>₱{stats.total_amount?.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</Text>
          <Text style={styles.statLabel}>Total Amount Processed</Text>
        </View>
      </AdminSection>

      <AdminSection title="Management">
        <AdminButton 
          title="Manage Users" 
          icon="👥"
          onPress={() => router.push('/admin/admin-users')}
        />
        <AdminButton 
          title="Manage Categories" 
          icon="📁"
          onPress={() => router.push('/admin/admin-categories')}
        />
        <AdminButton 
          title="System Settings" 
          icon="⚙️"
          onPress={() => router.push('/admin/admin-settings')}
        />
      </AdminSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#7f8c8d',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  adminButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
