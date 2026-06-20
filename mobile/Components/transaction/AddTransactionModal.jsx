import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { colors } from '../../constants/colors';
import { categories } from '../../constants/categories';

export default function AddTransactionModal({ visible, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    // Validation
    const newErrors = {};
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!merchant.trim()) {
      newErrors.merchant = 'Please enter merchant name';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const transactionData = {
        amount: parseFloat(amount),
        merchant: merchant.trim(),
        description: description.trim(),
        category_id: categoryId,
        type,
        transaction_date: date,
        source: 'manual',
      };

      await onSuccess(transactionData);
      
      // Reset form
      setAmount('');
      setMerchant('');
      setDescription('');
      setCategoryId(1);
      setType('expense');
      setDate(new Date().toISOString().split('T')[0]);
      setErrors({});
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Transaction</Text>
            <TouchableOpacity onPress={onClose} disabled={loading}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Input
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              error={errors.amount}
            />

            <Input
              label="Merchant"
              value={merchant}
              onChangeText={setMerchant}
              placeholder="Where did you spend?"
              autoCapitalize="words"
              error={errors.merchant}
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeButtons}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'expense' && styles.typeButtonActive,
                  ]}
                  onPress={() => setType('expense')}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      type === 'expense' && styles.typeButtonTextActive,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'income' && styles.typeButtonActive,
                  ]}
                  onPress={() => setType('income')}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      type === 'income' && styles.typeButtonTextActive,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      categoryId === cat.id && {
                        backgroundColor: cat.color + '20',
                        borderColor: cat.color,
                      },
                    ]}
                    onPress={() => setCategoryId(cat.id)}
                  >
                    <Ionicons
                      name={cat.icon}
                      size={20}
                      color={categoryId === cat.id ? cat.color : colors.gray500}
                    />
                    <Text
                      style={[
                        styles.categoryChipText,
                        categoryId === cat.id && { color: cat.color },
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Input
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Add notes..."
              multiline
              numberOfLines={3}
            />

            <Input
              label="Date"
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="secondary"
              style={{ flex: 1, marginRight: 8 }}
              disabled={loading}
            />
            <Button
              title="Add Transaction"
              onPress={handleSubmit}
              style={{ flex: 1, marginLeft: 8 }}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inputGroup: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    backgroundColor: colors.white,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
