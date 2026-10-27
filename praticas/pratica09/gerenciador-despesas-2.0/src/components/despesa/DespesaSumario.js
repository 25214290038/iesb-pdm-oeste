import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../constants/theme';

export default function DespesaSumario({ expenses, label }) {
  const theme = useTheme();
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const count = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.summaryBg }]}>
      <View>
        <Text style={[styles.label, { color: theme.summaryText }]}>{label}</Text>
        <Text style={[styles.count, { color: theme.summaryText }]}>
          {count} {count === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: theme.summaryText }]}>R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: { fontSize: 14 },
  count: { fontSize: 12, marginTop: 2 },
  total: { fontSize: 18, fontWeight: 'bold' },
});