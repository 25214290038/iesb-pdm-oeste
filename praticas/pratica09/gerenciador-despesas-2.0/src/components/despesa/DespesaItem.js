import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';
import { useTheme, cardShadow } from '../../constants/theme';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const theme = useTheme();

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={[styles.item, cardShadow, { backgroundColor: theme.card }]}>
        <View style={styles.info}>
          <Text style={[styles.description, { color: theme.cardText }]}>{description}</Text>
          <Text style={[styles.date, { color: theme.cardMuted }]}>{getDataFormatada(date)}</Text>
          <View style={[styles.tag, { backgroundColor: theme.chip }]}>
            <Text style={[styles.tagText, { color: theme.chipText }]}>{category}</Text>
          </View>
        </View>
        <View style={[styles.amountBox, { backgroundColor: theme.surface }]}>
          <Text style={[styles.amount, { color: theme.primary }]}>R$ {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  item: {
    padding: 12,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  info: { flex: 1 },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  date: { marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagText: { fontSize: 12 },
  amountBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: { fontWeight: 'bold' },
});