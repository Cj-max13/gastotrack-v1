import { View, Text, StyleSheet } from 'react-native';
import { BarChart as GiftedBarChart } from 'react-native-gifted-charts';
import { colors } from '../../constants/colors';

export default function BarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor: colors.primary,
  }));

  return (
    <View style={styles.container}>
      <GiftedBarChart
        data={chartData}
        barWidth={32}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: colors.textSecondary, fontSize: 12 }}
        noOfSections={4}
        maxValue={Math.max(...data.map((d) => d.value)) * 1.2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
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
