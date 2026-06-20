import { FlatList, View, StyleSheet } from 'react-native';
import TransactionCard from './TransactionCard';
import SkeletonLoader from '../ui/SkeletonLoader';
import EmptyState from '../ui/EmptyState';

export default function TransactionList({ transactions, isLoading, onLongPress, onRefresh, refreshing }) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.skeletonCard}>
            <SkeletonLoader width={48} height={48} borderRadius={24} />
            <View style={styles.skeletonContent}>
              <SkeletonLoader width="60%" height={16} />
              <View style={{ height: 4 }} />
              <SkeletonLoader width="40%" height={12} />
            </View>
            <SkeletonLoader width={80} height={16} />
          </View>
        ))}
      </View>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon="wallet-outline"
        title="No Transactions Yet"
        subtitle="Add your first transaction to get started"
      />
    );
  }

  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <TransactionCard transaction={item} onLongPress={onLongPress} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  skeletonContent: {
    flex: 1,
    marginLeft: 12,
  },
  list: {
    padding: 16,
  },
});
