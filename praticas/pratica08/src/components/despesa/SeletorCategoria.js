import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../../data/despesas';

export default function SeletorCategoria({ selecionada, onSelecionar, incluirTodas = false }) {
  const opcoes = incluirTodas ? ['Todas', ...CATEGORIAS] : CATEGORIAS;

  return (
    <View style={styles.container}>
      {opcoes.map((opcao) => {
        const ativa = opcao === selecionada;
        return (
          <Pressable
            key={opcao}
            onPress={() => onSelecionar(opcao)}
            style={({ pressed }) => [
              styles.chip,
              ativa && styles.chipAtivo,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#e4e4e4',
  },
  chipAtivo: { backgroundColor: '#3e04c3' },
  texto: { color: '#333', fontSize: 14 },
  textoAtivo: { color: 'white', fontWeight: 'bold' },
  pressed: { opacity: 0.6 },
});