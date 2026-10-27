import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { useTheme } from '../../constants/theme';

function renderExpenseItem({ item }) {
  return <DespesaItem {...item} />;
}

export default function DespesaLista({
  expenses,
  ListHeaderComponent,
  emptyTitle = 'Nenhuma despesa.',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const theme = useTheme();

  const empty = (
    <View style={styles.empty}>
      <Ionicons name="wallet-outline" size={64} color={theme.textMuted} />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>{emptyTitle}</Text>
      <Text style={[styles.emptyHint, { color: theme.textMuted }]}>{emptyHint}</Text>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={empty}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  empty: { alignItems: 'center', marginTop: 48, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
  emptyHint: { fontSize: 14, marginTop: 4, textAlign: 'center' },
});