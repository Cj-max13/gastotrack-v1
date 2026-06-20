import { View, Text, StyleSheet } from 'react-native';
import { PieChart as GiftedPieChart } from 'react-native-gifted-charts';
import { colors } from '../../constants/colors';

export default function PieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    value: item.value,
    color: item.color,
    text: item.label,
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <GiftedPieChart
          data={chartData}
          donut
          radius={80}
          innerRadius={50}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.centerValue}>₱{total.toFixed(0)}</Text>
              <Text style={styles.centerText}>Total</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel} numberOfLines={1}>
              {item.label}
            </Text>
            <Text style={styles.legendValue}>₱{item.value.toFixed(0)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  centerText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  legend: {
    width: '100%',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
