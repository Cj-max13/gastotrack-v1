import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export default function EmptyState({
  icon = 'document-text-outline',
  title = 'Nothing Here Yet',
  subtitle = 'Your data will appear here once available.',
}) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.gray400} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
