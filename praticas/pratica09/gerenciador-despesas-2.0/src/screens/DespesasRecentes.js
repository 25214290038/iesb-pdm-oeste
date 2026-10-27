import { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import { getDataMenosDias } from '../util/data';
import { filterByCategory } from '../util/despesas';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const theme = useTheme();
  const [category, setCategory] = useState('Todas');

  const recentExpenses = useMemo(() => {
    const limit = getDataMenosDias(new Date(), 7);
    return expenses.filter((expense) => expense.date >= limit);
  }, [expenses]);

  const filteredExpenses = useMemo(
    () => filterByCategory(recentExpenses, category),
    [recentExpenses, category]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SeletorCategoria selecionada={category} onSelecionar={setCategory} />
      <DespesaSaida
        expenses={filteredExpenses}
        label="Últimos 7 dias"
        emptyTitle="Nenhuma despesa recente."
        emptyHint="Toque em + para adicionar."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});