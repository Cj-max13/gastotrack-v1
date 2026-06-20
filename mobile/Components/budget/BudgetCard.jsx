import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../ui/Card';
import BudgetProgress from './BudgetProgress';
import { colors } from '../../constants/colors';

export default function BudgetCard({ budget, onPress }) {
  const category = budget.category;

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={() => onPress && onPress(budget)} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.categoryInfo}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: category?.color + '20' || colors.gray200 },
              ]}
            >
              <Ionicons
                name={category?.icon || 'ellipsis-horizontal-circle-outline'}
                size={24}
                color={category?.color || colors.gray500}
              />
            </View>
            <Text style={styles.categoryName}>{category?.name || 'Unknown'}</Text>
          </View>
        </View>

        <BudgetProgress
          spent={budget.spent_amount || 0}
          limit={budget.limit_amount}
          categoryName={category?.name}
        />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
