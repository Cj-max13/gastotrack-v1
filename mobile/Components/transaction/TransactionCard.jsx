import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

export default function TransactionCard({ transaction, onLongPress }) {
  const isExpense = transaction.type === 'expense';
  const amountColor = isExpense ? colors.expense : colors.income;
  const amountPrefix = isExpense ? '-' : '+';

  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => onLongPress && onLongPress(transaction)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: transaction.category?.color + '20' || colors.gray200 },
        ]}
      >
        <Ionicons
          name={transaction.category?.icon || 'ellipsis-horizontal-circle-outline'}
          size={24}
          color={transaction.category?.color || colors.gray500}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.merchant} numberOfLines={1}>
          {transaction.merchant}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.category}>{transaction.category?.name || 'Other'}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.date}>{formatDate(transaction.transaction_date)}</Text>
          {transaction.source !== 'manual' && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.source}>{transaction.source.toUpperCase()}</Text>
            </>
          )}
        </View>
      </View>

      <Text style={[styles.amount, { color: amountColor }]}>
        {amountPrefix}
        {formatCurrency(transaction.amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dot: {
    fontSize: 13,
    color: colors.textSecondary,
    marginHorizontal: 4,
  },
  date: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  source: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
