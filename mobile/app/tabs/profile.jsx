import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../Components/ui/Card';
import { requestPermission } from '../../modules/NotificationModule';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleEnableNotifications = () => {
    Alert.alert(
      'Enable E-wallet Notifications',
      'This will allow GastoTrack to automatically capture transactions from GCash, Maya, and GrabPay notifications.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Enable',
          onPress: () => {
            try {
              requestPermission();
            } catch (error) {
              Alert.alert('Error', 'Failed to open notification settings');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <Card style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@email.com'}</Text>
          {user?.role === 'admin' && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Admin</Text>
            </View>
          )}
        </Card>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <Card style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleEnableNotifications}
            >
              <View style={styles.menuIcon}>
                <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>Auto-capture Transactions</Text>
                <Text style={styles.menuDescription}>
                  Enable notification access for e-wallets
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
            </TouchableOpacity>
          </Card>

          {user?.role === 'admin' && (
            <Card style={styles.menuCard}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/admin/admin-dashboard')}
              >
                <View style={styles.menuIcon}>
                  <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuLabel}>Admin Panel</Text>
                  <Text style={styles.menuDescription}>Manage users and settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
              </TouchableOpacity>
            </Card>
          )}
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <Card style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Ionicons name="information-circle-outline" size={24} color={colors.gray500} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>Version</Text>
                <Text style={styles.menuDescription}>1.0.0</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
  content: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.primary + '20',
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuCard: {
    padding: 0,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 32,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
});
