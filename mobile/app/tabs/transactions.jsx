import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { useTransactions } from '../../hooks/useTransactions';
import TransactionList from '../../Components/transaction/TransactionList';
import AddTransactionModal from '../../Components/transaction/AddTransactionModal';
import Toast from 'react-native-toast-message';

export default function TransactionsScreen() {
  const {
    transactions,
    loading,
    refreshing,
    addTransaction,
    deleteTransaction,
    refresh,
    fetchTransactions,
  } = useTransactions();

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const handleAddTransaction = async (data) => {
    try {
      const result = await addTransaction(data);
      setModalVisible(false);
      
      Toast.show({
        type: 'success',
        text1: 'Transaction Added',
        text2: 'Your transaction has been recorded',
      });

      // Check if budget exceeded
      if (result.budget_status?.is_exceeded) {
        Alert.alert(
          'Budget Exceeded!',
          `You've exceeded your budget for this category by ${result.budget_status.overage}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Add transaction error:', error);
    }
  };

  const handleLongPress = (transaction) => {
    Alert.alert(
      'Delete Transaction',
      `Delete "${transaction.merchant}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction(transaction.id);
              Toast.show({
                type: 'success',
                text1: 'Transaction Deleted',
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete transaction');
            }
          },
        },
      ]
    );
  };

  const handleSearch = (text) => {
    setSearch(text);
    const timeoutId = setTimeout(() => {
      fetchTransactions({ search: text });
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor={colors.gray400}
            value={search}
            onChangeText={handleSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={colors.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TransactionList
        transactions={transactions}
        isLoading={loading}
        onLongPress={handleLongPress}
        onRefresh={refresh}
        refreshing={refreshing}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={handleAddTransaction}
      />

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
  searchContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
