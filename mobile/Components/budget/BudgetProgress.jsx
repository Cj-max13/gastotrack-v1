import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/formatCurrency';

export default function BudgetProgress({ spent, limit, categoryName }) {
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const isOver = spent > limit;
  const isWarning = percentage >= 70 && percentage < 100;

  let barColor = colors.budgetGood;
  if (isOver) barColor = colors.budgetDanger;
  else if (isWarning) barColor = colors.budgetWarning;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.amount}>
          {formatCurrency(spent)} / {formatCurrency(limit)}
        </Text>
        {isOver && <Text style={styles.overBudget}>Over budget!</Text>}
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>

      <Text style={styles.percentage}>{percentage.toFixed(0)}% used</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  overBudget: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.budgetDanger,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
