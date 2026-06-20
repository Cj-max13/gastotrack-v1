import { View, Text, StyleSheet } from 'react-native';
import { LineChart as GiftedLineChart } from 'react-native-gifted-charts';
import { colors } from '../../constants/colors';

export default function LineChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  const chartData = data.map((item) => ({
    value: item.value,
    label: item.month,
  }));

  return (
    <View style={styles.container}>
      <GiftedLineChart
        data={chartData}
        width={300}
        height={200}
        spacing={50}
        color={colors.primary}
        thickness={3}
        startFillColor={colors.primary}
        endFillColor={colors.primary + '20'}
        startOpacity={0.4}
        endOpacity={0.1}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor={colors.gray300}
        xAxisColor={colors.gray300}
        yAxisTextStyle={{ color: colors.textSecondary, fontSize: 12 }}
        xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
        areaChart
        curved
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
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
