import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../constants/colors';
import { useBudget } from '../../hooks/useBudget';
import { categories } from '../../constants/categories';
import BudgetCard from '../../Components/budget/BudgetCard';
import SkeletonLoader from '../../Components/ui/SkeletonLoader';
import EmptyState from '../../Components/ui/EmptyState';
import Input from '../../Components/ui/Input';
import Button from '../../Components/ui/Button';
import Toast from 'react-native-toast-message';

export default function BudgetScreen() {
  const { budgets, loading, fetchBudgets, setBudget } = useBudget();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBudgets();
    setRefreshing(false);
  };

  const handleSetBudget = (category) => {
    setSelectedCategory(category);
    
    // Pre-fill if budget exists
    const existing = budgets.find((b) => b.category_id === category.id);
    if (existing) {
      setAmount(existing.limit_amount.toString());
    } else {
      setAmount('');
    }
    
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setSaving(true);
    try {
      await setBudget(selectedCategory.id, parseFloat(amount));
      setModalVisible(false);
      
      Toast.show({
        type: 'success',
        text1: 'Budget Updated',
        text2: `Budget set for ${selectedCategory.name}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to set budget');
    } finally {
      setSaving(false);
    }
  };

  if (loading && budgets.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Budgets</Text>
        </View>
        <ScrollView style={styles.content}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.skeletonCard}>
              <SkeletonLoader width={40} height={40} borderRadius={20} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <SkeletonLoader width="60%" height={16} />
                <View style={{ height: 8 }} />
                <SkeletonLoader width="100%" height={8} borderRadius={4} />
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budgets</Text>
        <Text style={styles.subtitle}>
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {budgets.length === 0 ? (
          <EmptyState
            icon="wallet-outline"
            title="No Budgets Set"
            subtitle="Set budgets for your categories to track spending"
          />
        ) : (
          budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onPress={() => handleSetBudget(budget.category)}
            />
          ))
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Set Budget for Other Categories</Text>
          {categories
            .filter((cat) => !budgets.find((b) => b.category_id === cat.id))
            .map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleSetBudget(category)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + '20' },
                  ]}
                >
                  <Text style={{ color: category.color }}>
                    {category.icon}
                  </Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.addButton}>Set Budget</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      {/* Set Budget Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Set Budget for {selectedCategory?.name}
            </Text>

            <Input
              label="Monthly Budget Amount"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                variant="secondary"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Save"
                onPress={handleSave}
                loading={saving}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
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
  subtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  skeletonCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  addButton: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
