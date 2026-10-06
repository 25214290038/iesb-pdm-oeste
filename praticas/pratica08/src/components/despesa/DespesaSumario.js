import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > 200 && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#e4d9ff',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodo: { fontSize: 14, color: '#5b3fd1' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#3e04c3' },
  somaAlta: { color: 'red' }, // Desafio extra: acima de R$ 200,00
});