import { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { filterByCategory } from '../util/despesas';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const debouncedSearch = useDebounce(search, 300);

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return filterByCategory(expenses, category).filter((expense) =>
      expense.description.toLowerCase().includes(term)
    );
  }, [expenses, debouncedSearch, category]);

  const isFiltering = debouncedSearch.trim() !== '' || category !== 'Todas';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.search,
          { backgroundColor: theme.input, color: theme.text, borderColor: theme.border },
        ]}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por descrição..."
        placeholderTextColor={theme.textMuted}
        clearButtonMode="while-editing"
        autoCorrect={false}
      />
      <SeletorCategoria selecionada={category} onSelecionar={setCategory} />
      <DespesaSaida
        expenses={filteredExpenses}
        label={isFiltering ? 'Resultado' : 'Total'}
        emptyTitle={isFiltering ? 'Nenhum resultado encontrado.' : 'Nenhuma despesa.'}
        emptyHint={isFiltering ? 'Tente outro termo ou categoria.' : 'Toque em + para adicionar.'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
});